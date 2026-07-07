import {
  Application,
  DataStructured,
  Package
} from '@carbon/icons-react';

// ─────────────────────────────────────────────────────────────────────────────
// Metadata helpers (inlined from @platform/business-logic for browser safety)
// ─────────────────────────────────────────────────────────────────────────────

/**
 * Returns a launch descriptor for a prototype registry entry.
 */
export function createLaunchDescriptor(prototype) {
  const command = prototype?.rootLaunchCommand?.trim() ?? '';
  return { canLaunch: command.length > 0, command };
}

/**
 * Adds computed validation metadata to a raw registry entry.
 */
export function normalizePrototypeMetadata(prototype) {
  const errors = [];
  if (!prototype.id) errors.push('Missing required field: id');
  if (!prototype.title) errors.push('Missing required field: title');
  return {
    ...prototype,
    docs: prototype.docs ?? [],
    storageLinks: prototype.storageLinks ?? [],
    context: prototype.context ?? null,
    validation: { valid: errors.length === 0, errors }
  };
}

// ─────────────────────────────────────────────────────────────────────────────
// Icon map
// ─────────────────────────────────────────────────────────────────────────────

const PROTOTYPE_ICON_MAP = {
  api: DataStructured,
  ui: Package,
  app: Application
};

export function getPrototypeIcon(prototype) {
  return PROTOTYPE_ICON_MAP[prototype.iconType] ?? Application;
}

// ─────────────────────────────────────────────────────────────────────────────
// Status tag → Carbon Tag type
// ─────────────────────────────────────────────────────────────────────────────

export function statusTagType(status) {
  if (status === 'Active') return 'green';
  if (status === 'Draft') return 'blue';
  if (status === 'Blocked') return 'red';
  if (status === 'Paused') return 'warm-gray';
  if (status === 'Archived') return 'gray';
  return 'outline';
}

/** Returns true when href is an absolute http(s) URL. */
export function isExternalHref(href) {
  return /^https?:\/\//.test(href);
}

// ─────────────────────────────────────────────────────────────────────────────
// Registry filtering / aggregation
// ─────────────────────────────────────────────────────────────────────────────

export function filterRegistry(registry, query) {
  const normalizedQuery = query.trim().toLowerCase();
  if (!normalizedQuery) return registry;
  return registry.filter((prototype) =>
    [
      prototype.title,
      prototype.description,
      prototype.statusTag,
      prototype.designOwner,
      (prototype.contributors ?? []).join(' '),
      prototype.context?.summary ?? ''
    ]
      .join(' ')
      .toLowerCase()
      .includes(normalizedQuery)
  );
}

export function getStatusOptions(prototypes) {
  return ['All', ...new Set(prototypes.map((p) => p.statusTag))];
}

export function getStatusCount(prototypes, status) {
  if (status === 'All') return prototypes.length;
  return prototypes.filter((p) => p.statusTag === status).length;
}
