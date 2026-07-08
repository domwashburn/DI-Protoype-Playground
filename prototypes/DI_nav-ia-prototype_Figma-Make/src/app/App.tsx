/**
 * /App.tsx — Phase 1B
 *
 * Simplified to RouterProvider. All shell logic lives in /layouts/AppLayout.tsx.
 * Route config lives in /routes.tsx.
 *
 * Previous exports (NavigationRoute, AppState) have moved to /types/navigation.ts.
 * All consumers updated in Phase 1C.
 */
import { RouterProvider } from 'react-router';
import { router } from './routes';

// Carbon uses Lit web components internally; suppress the dev-mode console warning.
(globalThis as Record<string, unknown>).litIssuedWarnings ??= new Set();
((globalThis as Record<string, unknown>).litIssuedWarnings as Set<string>).add('dev-mode');

export default function App() {
  return (
    <>
      {/* MARKER-MAKE-KIT-INVOKED */}
      {/* MARKER-MAKE-KIT-DISCOVERY-READ */}
      {/* MARKER-MAKE-KIT-TOKENS-READ */}
      {/* MARKER-MAKE-KIT-FINAL-CHECK-READ */}
      <RouterProvider router={router} />
    </>
  );
}
