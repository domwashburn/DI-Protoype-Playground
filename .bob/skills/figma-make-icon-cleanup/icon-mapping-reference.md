# Icon Mapping Reference

Pre-researched mappings from Figma Make SVG path files → `@carbon/icons-react`.
Confirmed during the DI prototype cleanup (July 2025). Use as a starting point — always verify against Playwright baselines before implementing.

---

## SVG Path File Mappings

### `svg-8azqa4lekk.ts` — Filter sliders / SettingsAdjust

| Path key | Shape | Carbon icon | Size |
|----------|-------|-------------|------|
| `p2acbe800` + `pb1a8400` | Two horizontal slider tracks with circular handles | `SettingsAdjust` | 16 |

**Used in:** `HomePageHeader.tsx` as the `SettingsIcon` renderIcon for the "Display settings" button.

```tsx
// BEFORE
import settingsIconPaths from '../../imports/svg-8azqa4lekk';
const SettingsIcon = ({ className }) => (
  <svg viewBox="0 0 16 16" className={className}>
    <path d={settingsIconPaths.p2acbe800} />
    <path d={settingsIconPaths.pb1a8400} />
  </svg>
);
<Button renderIcon={SettingsIcon}>Display settings</Button>

// AFTER
import { SettingsAdjust } from '@carbon/icons-react';
<Button renderIcon={SettingsAdjust}>Display settings</Button>
```

> ⚠️ Verify `SettingsAdjust` vs `Settings` (gear) visually — the path geometry shows two slider tracks, which matches `SettingsAdjust`, not the gear icon.

---

### `svg-wxegm48afc.ts` — Pin / Search / Close

| Path key | Shape | Carbon icon | Notes |
|----------|-------|-------------|-------|
| `p1057a580` | Pin / tack shape (outline) | `Pin` | Use for unpinned state |
| `p1057a580` split at `ZM` | Pin filled (no inner hole) | `PinFilled` | Use for pinned state |
| `p154b5b00` | Magnifying glass + circle | Replaced by Carbon `Search` component | No standalone icon needed |
| `p35a89700` | X / cross | Replaced by Carbon `Search` component (built-in clear) | No standalone icon needed |
| `p35e68500` | Circle outline | Replaced by Carbon `Search` component | No standalone icon needed |

**Used in:** `DisplaySettingsContent.tsx` as the pin toggle button and search field.

```tsx
// BEFORE — custom pin SVG + inline path manipulation
import svgPaths from '../../imports/svg-wxegm48afc';
const PIN_PATH_OUTLINE = svgPaths.p1057a580;
const PIN_PATH_FILLED = PIN_PATH_OUTLINE.split('ZM')[0] + 'Z';
<svg viewBox="0 0 16 16"><path d={isPinned ? PIN_PATH_FILLED : PIN_PATH_OUTLINE} /></svg>

// AFTER
import { Pin, PinFilled } from '@carbon/icons-react';
import { IconButton } from '@carbon/react';
<IconButton
  label={isPinned ? 'Unpin' : 'Pin to home'}
  kind="ghost"
  size="sm"
  renderIcon={isPinned ? PinFilled : Pin}
  onClick={() => onTogglePin(id)}
  disabled={!isPinned && !canPin}
/>
```

---

### `svg-19c7tsrlrh.ts` — Add / ArrowRight

| Path key | Shape | Carbon icon | Size |
|----------|-------|-------------|------|
| `p349d7700` | Plus / add (+) crosshair | `Add` | 16 |
| `pfec3600` | Arrow pointing right (→) | `ArrowRight` | 16 |

**Used in:** `DecisionAutomationCard.tsx` — only `pfec3600` (arrow right) is rendered.

```tsx
// BEFORE
import svgPaths from '../../imports/svg-19c7tsrlrh';
<svg viewBox="0 0 16 16">
  <path d={svgPaths.pfec3600} fill="#525252" />
</svg>

// AFTER
import { ArrowRight } from '@carbon/icons-react';
<ArrowRight size={16} aria-hidden />
```

---

### `svg-jon3mbttas.ts` — Decorative tile icons (HomePageHeader)

This file contains many paths used for the homepage header tile icons. Multiple paths compose a single icon.

| Paths used | Visual description | Carbon icon | Confidence |
|-----------|-------------------|-------------|------------|
| `p37817100` + `p1a73cc80` + `p11e47970` + `p36b58080` + `p1697b400` | Open bracket, close bracket, three dots — chat/conversation | `Chat` or `WatsonxAi` | Medium — verify visually |
| `pf9d6480` | Arrow pointing up-right / send arrow | `SendAlt` | High |
| `p2e0fc7f0` | Branching workflow / connected rectangles | `Workflow` or `DecisionTree` | Medium — verify visually |
| `p38b1e480` (from `svg-8azqa4lekk`) | Service nodes | `ServiceDesk` or `Network_3` | Low — verify visually |
| `p23aae480` | Chevron pointing up | `ChevronUp` | High |
| `p2acbe800` + `pb1a8400` | Filter sliders (same as svg-8azqa4lekk) | `SettingsAdjust` | High |

