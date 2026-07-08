// Custom Carbon-compliant: InboxLayout component family
// Implements a master-detail "inbox" panel layout following Carbon Design System v11 conventions.
// Reference: https://carbondesignsystem.com/patterns/overview/
//
// Phase 8 status:
//   InboxLayoutTemplate  — Custom Carbon-compliant (no off-the-shelf Carbon equivalent)
//   InboxPanelHeader     — Custom Carbon-compliant (no off-the-shelf Carbon equivalent)
//   InboxPanelToolbar    — Custom Carbon-compliant; @carbon/react Search + Button (Phase 8)
//   InboxActionButton    — Custom Carbon-compliant; @carbon/react Button + @carbon/ibm-products Tearsheet
//   InboxPanelList       — Custom Carbon-compliant (composes LargeListItem)
//
// Icons are sourced from @carbon/icons-react.
// Legacy named exports (SearchIcon, FilterIcon, AddIcon) are kept for backward compatibility.

export { default as InboxLayoutTemplate } from './InboxLayoutTemplate';
export { default as InboxPanelHeader } from './InboxPanelHeader';
export { default as InboxPanelToolbar } from './InboxPanelToolbar';
export { default as InboxActionButton } from './InboxActionButton';
export { default as InboxPanelList } from './InboxPanelList';
export { SearchIcon, FilterIcon, AddIcon } from './icons';