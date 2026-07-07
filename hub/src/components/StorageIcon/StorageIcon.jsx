import { Box as BoxIcon, Cloud, FolderShared } from '@carbon/icons-react';

export function StorageIcon({ provider }) {
  if (provider === 'Box') return <BoxIcon size={24} />;
  if (provider === 'OneDrive') return <Cloud size={24} />;
  return <FolderShared size={24} />;
}
