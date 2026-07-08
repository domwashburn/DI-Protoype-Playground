# InsetContentArea

Reusable layout primitive that renders content inside a Carbon `--cds-layer` card
inset by 16px gutters on the top, left, and right. The card hugs the viewport
bottom by default and exposes its content region as a container-query context so
children can reflow to available width instead of viewport width.

## Props

| Prop          | Type        | Default | Description                                         |
| ------------- | ----------- | ------- | --------------------------------------------------- |
| `toolbar`     | `ReactNode` | —       | Sticky toolbar rendered at the top of the card.     |
| `children`    | `ReactNode` | —       | Scrollable content; becomes a container-query root. |
| `flushBottom` | `boolean`   | `true`  | When true, removes the bottom outer gutter.         |

## When to use

Use on full-page experiences where the page content should sit inside a single
contained surface (toolbar + scrollable body) under the global breadcrumb bar.
First consumer: `ResourceHubPage`.
