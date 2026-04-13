import { NextResponse } from 'next/server';
import { query } from '@/lib/db';
import type { Teacher, Category, PaginatedResponse } from '@/types';
import { RowDataPacket } from 'mysql2/promise';

interface TeacherRow extends Teacher, RowDataPacket {}
interface CategoryRow extends Category, RowDataPacket {}
interface CountRow extends RowDataPacket {
  total: number;
}

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    
    // Parse filters from query params
    const search = searchParams.get('search') || '';
    const sortBy = searchParams.get('sortBy') || 'rating';
    const gender = searchParams.get('gender') || '';
    const qualification = searchParams.get('qualification') || '';
    const lessonLocation = searchParams.get('lessonLocation') || '';
    const nationality = searchParams.get('nationality') || '';
    const countryCode = searchParams.get('countryCode') || '';
    const cityId = searchParams.get('cityId') || '';
    const categoryId = searchParams.get('categoryId') || '';
    const page = parseInt(searchParams.get('page') || '1');
    const perPage = parseInt(searchParams.get('perPage') || '20');

    // Build WHERE conditions
    const conditions: string[] = ['t.is_active = 1'];
    const params: (string | number)[] = [];

    if (search) {
      conditions.push('(t.name LIKE ? OR t.bio LIKE ?)');
      params.push(`%${search}%`, `%${search}%`);
    }

    if (gender) {
      conditions.push('t.gender = ?');
      params.push(gender);
    }

    if (qualification) {
      conditions.push('t.qualification = ?');
      params.push(qualification);
    }

    if (lessonLocation) {
      conditions.push('(t.lesson_location = ? OR t.lesson_location = ?)');
      params.push(lessonLocation, 'both');
    }

    if (nationality) {
      conditions.push('t.nationality = ?');
      params.push(nationality);
    }

    if (countryCode) {
      conditions.push('t.country_code = ?');
      params.push(countryCode);
    }

    if (cityId) {
      conditions.push('t.city_id = ?');
      params.push(cityId);
    }

    if (categoryId) {
      conditions.push('EXISTS (SELECT 1 FROM category_teacher ct WHERE ct.teacher_id = t.id AND ct.category_id = ?)');
      params.push(parseInt(categoryId));
    }

    // Build ORDER BY
    let orderBy = 't.rating DESC, t.total_ratings DESC';
    switch (sortBy) {
      case 'experience':
        orderBy = 't.experience_years DESC';
        break;
      case 'price_low':
        orderBy = 't.hourly_rate ASC';
        break;
      case 'price_high':
        orderBy = 't.hourly_rate DESC';
        break;
      case 'newest':
        orderBy = 't.created_at DESC';
        break;
    }

    // Count total
    const whereClause = conditions.length > 0 ? `WHERE ${conditions.join(' AND ')}` : '';
    const countResult = await query<CountRow[]>(
      `SELECT COUNT(*) as total FROM teachers t ${whereClause}`,
      params
    );
    const total = countResult[0]?.total || 0;

    // Fetch teachers with pagination
    const offset = (page - 1) * perPage;
    const teachers = await query<TeacherRow[]>(
      `SELECT t.* FROM teachers t ${whereClause} ORDER BY ${orderBy} LIMIT ? OFFSET ?`,
      [...params, perPage, offset]
    );

    // Fetch categories for each teacher
    const teachersWithCategories: Teacher[] = [];
    for (const teacher of teachers) {
      const categories = await query<CategoryRow[]>(
        `SELECT c.* FROM categories c 
         INNER JOIN category_teacher ct ON c.id = ct.category_id 
         WHERE ct.teacher_id = ?`,
        [teacher.id]
      );
      teachersWithCategories.push({
        ...teacher,
        categories: categories as Category[],
      });
    }

    const response: PaginatedResponse<Teacher> = {
      data: teachersWithCategories,
      total,
      page,
      perPage,
      totalPages: Math.ceil(total / perPage),
    };

    return NextResponse.json(response);
  } catch (error) {
    console.error('Error fetching teachers:', error);
    return NextResponse.json(
      { error: 'Failed to fetch teachers' },
      { status: 500 }
    );
  }
}
