import { Tag } from '@carbon/react';
import { statusTagType } from '../../lib/utils.js';

export function StatusTag({ status }) {
  return (
    <Tag size="sm" type={statusTagType(status)}>
      {status}
    </Tag>
  );
}
