# 🚀 نشر المشروع على Hostinger

## الخطوة 1: إعداد الاستضافة على Hostinger

1. ادخل على لوحة تحكم Hostinger
2. اذهب إلى **Hosting** > اختر موقعك
3. اذهب إلى **Advanced** > **Git**

## الخطوة 2: ربط GitHub

1. في صفحة Git، اضغط **Create a new repository** أو **Connect existing**
2. اختر المستودع: `moodegoozy/lhlop`
3. اختر الفرع: `main`
4. **مهم**: في **Deploy path** اكتب: `/` (الجذر)

## الخطوة 3: إعداد قاعدة البيانات

1. اذهب إلى **Databases** > **MySQL Databases**
2. أنشئ قاعدة بيانات جديدة
3. احفظ:
   - اسم قاعدة البيانات
   - اسم المستخدم
   - كلمة المرور

## الخطوة 4: إعداد SSH وتثبيت الحزم

1. اذهب إلى **Advanced** > **SSH Access**
2. فعّل SSH واحفظ بيانات الدخول
3. اتصل عبر SSH:
```bash
ssh u123456789@yourdomain.com -p 65002
```

4. انتقل لمجلد Laravel وثبّت الحزم:
```bash
cd ~/domains/yourdomain.com/laravel-app
composer install --no-dev --optimize-autoloader
```

## الخطوة 5: إعداد ملف .env

```bash
cd ~/domains/yourdomain.com/laravel-app
cp .env.production .env
nano .env
```

عدّل القيم التالية:
```
APP_KEY=  (سيُولّد تلقائياً)
APP_URL=https://yourdomain.com

DB_DATABASE=اسم_قاعدة_البيانات
DB_USERNAME=اسم_المستخدم
DB_PASSWORD=كلمة_المرور
```

## الخطوة 6: توليد المفتاح وتشغيل الترحيلات

```bash
php artisan key:generate
php artisan migrate --force
php artisan storage:link
php artisan config:cache
php artisan route:cache
php artisan view:cache
```

## الخطوة 7: تعديل public_html

تأكد أن `public_html` يشير للمجلد الصحيح. في Hostinger:

1. اذهب إلى **File Manager**
2. تأكد أن `public_html/index.php` يشير لـ `../laravel-app/`

## ✅ تم!

موقعك الآن يعمل على: `https://yourdomain.com`

---

## 🔄 التحديث التلقائي

عند كل push على GitHub، Hostinger سيحدّث الموقع تلقائياً.

بعد كل تحديث، قد تحتاج لتشغيل:
```bash
cd ~/domains/yourdomain.com/laravel-app
composer install --no-dev --optimize-autoloader
php artisan migrate --force
php artisan config:cache
php artisan route:cache
php artisan view:cache
```

## ⚠️ ملاحظات مهمة

- لا ترفع ملف `.env` على GitHub
- تأكد من أن `storage/` و `bootstrap/cache/` لديهم صلاحيات الكتابة (755)
- إذا واجهت مشاكل، تحقق من logs: `storage/logs/laravel.log`
