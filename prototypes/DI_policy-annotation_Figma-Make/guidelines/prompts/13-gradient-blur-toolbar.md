# Progressive Gradient Blur — Floating Overlay Effect

A two-layer backdrop blur + gradient fade that sits between scrollable content and a floating element, creating a frosted-glass curtain that dissolves into the content below. Apply to any container that needs to float over scrolling content.

---

## Layer architecture

```
┌─ wrapper (position: absolute/fixed, full width, pointer-events: none) ┐
│                                                                         │
│  ┌─ layer 1: strong fade  (height: 100px) ──────────────────────────┐  │
│  │  backdrop-filter: blur(1px)                                       │  │
│  │  background: linear-gradient(to bottom,                           │  │
│  │    rgba(255,255,255,0.85)  0%,                                    │  │
│  │    rgba(255,255,255,0.70) 40%,                                    │  │
│  │    rgba(255,255,255,0.40) 70%,                                    │  │
│  │    rgba(255,255,255,0.15) 90%,                                    │  │
│  │    transparent           100%)                                    │  │
│  └───────────────────────────────────────────────────────────────────┘  │
│                                                                         │
│  ┌─ layer 2: secondary feather  (height: 120px) ─────────────────────┐  │
│  │  backdrop-filter: blur(0.5px)                                      │  │
│  │  background: linear-gradient(to bottom,                            │  │
│  │    transparent            0%,                                      │  │
│  │    rgba(255,255,255,0.10) 60%,                                     │  │
│  │    rgba(255,255,255,0.05) 85%,                                     │  │
│  │    transparent           100%)                                     │  │
│  └────────────────────────────────────────────────────────────────────┘  │
│                                                                         │
│  ┌─ your content (position: relative, pointer-events: auto) ─────────┐  │
│  │  [anything here]                                                   │  │
│  └────────────────────────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────────────────────┘
```

---

## Plain CSS

### Wrapper

```css
.blur-overlay-wrapper {
  position: absolute; /* or fixed */
  top: 0;
  left: 0;
  right: 0;
  z-index: 50;
  pointer-events: none;
}
```

### Layer 1 — strong fade

```css
.blur-overlay__primary {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100px;
  pointer-events: none;
  backdrop-filter: blur(1px);
  -webkit-backdrop-filter: blur(1px);
  background: linear-gradient(
    to bottom,
    rgba(255, 255, 255, 0.85)  0%,
    rgba(255, 255, 255, 0.70) 40%,
    rgba(255, 255, 255, 0.40) 70%,
    rgba(255, 255, 255, 0.15) 90%,
    transparent               100%
  );
}
```

### Layer 2 — secondary feather

```css
.blur-overlay__secondary {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 120px;
  pointer-events: none;
  backdrop-filter: blur(0.5px);
  -webkit-backdrop-filter: blur(0.5px);
  background: linear-gradient(
    to bottom,
    transparent               0%,
    rgba(255, 255, 255, 0.10) 60%,
    rgba(255, 255, 255, 0.05) 85%,
    transparent               100%
  );
}
```

### Content slot

```css
.blur-overlay__content {
  position: relative;
  pointer-events: auto;
}
```

---

## Key decisions

| Decision | Value | Why |
|---|---|---|
| Two layers instead of one | 1px + 0.5px blur | Avoids a hard blur edge; the secondary layer smooths the falloff |
| Layer heights exceed content height | 100–120px | Fade starts before the content edge so the boundary looks recessed, not clipped |
| White with alpha, not solid | `rgba(255,255,255,x)` | Content beneath stays visible; effect disappears naturally when the overlay is removed |
| `pointer-events: none` on blur layers | — | Scroll and click events pass through to content underneath |
