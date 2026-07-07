import {
  Application,
  DataStructured,
  Package
} from '@carbon/icons-react';

// ---------------------------------------------------------------------------
// Inlined from @platform/business-logic (removed — example is self-contained)
// ---------------------------------------------------------------------------

/**
 * Returns a launch descriptor for a prototype registry entry.
 * canLaunch is true when rootLaunchCommand is a non-empty string.
 */
export function createLaunchDescriptor(prototype) {
  const command = prototype?.rootLaunchCommand?.trim() ?? '';
  return { canLaunch: command.length > 0, command };
}

/**
 * Adds computed validation metadata to a raw registry entry.
 * Marks entries without an id or title as invalid and surfaces a descriptive
 * error string.
 */
export function normalizePrototypeMetadata(prototype) {
  const errors = [];
  if (!prototype.id) errors.push('Missing required field: id');
  if (!prototype.title) errors.push('Missing required field: title');
  return {
    ...prototype,
    validation: { valid: errors.length === 0, errors }
  };
}

// ---------------------------------------------------------------------------
// Icon map — extend this object to support new prototype iconType values.
// Each key is a string set on the registry entry; the value is the Carbon
// icon component to render. Falls back to Application when the key is absent
// or unrecognised.
// ---------------------------------------------------------------------------

const PROTOTYPE_ICON_MAP = {
  api: DataStructured,
  ui: Package,
  app: Application
};

/**
 * Returns the Carbon icon component for a prototype.
 * Reads prototype.iconType; falls back to Application.
 */
export function getPrototypeIcon(prototype) {
  return PROTOTYPE_ICON_MAP[prototype.iconType] ?? Application;
}

// ---------------------------------------------------------------------------
// UI helpers
// ---------------------------------------------------------------------------

/**
 * Maps a prototype statusTag string to a Carbon Tag `type` prop value.
 * Carbon's Tag accepts the type string directly — this helper maps
 * domain vocabulary to the correct token.
 */
export function statusTagType(status) {
  if (status === 'Active') return 'green';
  if (status === 'Draft') return 'blue';
  if (status === 'Archived') return 'gray';
  return 'outline';
}

/** Returns true when href is an absolute http(s) URL. */
export function isExternalHref(href) {
  return /^https?:\/\//.test(href);
}

// ---------------------------------------------------------------------------
// Registry filtering / aggregation
// ---------------------------------------------------------------------------

export function filterRegistry(registry, query) {
  const normalizedQuery = query.trim().toLowerCase();
  if (!normalizedQuery) return registry;
  return registry.filter((prototype) =>
    [
      prototype.title,
      prototype.description,
      prototype.statusTag,
      prototype.designOwner,
      prototype.contributors.join(' '),
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
