// CARBON CLONE: Icon wrappers using @carbon/icons-react
// These re-export Carbon icons with consistent sizing for use in InboxLayout components.
// Reference: https://carbondesignsystem.com/elements/icons/usage/

import React from 'react';
import {
  Search as CarbonSearch,
  Filter as CarbonFilter,
  Add as CarbonAdd,
} from '@carbon/icons-react';

export function SearchIcon({ size = 16 }: { size?: number }) {
  return <CarbonSearch size={size} />;
}

export function FilterIcon({ size = 16 }: { size?: number }) {
  return <CarbonFilter size={size} />;
}

export function AddIcon({ size = 16 }: { size?: number }) {
  return <CarbonAdd size={size} />;
}
