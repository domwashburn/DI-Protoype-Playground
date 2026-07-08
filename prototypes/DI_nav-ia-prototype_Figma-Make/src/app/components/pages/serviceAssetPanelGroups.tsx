import { type PanelTriggerConfig } from '../PageHeader';
import {
  ModelDetailsPanel,
  DependenciesPanel,
  ErrorReportPanel,
  ActivityHistoryPanel,
  ModelDetailsIcon,
  DependenciesIcon,
  ErrorReportIcon,
  ActivityHistoryIcon,
} from '../SidePanel';

/**
 * Trailing-edge panel groups shared by all five service asset detail pages.
 *
 * Group A: Model details (single)
 * Group B: Dependencies, Error report, Activity / History
 */
export const serviceAssetPanelGroups: PanelTriggerConfig[][] = [
  [
    {
      id: 'asset-model-details',
      ariaLabel: 'Model details',
      icon: ModelDetailsIcon,
      content: <ModelDetailsPanel />,
    },
  ],
  [
    {
      id: 'asset-dependencies',
      ariaLabel: 'Dependencies',
      icon: DependenciesIcon,
      content: <DependenciesPanel />,
    },
    {
      id: 'asset-error-report',
      ariaLabel: 'Error report',
      icon: ErrorReportIcon,
      content: <ErrorReportPanel />,
    },
    {
      id: 'asset-activity-history',
      ariaLabel: 'Activity / History',
      icon: ActivityHistoryIcon,
      content: <ActivityHistoryPanel />,
    },
  ],
];
