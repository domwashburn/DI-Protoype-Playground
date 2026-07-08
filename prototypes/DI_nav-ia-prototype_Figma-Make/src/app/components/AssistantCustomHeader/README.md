# AssistantCustomHeader

A compact (40px) custom header for the assistant chat surface. Renders a title with an optional chat-mode pill, inline-rename affordance, trailing action icons, and — in side mode — a leading overflow menu.

All visual tokens (color, type, border) come from Carbon v11 CSS custom properties via `AssistantCustomHeader.module.css`.

## Files

| File | Role |
| --- | --- |
| `index.ts` | Barrel export — import from here |
| `AssistantCustomHeader.tsx` | Main component; composes the others |
| `IconBtn.tsx` | Thin wrapper around Carbon `IconButton` (`kind="ghost"`, `size="md"`) centered in a 40px slot; supports `invisible` slot-keeper |
| `types.ts` | `AssistantCustomHeaderProps`, `MenuItemDef` |
| `AssistantCustomHeader.module.css` | Carbon-token-driven styles |

## Modes

| `mode` | Layout |
| --- | --- |
| `"full"` | Title + chat-mode tag + Settings + Artifacts |
| `"side"` | Adds leading overflow menu; hides Settings; adds Expand + Close |
| `"expanded"` | Same as full + Collapse + Close |

## Usage

### Basic (full mode)

```tsx
import { AssistantCustomHeader } from './AssistantCustomHeader';

<AssistantCustomHeader
  mode="full"
  title="Decision Assistant"
  chatMode="Build"
  onSettings={() => openSettings()}
  onArtifacts={() => openArtifacts()}
/>
```

### Side panel with overflow menu + rename

```tsx
const [title, setTitle] = useState('Decision Assistant');

<AssistantCustomHeader
  mode="side"
  title={title}
  onTitleChange={setTitle}
  onExpand={() => setLayout('expanded')}
  onClose={() => setOpen(false)}
  onOpenChats={() => router.push('/chats')}
  onNewChat={() => startNewChat()}
  onAssistantSettings={() => openAssistantSettings()}
  onChatDetails={() => openDetails()}
  onChatSettings={() => openChatSettings()}
  onResetChat={() => resetChat()}
/>
```

### Expanded mode (with collapse + close)

```tsx
<AssistantCustomHeader
  mode="expanded"
  title={title}
  editable={false}
  onCollapse={() => setLayout('side')}
  onClose={() => setOpen(false)}
  onSettings={openSettings}
  onArtifacts={openArtifacts}
/>
```

## Props

| Prop | Type | Notes |
| --- | --- | --- |
| `mode` | `'full' \| 'side' \| 'expanded'` | Required. Drives which controls render. |
| `title` | `string` | Defaults to `"Decision Assistant"`. |
| `onTitleChange` | `(next: string) => void` | Called when the user confirms an inline rename. |
| `editable` | `boolean` | Defaults to `true`. When `false`, rename affordance is hidden. |
| `chatMode` | `string` | Optional pill rendered after the title (e.g. `"Build"`). |
| `onExpand` / `onCollapse` / `onClose` | `() => void` | Trailing panel actions (mode-gated). |
| `onSettings` / `onArtifacts` | `() => void` | Trailing icon actions. |
| `onOpenChats` / `onNewChat` / `onAssistantSettings` / `onChatDetails` / `onChatSettings` / `onResetChat` | `() => void` | Overflow-menu items (`side` mode only). |

## Behavior notes

- **Rename**: clicking the inline edit icon (or selecting "Rename chat" in the overflow menu) swaps the title for an input. `Enter` confirms (calling `onTitleChange`), `Escape` cancels. Empty input falls back to the previous title. While editing, all trailing actions are disabled.
- **Escape key**: in `expanded` mode the first Escape calls `onCollapse`; a second Escape within 400ms calls `onClose`. In any other mode a single Escape calls `onClose`. Disabled while the title is being edited (Escape there cancels the rename). Implemented by the optional `useEscapeToClose` hook — delete `useEscapeToClose.ts` and its import + call site in `AssistantCustomHeader.tsx` to remove.
- **Overflow menu**: rendered by Carbon's `OverflowMenu` + `OverflowMenuItem` (`@carbon/react`). Open/close, outside-click, `Escape`, keyboard navigation and focus management are handled by Carbon. `MenuItemDef.topDivider` maps to `OverflowMenuItem`'s `hasDivider`. While editing, the trigger is disabled via the `.menuAnchorDisabled` wrapper (`pointer-events: none; opacity: 0.5`).
- **`invisible` slot**: in `side` mode the Settings button is rendered invisible so the title region retains its width across modes.

## Theming

Styles read from Carbon tokens — drop in `@carbon/react/css/styles.css` (or your themed equivalent) and the component picks up your theme automatically. Hex fallbacks in the CSS module match Carbon's White theme so the component still renders correctly without the token sheet loaded.
