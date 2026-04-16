# Project Guidelines — lhlop (منصة المعلمين)

Saudi teacher booking platform — monorepo with multiple applications.

## Workspace Structure

```
/edu-platform/     ← Main frontend (Next.js 16 + React 19) — ACTIVE DEVELOPMENT
/laravel-app/      ← Legacy backend (Laravel 8 + Livewire 2)
/react-app/        ← Deprecated (use edu-platform instead)
/resources/        ← Shared Laravel views
/public_html/      ← Hostinger deployment entry point
```

## Active Stack: edu-platform

| Layer | Tech |
|-------|------|
| Framework | Next.js 16.2 (static export) |
| UI | React 19 + Radix UI + Tailwind CSS 4 |
| State | Zustand with persist |
| Auth/DB | Firebase + Supabase |
| Icons | lucide-react |
| Forms | react-hook-form + zod |

### Build Commands

```bash
cd edu-platform
npm run dev     # Development server
npm run build   # Static export to /out
npm run lint    # ESLint
```

**Deploy**: Firebase Hosting (firebase.json configured for /out)

### Key Patterns

- **Static export only** — `output: 'export'` in next.config.ts, no SSR/ISR
- **Arabic-first** — RTL layout, Cairo + Inter fonts
- **CVA variants** — Use `cn()` utility for Tailwind class composition
- **Role-based routing** — 5 roles: admin, teacher, parent, student, child
- **Mock-first dev** — Data in `/src/data/mock.ts` for development
- **Zustand stores** — See `/src/store/` (auth, ui, filters, booking, dashboard)

See [edu-platform/docs/ARCHITECTURE.md](../edu-platform/docs/ARCHITECTURE.md) for full route map and permissions.

---

## Legacy Stack: laravel-app

Laravel 8 + Livewire 2 + Alpine.js + Tailwind CSS v4.

### Architecture

- **Livewire-first** — No custom controllers. Page logic in `app/Http/Livewire/`
- **Four layouts**: `app` (public), `admin`, `teacher`, `minimal` (auth)
- **Dual views**: `/resources/views/` (primary) ↔ `/laravel-app/resources/views/` (keep in sync)
- **Database**: MySQL 8.0 via Docker/Sail

### Build Commands

```bash
cd laravel-app
./vendor/bin/sail up -d           # Start Docker
./vendor/bin/sail artisan migrate # Run migrations
npm run dev                       # Vite dev server
npm run build                     # Production build
./vendor/bin/phpunit              # Tests
```

See [DEPLOYMENT.md](../DEPLOYMENT.md) for Hostinger deployment.

---

## Global Conventions

- **UI Language**: Arabic primary (`locale => 'ar'`). Code/comments in English.
- **RTL**: Always use `dir="rtl"` and RTL-aware Tailwind utilities
- **Dark mode**: Support via `.dark` class (localStorage + system preference)
- **Translations**: Use `__('key')` (Laravel) or constants (Next.js) with Arabic JSON files

## Pitfalls

- **`DO_NOT_UPLOAD_HERE/`** — Deployment guard, never place files here
- **File sync** — `/resources/` and `/laravel-app/resources/` can drift; verify both after view changes
- **XSS in emails** — `emails/dynamic.blade.php` uses `{!! !!}` — sanitize HTML before passing
- **Static export limits** — edu-platform has no SSR; use `generateStaticParams` for dynamic routes
