import styles from "./DashboardsPage.module.css";
import PageHeaderWrapper from "../PageHeaderWrapper";
import PlaceholderContent from "../PlaceholderContent";
import { InsetLayout } from "../SidePanel";

export default function DashboardsPage() {
  const dashboardsTabs = [
    { label: "Analytics", isActive: true },
    { label: "Performance", isActive: false },
    { label: "Reports", isActive: false },
    { label: "KPIs", isActive: false }
  ];

  return (
    <div className={styles.pageContainer} data-name="Dashboards Page">
      <PageHeaderWrapper title="Dashboards" tabs={dashboardsTabs} />

      <InsetLayout>
        {/* .pageContent is the scroll boundary — must be inside InsetLayout
            so the absolute-positioned section panel overlays visible content correctly. */}
        <div className={styles.pageContent}>
          <PlaceholderContent
            title="Dashboards content placeholder"
            description="Dashboards page content will be implemented here. Select this area to add new layouts and elements."
            variant="section"
          />
        </div>
      </InsetLayout>
    </div>
  );
}