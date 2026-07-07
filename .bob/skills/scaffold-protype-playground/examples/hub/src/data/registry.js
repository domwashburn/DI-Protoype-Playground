export const prototypeRegistry = [
  {
    id: 'frontend-react-1',
    iconType: 'app',
    title: 'Frontend React Prototype',
    description: 'Carbon React sandbox for rapidly drafting product screens before extracting stable UI primitives.',
    lastUpdated: '2026-07-07',
    designOwner: 'Design Platform',
    contributors: ['Platform Engineering', 'Experience Design'],
    statusTag: 'Active',
    epicTrackingUrl: 'https://example.com/epics/frontend-react-1',
    figmaSpecUrl: 'https://figma.com/file/example/frontend-react-1',
    rootLaunchCommand: 'npm run dev:frontend',
    docs: [
      {
        title: 'Prototype notes',
        description: 'Embedded implementation notes covering current screen behavior and extraction candidates.',
        href: 'apps-prototypes/frontend-react-1/src/App.jsx',
        status: 'Embedded',
        type: 'Source notes'
      },
      {
        title: 'Carbon Sass entry',
        description: 'Shared Carbon styling imported through the local UI workspace package.',
        href: 'packages/ui-components/src/carbon.scss',
        status: 'Embedded',
        type: 'Styling'
      }
    ],
    storageLinks: [
      {
        label: 'Design review recordings',
        provider: 'Box',
        href: 'https://box.com/s/frontend-react-1-recordings'
      },
      {
        label: 'Research playback notes',
        provider: 'OneDrive',
        href: 'https://onedrive.live.com/?id=frontend-react-1-playback'
      }
    ],
    context: {
      status: 'Stubbed',
      summary: 'Reserved for a future LLM wiki that can knit together source notes, launch history, design reviews, and linked recordings.',
      sources: ['Registry metadata', 'Embedded source docs', 'Design review recordings']
    }
  },
  {
    id: 'backend-api',
    iconType: 'api',
    title: 'Backend API Prototype',
    description: 'Express mock service for exercising data contracts, validation, and API middleware in isolation.',
    lastUpdated: '2026-07-07',
    designOwner: 'Platform Engineering',
    contributors: ['API Enablement'],
    statusTag: 'Draft',
    epicTrackingUrl: 'https://example.com/epics/backend-api',
    figmaSpecUrl: 'https://figma.com/file/example/backend-api',
    rootLaunchCommand: 'npm run dev:api',
    docs: [
      {
        title: 'API server entry',
        description: 'Embedded Express routes for health checks, prototype metadata, and validation.',
        href: 'apps-prototypes/backend-api/src/server.js',
        status: 'Embedded',
        type: 'API contract'
      },
      {
        title: 'Shared validation helpers',
        description: 'Node-safe metadata normalization and validation used by the mock API.',
        href: 'packages/business-logic/src/index.js',
        status: 'Embedded',
        type: 'Logic'
      }
    ],
    storageLinks: [
      {
        label: 'API standup recordings',
        provider: 'Box',
        href: 'https://box.com/s/backend-api-recordings'
      },
      {
        label: 'Middleware review folder',
        provider: 'OneDrive',
        href: 'https://onedrive.live.com/?id=backend-api-review'
      }
    ],
    context: {
      status: 'Stubbed',
      summary: 'Future wiki context can summarize route intent, validation decisions, fixture shape, and meeting follow-ups.',
      sources: ['API route docs', 'Business logic package', 'Middleware review folder']
    }
  },
  {
    id: 'ui-components',
    iconType: 'ui',
    title: 'Shared UI Components',
    description: 'Stable Carbon React primitives with Storybook documentation and local workspace exports.',
    lastUpdated: '2026-07-07',
    designOwner: 'Design Systems',
    contributors: ['Platform Engineering'],
    statusTag: 'Active',
    epicTrackingUrl: 'https://example.com/epics/ui-components',
    figmaSpecUrl: 'https://figma.com/file/example/ui-components',
    rootLaunchCommand: 'npm run dev:ui',
    docs: [
      {
        title: 'Storybook stories',
        description: 'Embedded component examples for PrototypeShell, MetricTile, and status display.',
        href: 'packages/ui-components/src/components/PrototypeShell.stories.jsx',
        status: 'Embedded',
        type: 'Storybook'
      },
      {
        title: 'Package exports',
        description: 'Stable local workspace exports for shared Carbon primitives and Sass entries.',
        href: 'packages/ui-components/src/index.js',
        status: 'Embedded',
        type: 'Package API'
      }
    ],
    storageLinks: [
      {
        label: 'Component critique recordings',
        provider: 'Box',
        href: 'https://box.com/s/ui-components-critiques'
      },
      {
        label: 'Design system review folder',
        provider: 'OneDrive',
        href: 'https://onedrive.live.com/?id=ui-components-review'
      }
    ],
    context: {
      status: 'Stubbed',
      summary: 'Future wiki context can connect component stories, adoption notes, design review decisions, and package ownership.',
      sources: ['Storybook stories', 'Package exports', 'Design review folders']
    }
  }
];
