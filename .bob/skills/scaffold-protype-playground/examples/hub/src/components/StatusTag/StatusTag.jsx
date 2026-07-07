import { Tag } from '@carbon/react';
import { statusTagType } from '../../lib/utils.js';

/**
 * Small coloured Tag reflecting a prototype's lifecycle status.
 * Wraps Carbon's Tag with the domain → type mapping from utils.
 */
export function StatusTag({ status }) {
  return (
    <Tag size="sm" type={statusTagType(status)}>
      {status}
    </Tag>
  );
}
