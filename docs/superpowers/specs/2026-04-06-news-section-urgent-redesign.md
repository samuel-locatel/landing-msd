# Design Spec: NewsSection Urgent Redesign

**Date:** 2026-04-06  
**Status:** Approved

---

## Goal

Make the NewsSection feel urgent and alarming — the article it surfaces is about legal violations affecting pharmacies right now. The current calm/editorial feel undersells the stakes.

---

## Changes

Single file: `src/components/sections/NewsSection.tsx`

### Section wrapper
- **Before:** `bg-gray-50 py-24`
- **After:** `bg-dark py-24`

### Header block
- **Before:** `<EyebrowLabel>Na mídia</EyebrowLabel>` + passive heading
- **After:**
  - Remove `EyebrowLabel`. Replace with an inline alert badge:
    ```tsx
    <div className="inline-flex items-center gap-2 px-3 py-1 rounded border border-red-800 bg-red-950/40 text-red-400 text-xs font-bold uppercase tracking-widest mb-4">
      <AlertTriangle size={14} />
      ATENÇÃO
    </div>
    ```
  - Heading text: `"Seu direito está sendo violado. Conheça a lei."` — white, font-serif, text-4xl, font-bold
  - Remove EyebrowLabel import (no longer used)
  - Add `AlertTriangle` to lucide-react import

### Article card
- **Before:** `border border-border rounded-lg p-8 border-l-4 border-l-vinho bg-white shadow-sm`
- **After:** `bg-white/5 border border-white/10 border-l-4 border-l-red-500 rounded-lg p-8`

### Card internals
| Element | Before | After |
|---------|--------|-------|
| Newspaper icon + source | `text-vinho` | `text-red-400` |
| Source label (`BESAN`) | `text-vinho` (inherits) | `text-white/60` (explicit) |
| Article title (h3) | `text-gray-900` | `text-white` |
| Excerpt | `text-muted` | `text-white/60` |
| Author/date | `text-muted` | `text-white/40` |
| CTA link | `text-vinho hover:underline` | `text-red-400 hover:text-red-300` |

---

## Out of Scope
- No layout changes
- No copy changes to article title, excerpt, author, or date (only the section heading changes)
- No animation or pulsing effects
