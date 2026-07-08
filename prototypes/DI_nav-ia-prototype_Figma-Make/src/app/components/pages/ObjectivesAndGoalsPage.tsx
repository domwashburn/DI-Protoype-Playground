import { useState, useMemo, useEffect, useRef } from "react";
import styles from "./ObjectivesAndGoalsPage.module.css";
import PageHeaderWrapper from "../PageHeaderWrapper";
import {
  InboxLayoutTemplate,
  InboxPanelHeader,
  InboxActionButton,
  InboxPanelToolbar,
  InboxPanelList,
  AddIcon,
} from "../InboxLayout";
import LargeListItem from "../LargeListItem";
import { InsetLayout } from "../SidePanel";
import { useObjectives, useGoals, useAutomations } from "../../data/hooks";
import ObjectiveHierarchyTree from "../ObjectiveHierarchyTree";
import LinkedAutomationCard from "../LinkedAutomationCard";
import CardGrid from "../CardLayout/CardGrid";
import { useAppNavigation } from "../../hooks/useAppNavigation";

export default function ObjectivesAndGoalsPage() {
  const { navigate } = useAppNavigation();
  // Get real data from hooks
  const { objectives } = useObjectives();
  const { goals } = useGoals();
  const { automations } = useAutomations();
  
  // Initialize from persistent storage or first objective
  const [selectedObjectiveId, setSelectedObjectiveId] = useState<string>(() => {
    const firstId = objectives[0]?.id || "";
    return firstId;
  });
  
  const [activeTab, setActiveTab] = useState<
    "overview" | "kpis" | "insights" | "linked-automations" | "associated" | "manage"
  >("overview");

  // Initialize selection only if we don't have one and objectives are loaded
  useEffect(() => {
    if (!selectedObjectiveId && objectives.length > 0) {
      const firstId = objectives[0].id;
      setSelectedObjectiveId(firstId);
    }
  }, [objectives, selectedObjectiveId]);

  const selectedObjective = useMemo(
    () => objectives.find((obj) => obj.id === selectedObjectiveId),
    [objectives, selectedObjectiveId]
  );

  // Get goal for selected objective
  const selectedGoal = useMemo(
    () => goals.find((g) => g.id === selectedObjective?.goalId),
    [goals, selectedObjective]
  );

  // Get linked automations
  const linkedAutomations = useMemo(() => {
    if (!selectedObjective) return [];
    return automations.filter((auto) =>
      selectedObjective.automationIds.includes(auto.id)
    );
  }, [automations, selectedObjective]);

  const objectivesAndGoalsTabs = [
    {
      id: "overview",
      label: "Overview",
      isActive: activeTab === "overview",
    },
    {
      id: "kpis",
      label: "KPIs",
      isActive: activeTab === "kpis",
    },
    {
      id: "insights",
      label: "Insights",
      isActive: activeTab === "insights",
    },
    {
      id: "linked-automations",
      label: `Linked automations${linkedAutomations.length > 0 ? ` (${linkedAutomations.length})` : ''}`,
      isActive: activeTab === "linked-automations",
    },
    {
      id: "associated",
      label: "Associated",
      isActive: activeTab === "associated",
    },
    {
      id: "manage",
      label: "Manage",
      isActive: activeTab === "manage",
    },
  ];

  // Menu action handler
  const handleMenuAction = (action: string, objectiveId: string) => {
    console.log(`${action} for objective ${objectiveId}`);
  };

  // Get menu items for objectives
  const getObjectiveMenuItems = (objectiveId: string) => [
    {
      label: "Edit objective",
      onClick: () => handleMenuAction("Edit objective", objectiveId),
    },
    {
      label: "Objective settings",
      onClick: () => handleMenuAction("Objective settings", objectiveId),
    },
    {
      label: "Duplicate",
      onClick: () => handleMenuAction("Duplicate", objectiveId),
    },
    {
      label: "Export",
      onClick: () => handleMenuAction("Export", objectiveId),
    },
    { isDivider: true, label: "", onClick: () => {} },
    {
      label: "Delete",
      onClick: () => handleMenuAction("Delete", objectiveId),
      isDanger: true,
    },
  ];

  // Don't render until we have objectives and a selection
  if (objectives.length === 0 || !selectedObjective) {
    return (
      <div className={styles.pageContainer}>
        <div className={styles.pageContent}>
          <div className={styles.placeholderTab}>
            <h3 className={styles.placeholderTitle}>Loading objectives...</h3>
          </div>
        </div>
      </div>
    );
  }

  return (
    <InboxLayoutTemplate
      sidebar={
        <>
          <InboxPanelHeader title="Objectives" />
          <InboxActionButton
            label="New objective"
            icon={AddIcon}
            variant="combo"
            size="sm"
            fullWidth={true}
            onClick={() => console.log("Create new objective")}
            menuItems={[
              {
                label: "Import objective",
                onClick: () => console.log("Import objective"),
              },
              {
                label: "Create from template",
                onClick: () => console.log("Create from template"),
              },
              {
                label: "Extract from rules or policies",
                onClick: () => console.log("Extract from rules or policies"),
              },
            ]}
          />
          <InboxPanelToolbar
            searchPlaceholder="Find a business objective"
          />
          <InboxPanelList>
            {objectives.map((objective) => (
              <LargeListItem
                key={objective.id}
                id={objective.id}
                title={objective.name}
                isSelected={objective.id === selectedObjectiveId}
                onClick={() => setSelectedObjectiveId(objective.id)}
                showIcon={false}
                variant="description"
                description={objective.description}
                showMenu={true}
                menuItems={getObjectiveMenuItems(objective.id)}
                onMenuAction={handleMenuAction}
              />
            ))}
          </InboxPanelList>
        </>
      }
    >
      {/* Page Header with Tabs */}
      <PageHeaderWrapper
        title={selectedObjective?.name || "Objective"}
        tabs={objectivesAndGoalsTabs}
        onTabChange={(tabId) =>
          setActiveTab(
            tabId as
              | "overview"
              | "kpis"
              | "insights"
              | "linked-automations"
              | "associated"
              | "manage"
          )
        }
      />

      {/* View Content with Section Panel Support */}
      <InsetLayout>
        <div className={styles.pageContainer}>
        <div className={styles.pageContent}>
          <div className={styles.tabContent}>
            {activeTab === "overview" ? (
              <div className={styles.overviewTab}>
                {/* Objective Details */}
                <div className={styles.objectiveSection}>
                  <h3 className={styles.sectionTitle}>Objective Details</h3>
                  <div className={styles.detailGrid}>
                    <div className={styles.detailItem}>
                      <span className={styles.detailLabel}>Status</span>
                      <span className={`${styles.detailValue} ${styles[`status-${selectedObjective?.status}`]}`}>
                        {selectedObjective?.status?.replace('-', ' ')}
                      </span>
                    </div>
                    <div className={styles.detailItem}>
                      <span className={styles.detailLabel}>Priority</span>
                      <span className={`${styles.detailValue} ${styles[`priority-${selectedObjective?.priority}`]}`}>
                        {selectedObjective?.priority}
                      </span>
                    </div>
                    <div className={styles.detailItem}>
                      <span className={styles.detailLabel}>Category</span>
                      <span className={styles.detailValue}>
                        {selectedObjective?.category?.replace('-', ' ')}
                      </span>
                    </div>
                    <div className={styles.detailItem}>
                      <span className={styles.detailLabel}>Progress</span>
                      <span className={styles.detailValue}>
                        {selectedObjective?.progress}%
                      </span>
                    </div>
                  </div>
                  <div className={styles.progressBar}>
                    <div
                      className={styles.progressFill}
                      style={{ width: `${selectedObjective?.progress || 0}%` }}
                    ></div>
                  </div>
                </div>

                {/* Description */}
                <div className={styles.objectiveSection}>
                  <h3 className={styles.sectionTitle}>Description</h3>
                  <p className={styles.sectionText}>
                    {selectedObjective?.description}
                  </p>
                </div>

                {/* Strategic Goal */}
                {selectedGoal && (
                  <div className={styles.objectiveSection}>
                    <h3 className={styles.sectionTitle}>Strategic Goal</h3>
                    <div className={styles.goalCard}>
                      <div className={styles.goalHeader}>
                        <span className={styles.goalName}>{selectedGoal.name}</span>
                        <span className={styles.goalProgress}>{selectedGoal.progress}%</span>
                      </div>
                      <p className={styles.goalDescription}>{selectedGoal.description}</p>
                      <div className={styles.goalMeta}>
                        <span className={styles.goalImpact}>{selectedGoal.impactArea}</span>
                        <span className={`${styles.goalStatus} ${styles[`status-${selectedGoal.status}`]}`}>
                          {selectedGoal.status.replace('-', ' ')}
                        </span>
                      </div>
                    </div>
                  </div>
                )}

                {/* Owner & Team */}
                <div className={styles.objectiveSection}>
                  <h3 className={styles.sectionTitle}>Owner & Team</h3>
                  <div className={styles.teamList}>
                    <div className={styles.teamMember}>
                      <div className={styles.memberAvatar}>
                        {selectedObjective?.owner
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </div>
                      <div className={styles.memberInfo}>
                        <div className={styles.memberName}>
                          {selectedObjective?.owner}
                        </div>
                        <div className={styles.memberRole}>Owner</div>
                        {selectedObjective?.team && (
                          <div className={styles.memberTeam}>
                            {selectedObjective.team}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Timeline */}
                <div className={styles.objectiveSection}>
                  <h3 className={styles.sectionTitle}>Timeline</h3>
                  <div className={styles.timeline}>
                    <div className={styles.timelineItem}>
                      <span className={styles.timelineLabel}>Start Date</span>
                      <span className={styles.timelineValue}>
                        {new Date(selectedObjective?.startDate || "").toLocaleDateString()}
                      </span>
                    </div>
                    <div className={styles.timelineItem}>
                      <span className={styles.timelineLabel}>Target Date</span>
                      <span className={styles.timelineValue}>
                        {new Date(selectedObjective?.targetDate || "").toLocaleDateString()}
                      </span>
                    </div>
                    {selectedObjective?.achievedDate && (
                      <div className={styles.timelineItem}>
                        <span className={styles.timelineLabel}>Achieved Date</span>
                        <span className={styles.timelineValue}>
                          {new Date(selectedObjective.achievedDate).toLocaleDateString()}
                        </span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ) : activeTab === "kpis" ? (
              <div className={styles.placeholderTab}>
                <h3 className={styles.placeholderTitle}>
                  KPIs
                </h3>
                <p className={styles.placeholderText}>
                  Key performance indicators and metrics will
                  appear here.
                </p>
              </div>
            ) : activeTab === "insights" ? (
              <div className={styles.placeholderTab}>
                <h3 className={styles.placeholderTitle}>
                  Insights
                </h3>
                <p className={styles.placeholderText}>
                  Data-driven insights and analysis will appear
                  here.
                </p>
              </div>
            ) : activeTab === "linked-automations" ? (
              <div className={styles.automationsTab}>
                {linkedAutomations.length > 0 ? (
                  <>
                    <div className={styles.automationsHeader}>
                      <h2 className={styles.automationsTitle}>
                        Decision automations supporting this objective
                      </h2>
                      <p className={styles.automationsDescription}>
                        These automations directly contribute to achieving this business objective.
                      </p>
                    </div>
                    <CardGrid viewMode="grid">
                      {linkedAutomations.map((automation) => (
                        <LinkedAutomationCard 
                          key={automation.id} 
                          automation={automation}
                          onClick={(automationId) => navigate('automation-detail', { automationId })}
                        />
                      ))}
                    </CardGrid>
                  </>
                ) : (
                  <div className={styles.emptyState}>
                    <h3 className={styles.emptyStateTitle}>No linked automations</h3>
                    <p className={styles.emptyStateText}>
                      This objective doesn't have any linked decision automations yet. Link automations to track how they contribute to achieving this objective.
                    </p>
                  </div>
                )}
              </div>
            ) : activeTab === "associated" ? (
              <div className={styles.associatedTab}>
                {selectedObjective && (
                  <ObjectiveHierarchyTree
                    currentObjective={selectedObjective}
                    allObjectives={objectives}
                  />
                )}
              </div>
            ) : activeTab === "manage" ? (
              <div className={styles.placeholderTab}>
                <h3 className={styles.placeholderTitle}>
                  Manage
                </h3>
                <p className={styles.placeholderText}>
                  Management settings and configuration options
                  will appear here.
                </p>
              </div>
            ) : null}
          </div>
        </div>
      </div>
      </InsetLayout>
    </InboxLayoutTemplate>
  );
}