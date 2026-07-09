import {
  HomePageSection,
  HomePageSectionTitle,
  HomePageSectionContent,
} from "./index";
import styles from "./PinnedDecisionAutomationSection.module.css";
import { Button } from "@carbon/react";
import { Add, PinFilled, CircleDash, PlayFilledAlt } from "@carbon/icons-react";

export interface DecisionService {
  id: string;
  name: string;
  type: string;
  version?: string;
  status: "running" | "not-running" | "draft";
  lastEditedBy: string;
  lastEditedOn: string;
}

export interface Dashboard {
  id: string;
  name: string;
  description: string;
}

export interface PinnedAutomation {
  id: string;
  name: string;
  description: string;
}

export interface PinnedDecisionAutomationSectionProps {
  pinnedAutomation?: PinnedAutomation;
  services?: DecisionService[];
  dashboards?: Dashboard[];
  onAutomationClick?: (automationId: string) => void;
  onNewService?: () => void;
  onAddDashboard?: () => void;
  onViewAllServices?: () => void;
  onViewAllDashboards?: () => void;
}

export function PinnedDecisionAutomationSection({
  pinnedAutomation,
  services = [],
  dashboards = [],
  onAutomationClick,
  onNewService,
  onAddDashboard,
  onViewAllServices,
  onViewAllDashboards,
}: PinnedDecisionAutomationSectionProps) {
  // Use provided automation or default
  const projectName = pinnedAutomation?.name || "{Project name}";
  const projectDescription =
    pinnedAutomation?.description || "A short project description limited to two lines max";

  // Default mock data
  const displayServices =
    services.length > 0
      ? services
      : [
          {
            id: "1",
            name: "Service 5",
            type: "Service type",
            version: "Draft",
            status: "not-running" as const,
            lastEditedBy: "Dom W.",
            lastEditedOn: "Mar 30, 2025",
          },
          {
            id: "2",
            name: "Service 4",
            type: "Service type",
            version: "v1.0.0",
            status: "running" as const,
            lastEditedBy: "Mai Chee V.",
            lastEditedOn: "Mar 30, 2025",
          },
          {
            id: "3",
            name: "Service 3",
            type: "Service type",
            version: "v1.0.0",
            status: "running" as const,
            lastEditedBy: "Mai Chee V.",
            lastEditedOn: "Mar 30, 2025",
          },
        ];

  const displayDashboards =
    dashboards.length > 0
      ? dashboards
      : [
          {
            id: "1",
            name: "Dashboard A",
            description: "Description of dashboard A",
          },
          {
            id: "2",
            name: "Dashboard B",
            description: "Description of dashboard B",
          },
        ];

  return (
    <HomePageSection backgroundColor="#e8e8e8">
      <HomePageSectionTitle
        title={
          <div className={styles.titleWithPin}>
            <div className={styles.pinIcon}>
              <PinFilled size={16} fill="#161616" />
            </div>
          </div>
        }
        subtitle={
          <div className={styles.projectInfo}>
            <p className={styles.projectName}>{projectName}</p>
            <p className={styles.projectDescription}>
              {projectDescription}
            </p>
          </div>
        }
      />
      <HomePageSectionContent>
        {/* Content Grid: 12-column layout (8 col services + 4 col dashboards) */}
        <div className={styles.contentGrid}>
          {/* Decision services - 8 columns */}
          <div className={styles.servicesSection}>
            {/* Title block */}
            <div className={styles.titleBlock}>
              <div className={styles.titleBlockInner}>
                <div className={styles.titleBlockContent}>
                  <p className={styles.titleBlockText}>
                    Decision services
                  </p>
                </div>
              </div>
              <div className={styles.titleBlockActions}>
                <Button
                  kind="primary"
                  size="md"
                  renderIcon={Add}
                  onClick={onNewService}
                >
                  New decision service
                </Button>
              </div>
            </div>

            {/* Data table */}
            <div className={styles.dataTable}>
              {/* Table header */}
              <div className={styles.tableHeader}>
                <div className={styles.headerCol1}>
                  <p className={styles.headerText}>Name</p>
                </div>
                <div className={styles.headerCol2}>
                  <p className={styles.headerText}>Status</p>
                </div>
                <div className={styles.headerCol3}>
                  <p className={styles.headerText}>
                    Last edited by
                  </p>
                </div>
                <div className={styles.headerCol4}>
                  <p className={styles.headerText}>
                    Last edited on
                  </p>
                </div>
              </div>

              {/* Table rows */}
              {displayServices.map((service) => (
                <div
                  key={service.id}
                  className={styles.tableRow}
                >
                  <div className={styles.divider} />
                  <div className={styles.rowContent}>
                    {/* Name cell */}
                    <div className={styles.cellName}>
                      <div className={styles.cellContent}>
                        <p className={styles.serviceName}>
                          {service.name}
                        </p>
                        <p className={styles.serviceMetadata}>
                          {service.type} •{" "}
                          {service.version || "Draft"}
                        </p>
                      </div>
                    </div>

                    {/* Status cell */}
                    <div className={styles.cellStatus}>
                      <div className={styles.cellContent}>
                        <div className={styles.statusWrapper}>
                          <div className={styles.statusIcon}>
                            {service.status === "running" ? (
                              <PlayFilledAlt size={16} fill="#0043CE" />
                            ) : (
                              <CircleDash size={16} fill="#6F6F6F" />
                            )}
                          </div>
                          <p className={styles.statusText}>
                            {service.status === "running"
                              ? "Running"
                              : "Not running"}
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Last edited by cell */}
                    <div className={styles.cellEditedBy}>
                      <div className={styles.cellContent}>
                        <p className={styles.cellText}>
                          {service.lastEditedBy}
                        </p>
                      </div>
                    </div>

                    {/* Last edited on cell */}
                    <div className={styles.cellEditedOn}>
                      <div className={styles.cellContent}>
                        <p className={styles.cellText}>
                          {service.lastEditedOn}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* View all footer */}
            <div className={styles.tableFooter}>
              <Button
                kind="ghost"
                size="sm"
                onClick={onViewAllServices}
              >
                View all
              </Button>
            </div>
          </div>

          {/* Dashboards - 4 columns */}
          <div className={styles.dashboardsSection}>
            {/* Title block */}
            <div className={styles.titleBlock}>
              <div className={styles.titleBlockInner}>
                <div className={styles.titleBlockContent}>
                  <p className={styles.titleBlockText}>
                    Dashboards
                  </p>
                </div>
              </div>
              <div className={styles.titleBlockActions}>
                <Button
                  kind="ghost"
                  size="sm"
                  hasIconOnly
                  renderIcon={Add}
                  iconDescription="Add dashboard"
                  onClick={onAddDashboard}
                />
              </div>
            </div>

            {/* Dashboard list */}
            <div className={styles.dashboardList}>
              {displayDashboards.map((dashboard) => (
                <div
                  key={dashboard.id}
                  className={styles.dashboardItem}
                >
                  <div className={styles.dashboardContent}>
                    <p className={styles.dashboardName}>
                      {dashboard.name}
                    </p>
                    <p className={styles.dashboardDescription}>
                      {dashboard.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* View all footer */}
            <div className={styles.dashboardFooter}>
              <Button
                kind="ghost"
                size="sm"
                onClick={onViewAllDashboards}
              >
                View all
              </Button>
            </div>
          </div>
        </div>
      </HomePageSectionContent>
    </HomePageSection>
  );
}