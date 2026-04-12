# Project Guidelines — lhlop (منصة المعلمين)

Saudi teacher booking platform built with Laravel 8 + Livewire 2 + Alpine.js + Tailwind CSS v4.

## Architecture

- **Livewire-first**: No custom controllers. All page logic lives in Livewire components (`app/Http/Livewire/`). Routes use closures or return views that mount Livewire components.
- **Three role-based layouts**: `app` (public), `admin` (admin panel), `teacher` (teacher dashboard), `minimal` (auth pages).
- **Dual file locations**: Source views are in `/resources/views/` (primary — edit here). `/laravel-app/resources/views/` mirrors them for deployment. Keep both in sync.
- **Entry point**: `public_html/index.php` → bootstraps `../laravel-app/`.
- **Database**: MySQL 8.0 via Docker/Sail. Backend is early-stage — only default Laravel migrations exist. Models for Teacher, Booking, Category, etc. still need to be created.

## Code Style

- **Language**: Arabic is the primary UI language (`locale => 'ar'`). Code identifiers, comments, and variable names should be in English.
- **Livewire naming**: kebab-case for component tags (`<livewire:home-page />`), PascalCase for PHP classes (`HomePage.php`).
- **Blade components**: kebab-case filenames in `resources/views/components/`.
- **CSS**: Tailwind utility-first with custom `@layer components` classes (`.glass`, `.teacher-card`, `.btn`, `.admin-*`). Dark mode via `.dark` class. RTL via `dir="rtl"`.
- **JavaScript**: Alpine.js for interactivity (loaded via Livewire, not imported manually). Leaflet.js for maps.

## Build and Test

```bash
# Docker environment (Laravel Sail)
cd laravel-app
./vendor/bin/sail up -d          # Start MySQL + PHP 8.2
./vendor/bin/sail artisan migrate

# Frontend assets (Vite — ignore legacy webpack.mix.js)
npm run dev                      # Dev server
npm run build                    # Production build

# Tests
./vendor/bin/phpunit             # or ./vendor/bin/sail test
```

See [DEPLOYMENT.md](../DEPLOYMENT.md) for Hostinger deployment steps.

## Conventions

- **Translations**: Use `__('key')` with JSON translation files (`resources/lang/ar.json`). English is fallback.
- **Fonts**: Cairo (Arabic) + Inter (Latin). Custom Saudi Riyal symbol font in `public_html/fonts/`.
- **CDN deps**: jQuery 3.7.1, Select2, intl-tel-input are loaded via CDN in `layouts/app.blade.php` only — do not add npm packages for these.
- **Asset loading**: `admin.blade.php`, `teacher.blade.php`, and `minimal.blade.php` use `@vite()`. `app.blade.php` uses hardcoded asset paths — migrate to `@vite()` when possible.
- **Dark mode**: Three-way sync (localStorage + system preference + Alpine.js store). Logic in `resources/js/dark.js`.

## Pitfalls

- **XSS risk**: `emails/dynamic.blade.php` renders `{!! $html_content !!}` unescaped. Sanitize HTML in the backend before passing to this template.
- **Empty backend**: `HomePage.php` returns an empty paginator with hardcoded filter data. Real database queries, models, and migrations need to be built.
- **File duplication**: `/resources/` and `/laravel-app/resources/` can drift out of sync. Always verify both locations after view changes.
- **`DO_NOT_UPLOAD_HERE/`**: This folder exists as a deployment guard — do not place files in it.
