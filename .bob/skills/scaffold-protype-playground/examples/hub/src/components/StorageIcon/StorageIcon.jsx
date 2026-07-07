import { Box as BoxIcon, Cloud, FolderShared } from '@carbon/icons-react';

/**
 * Renders the appropriate Carbon icon for a storage provider.
 * Accepts a `provider` string from the registry storageLinks schema.
 * Falls back to FolderShared for unrecognised providers.
 */
export function StorageIcon({ provider }) {
  if (provider === 'Box') return <BoxIcon size={24} />;
  if (provider === 'OneDrive') return <Cloud size={24} />;
  return <FolderShared size={24} />;
}
