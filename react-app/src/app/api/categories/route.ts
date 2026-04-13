import { NextResponse } from 'next/server';
import { query } from '@/lib/db';
import type { Category } from '@/types';
import { RowDataPacket } from 'mysql2/promise';

interface CategoryRow extends RowDataPacket {
  id: number;
  name: string;
  icon: string | null;
  parent_id: number | null;
  sort_order: number;
  teachers_count: number;
}

export async function GET() {
  try {
    // Fetch all categories with parent-child relationship
    const categories = await query<CategoryRow[]>(`
      SELECT 
        c.*,
        (SELECT COUNT(*) FROM category_teacher ct WHERE ct.category_id = c.id) as teachers_count
      FROM categories c
      ORDER BY c.sort_order ASC, c.name ASC
    `);

    // Build hierarchical structure
    const categoryMap = new Map<number, Category & { children: Category[] }>();
    const rootCategories: Category[] = [];

    // First pass: create map entries
    for (const cat of categories) {
      categoryMap.set(cat.id, { 
        id: cat.id,
        name: cat.name,
        icon: cat.icon,
        parent_id: cat.parent_id,
        sort_order: cat.sort_order,
        teachers_count: cat.teachers_count,
        children: [] 
      });
    }

    // Second pass: build hierarchy
    for (const cat of categories) {
      const category = categoryMap.get(cat.id)!;
      if (cat.parent_id === null) {
        rootCategories.push(category);
      } else {
        const parent = categoryMap.get(cat.parent_id);
        if (parent) {
          parent.children.push(category);
        }
      }
    }

    return NextResponse.json(rootCategories);
  } catch (error) {
    console.error('Error fetching categories:', error);
    return NextResponse.json(
      { error: 'Failed to fetch categories' },
      { status: 500 }
    );
  }
}
