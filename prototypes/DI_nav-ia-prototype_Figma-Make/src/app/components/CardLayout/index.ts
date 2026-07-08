/**
 * CardLayout Component Library
 * 
 * A modular, reusable card layout system with composable components.
 * 
 * ## Main Component
 * - CardLayoutTemplate: Complete layout with toolbar and grid
 * 
 * ## Sub-Components (can be used independently)
 * - Card: Individual card component
 * - CardGrid: Responsive grid container
 * - CardLayoutToolbar: Search/filter/view controls
 * - CardHeader, CardContent, CardFooter: Card composition components
 * 
 * @example
 * // Import main component
 * import CardLayoutTemplate from "./components/CardLayout";
 * 
 * @example
 * // Import sub-components
 * import CardLayoutTemplate, { Card, CardGrid, CardLayoutToolbar } from "./components/CardLayout";
 * 
 * @example
 * // Use standalone Card
 * import { Card } from "./components/CardLayout";
 * <Card title="My Card" description="Description" onClick={() => {}} />
 * 
 * @example
 * // Use Card with custom children
 * import { Card, CardHeader, CardContent } from "./components/CardLayout";
 * <Card onClick={() => {}}>
 *   <CardHeader><h3>Title</h3></CardHeader>
 *   <CardContent><p>Content</p></CardContent>
 * </Card>
 */

// Main component (default export)
export { default } from "./CardLayoutTemplate";

// Sub-components and utilities (named exports)
export { default as Card, CardHeader, CardContent, CardFooter } from "./Card";
export type { 
  CardProps, 
  CardMenuItem,
  CardHeaderProps, 
  CardContentProps, 
  CardFooterProps 
} from "./Card";

export { default as CardGrid } from "./CardGrid";
export type { CardGridProps } from "./CardGrid";

export { default as CardLayoutToolbar } from "./CardLayoutToolbar";
export type { CardLayoutToolbarProps, SortOption } from "./CardLayoutToolbar";

export { default as CardLayoutTemplate } from "./CardLayoutTemplate";
export type { CardLayoutTemplateProps } from "./CardLayoutTemplate";