# Plan: Generate Gradient Blur Toolbar Prompt

## Context

The user has selected the floating toolbar bar div in `PDFViewer.tsx` (line 737+), which uses a layered semi-transparent / glassmorphism pill style. They want a new prompt file added to `/guidelines/prompts/` that documents this styling pattern in enough detail that any assistant can reproduce it on other containers.

The pattern in the selected element consists of:
- An outer pill container (`bg-white`, `rounded-[10px]`, `h-[50px]`) that acts as the chrome
- An absolutely-positioned inset overlay providing the border + box-shadow (the "glass edge")
- Inner button cells with `bg-[rgba(255,255,255,0.9)]` and their own inset border overlays
- A neutral counter/label cell using `bg-[rgba(249,250,251,0.8)]`
- `backdrop-blur` is **not** yet applied in the existing code — the user's phrasing "gradient blur background" describes the visual *intent* (frosted-glass feel), so the new prompt should document both the current implementation and how to extend it with `backdrop-filter: blur()` for a true blur effect

## What will be created

A single new file: `/workspaces/default/code/guidelines/prompts/13-gradient-blur-toolbar.md`

## File content plan

The prompt file will contain:

### 1. Overview section
Describes the "floating pill toolbar" visual language: semi-transparent layered whites, subtle shadows, inset border overlays, optional backdrop blur.

### 2. Core anatomy
Explains the three-layer pattern:
- **Layer 1 – Pill shell**: outer container, always `bg-white rounded-[10px]`, flex row, fixed height `h-[50px]`, `px-[9px] py-px gap-[8px]`
- **Layer 2 – Inset border overlay**: an `absolute inset-0 pointer-events-none rounded-[10px]` div with `border border-[rgba(229,231,235,0.6)]` and `shadow-[0px_1px_3px_0px_rgba(0,0,0,0.1),0px_1px_2px_-1px_rgba(0,0,0,0.1)]`
- **Layer 3 – Inner cells**: button cells `bg-[rgba(255,255,255,0.9)] h-[32px] rounded-[8px]` with their own inset border `border-[rgba(209,213,220,0.5)]`; neutral display cells use `bg-[rgba(249,250,251,0.8)] rounded-[4px]`

### 3. Extending with backdrop blur
Code snippet showing how to add `backdrop-filter: blur(12px) saturate(180%)` and switch outer shell to `bg-[rgba(255,255,255,0.75)]` for a true frosted-glass look.

### 4. Tailwind class reference table
A compact table mapping each visual role to its exact class string.

### 5. Copy-paste template
A minimal JSX skeleton (outer pill + inset overlay + one button cell + one display cell) that any assistant can drop in and populate.

### 6. Transition / animation notes
Documents the `transition-all duration-300 ease-in-out` + `translateX` + `opacity` slide-out pattern used when `tagFilter` is active.

## Files changed

| File | Action |
|------|--------|
| `/workspaces/default/code/guidelines/prompts/13-gradient-blur-toolbar.md` | Create new |
| `/workspaces/default/code/guidelines/prompts/README.md` | Add one-line entry for prompt 13 (only if user confirms) |

**No changes to any source `.tsx` files** — this task is purely documentation.

## Verification

After writing the file, read it back to confirm all class strings, hex values, and JSX structure are syntactically correct and match the selected code exactly.
