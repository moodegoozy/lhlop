# edu-platform — Next.js Frontend

**Primary frontend for منصة المعلمين (teacher booking platform).**

## Quick Start

```bash
npm install
npm run dev     # http://localhost:3000
```

## Architecture Summary

- **Next.js 16** with static export (`output: 'export'`)
- **React 19** + **Radix UI** + **Tailwind CSS 4**
- **Zustand** for state (with persist middleware)
- **Firebase** (auth/storage) + **Supabase** (database)

## Key Directories

| Path | Purpose |
|------|---------|
| `src/app/student/` | Student dashboard (16 pages) |
| `src/app/teacher/` | Teacher dashboard |
| `src/app/admin/` | Admin panel |
| `src/components/ui/` | Reusable UI primitives (Radix-based) |
| `src/components/dashboard/` | Dashboard-specific components |
| `src/store/` | Zustand stores (auth, ui, filters, booking, dashboard) |
| `src/data/mock.ts` | Development mock data |

## Conventions

- **RTL Arabic-first** — Always use `dir="rtl"`, Cairo font
- **CVA + cn()** — Use `cn()` utility from `@/lib/utils` for class composition
- **Type-safe configs** — Use `Record<string, {...}>` for lookup objects to avoid TypeScript index errors
- **lucide-react icons** — Don't use deprecated icons (e.g., `Twitter` → use `MessageCircle`)

## Common Patterns

```tsx
// Store usage
import { useDashboardStore } from '@/store/dashboard.store';
const { sidebarOpen, setSidebarOpen } = useDashboardStore();

// UI component with variants
import { Button } from '@/components/ui/button';
<Button variant="outline" size="sm">Click</Button>

// Conditional classes
import { cn } from '@/lib/utils';
<div className={cn('base-class', isActive && 'active-class')} />
```

## Deploy

```bash
npm run build   # Outputs to /out
firebase deploy --only hosting
```

See [docs/ARCHITECTURE.md](docs/ARCHITECTURE.md) for full route map and role permissions.