**Used in:** `HomePageHeader.tsx` — decorative icons inside the chat tile, new-project tile, and new-service tile.

> ⚠️ These are **decorative** icons — they don't need to be pixel-perfect matches. The nearest semantic Carbon icon is acceptable. Use `aria-hidden` on all of them.

```tsx
// BEFORE — multi-path inline SVG
<svg fill="none" viewBox="0 0 24 24">
  <path d={svgPaths.p37817100} fill="#525252" />
  <path d={svgPaths.p1a73cc80} fill="#525252" />
  {/* ... more paths */}
</svg>

// AFTER — single Carbon icon component
import { Chat } from '@carbon/icons-react';
<Chat size={24} aria-hidden />
```

---

## Lucide → Carbon Icon Mappings

Confirmed 1:1 mappings. All have the same icon name in `@carbon/icons-react` unless noted.

| lucide import | Carbon icon | Import | Notes |
|--------------|-------------|--------|-------|
| `ChevronDown` | Not needed | — | Removed when `<select>` → Carbon `Select` (Select owns its chevron) |
| `Search` (as icon only) | Not needed | — | Removed when `<input>` → Carbon `Search` component (owns its icon) |
| `X` / clear button | Not needed | — | Removed when `<input>` → Carbon `Search` component (owns its clear btn) |
| `Search` (standalone icon) | `Search` | `@carbon/icons-react` | Same name |
| `LayoutGrid` | `Grid` | `@carbon/icons-react` | Name differs — note the mapping |
| `List` | `List` | `@carbon/icons-react` | Same name |
| `GripVertical` | `DragVertical` | `@carbon/icons-react` | Name differs — note the mapping |
| `ChevronRight` | `ChevronRight` | `@carbon/icons-react` | Same name |
| `Bot` | `ChatBot` | `@carbon/icons-react` | Name differs |
| `X` (standalone) | `Close` | `@carbon/icons-react` | Name differs |
| `Box` | `Cube` | `@carbon/icons-react` | Name differs |
| `PanelLeftOpen` | `SidePanelOpen` | `@carbon/icons-react` | Name differs |
| `Book` | `Book` | `@carbon/icons-react` | Same name |
| `FileText` | `Document` | `@carbon/icons-react` | Name differs |
| `MessageCircle` | `Chat` | `@carbon/icons-react` | Name differs |
| `Video` | `Video` | `@carbon/icons-react` | Same name |
| `ExternalLink` | `Launch` | `@carbon/icons-react` | Name differs |
| `Lightbulb` | `Idea` | `@carbon/icons-react` | Name differs |
| `Code` | `Code` | `@carbon/icons-react` | Same name |
| `AlignJustify` | `Menu` | `@carbon/icons-react` | Name differs |
| `Folder` | `Folder` | `@carbon/icons-react` | Same name |

---

## Carbon Component Replacements for Raw HTML

| Raw HTML | Carbon component | Package | Key props |
|----------|-----------------|---------|-----------|
| `<input type="text">` (search) | `Search` | `@carbon/react` | `labelText`, `value`, `onChange`, `size`, `placeholder` |
| `<select>` | `Select` + `SelectItem` | `@carbon/react` | `id`, `labelText`, `value`, `onChange`, `size` |
| Custom `<button>` toggle pair (2 states) | `ContentSwitcher` + `Switch` | `@carbon/react` | `onChange`, `selectedIndex`, `size` |
| Custom `<button>` with icon only | `IconButton` | `@carbon/react` | `label`, `renderIcon`, `kind`, `size` |
| Custom `<button>` tab pair (text labels) | `ContentSwitcher` + `Switch` | `@carbon/react` | `onChange`, `selectedIndex`, `size` |

---

## Known Gotchas

1. **`ContentSwitcher` onChange** fires with `{ name, text, index }` — destructure `name` to get the value.
2. **`Select` value** is a string — ensure the controlled `value` prop is a string, not undefined.
3. **Carbon `Search` onChange** receives a `React.ChangeEvent<HTMLInputElement>` — use `e.target.value`.
4. **Carbon `Search` onClear** fires when the built-in × button is clicked — handle this separately if you need to clear controlled state.
5. **`renderIcon` on Carbon `Button`** must be a `ComponentType`, not a `ReactNode` — pass the icon component reference, not `<Icon />`.
6. **`IconButton` disabled state** — use the `disabled` prop, not `className`. Carbon handles disabled styling internally.
7. **`Pin` vs `PinFilled`** — both exist in `@carbon/icons-react`. `PinFilled` is the solid variant.
8. **`DragVertical` vs `Draggable`** — `DragVertical` is the grip handle (dots in a vertical pattern). `Draggable` is a different shape. Verify against baseline.
