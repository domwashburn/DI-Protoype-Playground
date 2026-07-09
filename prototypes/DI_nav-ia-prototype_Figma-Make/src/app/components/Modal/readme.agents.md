# Modal — Agent Context

> **For humans:** see inline JSDoc in `ModalAdapter.tsx`
> **Last updated:** 2026-03-05 (Phase 3B)

---

## What this is

A 2-component family providing a Carbon-compliant modal dialog system:

- **`ModalAdapter`** (exported as both `Modal` and default) — wraps `@carbon/react` `ComposedModal`
  with the pre-existing custom `Modal` API so all consumers required zero prop changes.
- **`DisplaySettingsContent`** — standalone modal body for the home page "Display settings"
  feature (pin/reorder decision automations). Not a shell component; always used inside `Modal`.

---

## File map

```
/components/Modal/
  ModalAdapter.tsx              — Carbon ComposedModal adapter (Phase 3B)
  DisplaySettingsContent.tsx    — Display settings body (pin/reorder automations)
  DisplaySettingsContent.module.css
  index.ts                      — barrel export
  readme.agents.md              — this file
```

---

## Barrel export (`index.ts`)

```ts
export { default as Modal } from './ModalAdapter';   // named export
export { default } from './ModalAdapter';             // default export
export { DisplaySettingsContent } from './DisplaySettingsContent';
```

Both `import Modal from '../Modal'` and `import { Modal } from '../Modal'` work.

---

## Carbon components used (`ModalAdapter`)

### `@carbon/react`
- `ComposedModal` — root modal shell (`open` prop, `onClose`)
- `ModalHeader` — title bar
- `ModalBody` — scrollable content area
- `ModalFooter` — primary + secondary action buttons

---

## `ModalAdapter` props interface

```ts
interface ModalAdapterProps {
  isOpen: boolean;                  // maps → ComposedModal open
  onClose: () => void;
  title: string;
  children: React.ReactNode;        // maps → ModalBody children
  primaryButtonText?: string;       // default: 'Save'
  secondaryButtonText?: string;     // default: 'Cancel'
  onPrimaryClick?: () => void;      // maps → onRequestSubmit
  onSecondaryClick?: () => void;    // if absent, falls back to onClose
  size?: 'small' | 'medium' | 'large'; // default: 'medium'
}
```

**Size mapping:**
| Prop value | Carbon value |
|-----------|-------------|
| `'small'` | `'sm'` |
| `'medium'` | `'md'` |
| `'large'` | `'lg'` |

`ModalFooter` is **not rendered** when both `onPrimaryClick` and `secondaryButtonText` are absent.

---

## `DisplaySettingsContent` props interface

```ts
interface DisplaySettingsContentProps {
  onApply?: () => void;
  isOpen?: boolean;   // pass-through from parent Modal to reset staged state on open
}
```

### Key behaviours
- Uses `react-dnd` (`HTML5Backend`) for drag-and-drop reordering of automations.
- Max **4** pinned items enforced — pin button disabled when limit reached.
- Staged changes: edits are not committed until the parent triggers apply via the `applyRef`.
- **Apply is wired via `applyRef`** — pass a `React.MutableRefObject<(() => void) | undefined>` as `applyRef` prop to `DisplaySettingsContent`. The parent (`HomePageHeader`) calls `applyRef.current?.()` in the modal's primary button click handler.
- Imports data via `usePinnedAutomations`, `useAutomations`, `useServices` hooks.

---

## Known constraints / gotchas

1. **`isOpen` must be passed to `DisplaySettingsContent`** — the component resets its staged state
   when `isOpen` changes to `true`. If `isOpen` is omitted, edits from a previous open session
   will persist the next time the modal opens.

2. **Apply uses an `applyRef` pattern** — `DisplaySettingsContent` assigns its apply function to `applyRef.current` inside a `useEffect`. The parent creates the ref and calls `applyRef.current?.()` on the modal's primary button click. If you change this pattern, update `HomePageHeader.tsx` too.

3. **`DisplaySettingsContent` uses Carbon icons** (`DragVertical`, `Pin`, `PinFilled` from `@carbon/icons-react`) and Carbon `Search` component — it is now Carbon-compliant. The drag-and-drop list uses `react-dnd`, not Carbon `DataTable`.

4. **`ModalAdapter` uses the pre-migration prop names** (`isOpen`, not `open`) — this is
   intentional for backward compatibility. The adapter translates `isOpen → open` internally.

---

## Files it imports from

| Import | Source |
|--------|--------|
| `ComposedModal`, `ModalHeader`, etc. | `@carbon/react` |
| `usePinnedAutomations`, `useAutomations`, `useServices` | `../../data/hooks` |
| `react-dnd`, `react-dnd-html5-backend` | npm packages |
| `@carbon/icons-react` (`DragVertical`, `Pin`, `PinFilled`) | `@carbon/icons-react` |
| Carbon `Search` | `@carbon/react` |

## Files that import it

| File | Components imported |
|------|---------------------|
| `components/HomePage/HomePageHeader.tsx` | `Modal`, `DisplaySettingsContent` |
| `components/pages/VersionsPage.tsx` | `Modal` |
| `components/pages/DeployAutomationPage.tsx` | `Modal` |
| `components/pages/BranchesPage.tsx` | `Modal` (default import) |
