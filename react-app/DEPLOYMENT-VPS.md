# 🚀 نشر مشروع React على Hostinger VPS

## المتطلبات
- Hostinger VPS مع Ubuntu
- Node.js 18+ و npm
- PM2 لإدارة التطبيق
- Nginx كـ reverse proxy

---

## الخطوة 1: تجهيز السيرفر

```bash
# تسجيل الدخول عبر SSH
ssh root@your-vps-ip

# تحديث النظام
apt update && apt upgrade -y

# تثبيت Node.js 20
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
apt install -y nodejs

# تثبيت PM2 عالمياً
npm install -g pm2

# تثبيت Nginx
apt install -y nginx
```

---

## الخطوة 2: إعداد قاعدة البيانات

استخدم نفس قاعدة البيانات من Laravel:

```bash
# بيانات الاتصال من Hostinger MySQL
DB_HOST=        # من لوحة تحكم Hostinger
DB_PORT=3306
DB_USER=        # اسم المستخدم
DB_PASSWORD=    # كلمة المرور
DB_NAME=        # اسم قاعدة البيانات (نفس Laravel)
```

---

## الخطوة 3: رفع المشروع

```bash
# إنشاء مجلد التطبيق
mkdir -p /var/www/a.lhloop.com
cd /var/www/a.lhloop.com

# استنساخ المشروع من GitHub
git clone https://github.com/moodegoozy/lhlop.git .
cd react-app

# أو رفع الملفات عبر SFTP إلى /var/www/a.lhloop.com/
```

---

## الخطوة 4: إعداد متغيرات البيئة

```bash
cd /var/www/a.lhloop.com/react-app

# إنشاء ملف .env.local
nano .env.local
```

أضف المحتوى التالي:
```env
# Database - من Hostinger
DB_HOST=sql.hostinger.com
DB_PORT=3306
DB_USER=u123456789_user
DB_PASSWORD=your_password
DB_NAME=u123456789_lhlop

# App
NEXT_PUBLIC_APP_URL=https://a.lhloop.com
NODE_ENV=production
```

---

## الخطوة 5: بناء وتشغيل التطبيق

```bash
cd /var/www/a.lhloop.com/react-app

# تثبيت الحزم
npm install

# بناء المشروع
npm run build

# تشغيل مع PM2
pm2 start ecosystem.config.js --env production

# حفظ إعدادات PM2
pm2 save
pm2 startup
```

---

## الخطوة 6: إعداد Nginx

```bash
nano /etc/nginx/sites-available/a.lhloop.com
```

أضف الإعدادات:
```nginx
server {
    listen 80;
    server_name a.lhloop.com;

    location / {
        proxy_pass http://127.0.0.1:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_cache_bypass $http_upgrade;
    }
}
```

تفعيل الموقع:
```bash
ln -s /etc/nginx/sites-available/a.lhloop.com /etc/nginx/sites-enabled/
nginx -t
systemctl restart nginx
```

---

## الخطوة 7: شهادة SSL (مجانية)

```bash
# تثبيت Certbot
apt install -y certbot python3-certbot-nginx

# الحصول على شهادة SSL
certbot --nginx -d a.lhloop.com

# التجديد التلقائي
certbot renew --dry-run
```

---

## الخطوة 8: أوامر مفيدة

```bash
# عرض حالة PM2
pm2 status

# عرض logs
pm2 logs lhloop-react

# إعادة تشغيل التطبيق
pm2 restart lhloop-react

# إيقاف التطبيق
pm2 stop lhloop-react

# تحديث بعد git pull
cd /var/www/a.lhloop.com/react-app
git pull
npm install
npm run build
pm2 restart lhloop-react
```

---

## توجيه النطاق الفرعي

في Hostinger DNS، أضف سجل A:
```
Type: A
Name: a
Value: [عنوان IP للـ VPS]
TTL: 3600
```

---

## ✅ تم!

موقعك الآن متاح على: `https://a.lhloop.com`
