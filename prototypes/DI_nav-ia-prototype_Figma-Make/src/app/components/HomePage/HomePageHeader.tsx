import { useState, useRef } from "react";
import { Button } from "@carbon/react";
import styles from "./HomePageHeader.module.css";
import { Modal, DisplaySettingsContent } from "../Modal";
import { ChevronUp, ChevronDown, SettingsAdjust, WatsonxAi, SendAlt, WorkflowAutomation, ServiceDesk } from "@carbon/icons-react";

interface HomePageHeaderProps {
  userName?: string;
  onDisplaySettings?: () => void;
  onOpenAssistant?: () => void;
}

export function HomePageHeader({
  userName = "First name",
  onDisplaySettings,
  onOpenAssistant,
}: HomePageHeaderProps) {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isDisplaySettingsOpen, setIsDisplaySettingsOpen] =
    useState(false);
  const displaySettingsApplyRef = useRef<(() => void) | undefined>(undefined);

  const handleDisplaySettings = () => {
    setIsDisplaySettingsOpen(true);
    onDisplaySettings?.();
  };

  return (
    <>
      <div className={styles.homePageHeader}>
        {/* Hero image - decorative background */}
        <div className={styles.heroImage}>
          <div className={styles.heroImageBackground} />
          <p className={styles.heroImageText}>
            Here image placeholder
          </p>
        </div>

        {/* Header Actions - Display Settings and Expand/Collapse */}
        <div className={styles.headerActions}>
          <Button
            kind="ghost"
            size="md"
            onClick={handleDisplaySettings}
            type="button"
            renderIcon={SettingsAdjust}
            data-testid="settings-btn-icon"
          >
            Display settings
          </Button>
          <Button
            kind="ghost"
            size="md"
            onClick={() => setIsCollapsed(!isCollapsed)}
            type="button"
            renderIcon={isCollapsed ? ChevronDown : ChevronUp}
          >
            {isCollapsed ? "Expand" : "Collapse"}
          </Button>
        </div>

        {/* Header container - Carbon grid */}
        <div
          className={`${styles.headerContainer} ${isCollapsed ? styles.collapsed : ""}`}
        >
          {/* Welcome header - full width spanning all columns */}
          <div className={styles.welcomeHeaderWrapper}>
            <h1 className={styles.welcomeText}>
              Welcome, {userName}
            </h1>
          </div>

          {/* Welcome text area (left side) */}
          <div className={styles.welcomeTextWrapperOuter}>
            <div className={styles.welcomeTextWrapper}>
              <div className={styles.titleGroup}>
                <div className={styles.titleContainer}>
                  <p className={styles.titleText}>
                    Accelerate decision making at scale with
                    Decision Intelligence
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Tiles area (right side) */}
          <div className={styles.sectionTileGroup}>
            <div className={styles.taskSets}>
              {/* Chat Tile - AI Assistant */}
              <div className={styles.headerChatTile}>
                <div className={styles.chatTileInner}>
                  {/* AI Layer - background with gradient */}
                  <div className={styles.aiLayer}>
                    <div className={styles.aiBackground} />
                    <div className={styles.gradient}>
                      <div className={styles.gradientInner}>
                        <div
                          aria-hidden="true"
                          className={styles.gradientBorder}
                        />
                        <div
                          className={styles.gradientShadow}
                        />
                      </div>
                    </div>
                  </div>

                  {/* Content */}
                  <div
                    className={styles.chatTileContentWrapper}
                  >
                    <div
                      className={styles.chatTileContentInner}
                    >
                      <div className={styles.chatTileContent}>
                        <div className={styles.chatTileTop}>
                          {/* Icon and badges row */}
                          <div className={styles.iconBadgesRow}>
                            <div
                              className={styles.termIconWrapper}
                            >
                              <div className={styles.termIcon} data-testid="chat-tile-icon">
                                <WatsonxAi size={24} fill="#525252" />
                              </div>
                            </div>
                            <div className={styles.aiTileBeta}>
                              {/* Beta tag */}
                              <div
                                className={styles.betaTagCustom}
                              >
                                <div className={styles.betaTag}>
                                  <div
                                    className={
                                      styles.betaTagContent
                                    }
                                  >
                                    <div
                                      className={
                                        styles.betaLabel
                                      }
                                    >
                                      <p
                                        className={
                                          styles.betaText
                                        }
                                      >
                                        Beta
                                      </p>
                                    </div>
                                  </div>
                                </div>
                              </div>
                              {/* AI slug */}
                              <div className={styles.aiSlug}>
                                <div
                                  className={styles.aiSlugBase}
                                >
                                  <div
                                    aria-hidden="true"
                                    className={
                                      styles.aiSlugBorder
                                    }
                                  />
                                </div>
                                <p
                                  className={styles.aiSlugText}
                                >
                                  AI
                                </p>
                              </div>
                            </div>
                          </div>
                        </div>

                        {/* Chat tile body */}
                        <div className={styles.chatTileBody}>
                          <p className={styles.chatTileTitle}>
                            Chat and build decision services
                          </p>
                          <div
                            className={styles.chatPromptGroup}
                          >
                            <div
                              className={styles.chatPromptLine}
                            >
                              <div
                                className={styles.chatPrompt}
                              >
                                <div
                                  aria-hidden="true"
                                  className={
                                    styles.chatPromptBorder
                                  }
                                />
                                <div
                                  className={
                                    styles.chatPromptContent
                                  }
                                >
                                  <div
                                    className={
                                      styles.chatPromptInner
                                    }
                                  >
                                    <p
                                      className={
                                        styles.chatPromptText
                                      }
                                    >
                                      Start chatting...
                                    </p>
                                    <div
                                      className={
                                        styles.sendIconWrapper
                                      }
                                    >
                                      <div
                                        className={
                                          styles.sendIcon
                                        }
                                        data-testid="chat-send-icon"
                                      >
                                        <SendAlt size={16} fill="#A8A8A8" />
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                          <div
                            className={
                              styles.openAssistantButtonWrapper
                            }
                          >
                            <Button
                              kind="ghost"
                              size="sm"
                              onClick={onOpenAssistant}
                              className={
                                styles.openAssistantButton
                              }
                            >
                              Open decision assistant
                            </Button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Chat tile border */}
                  <div
                    aria-hidden="true"
                    className={styles.chatTileBorder}
                  />
                </div>
              </div>

              {/* New Project Tile */}
              <div className={styles.newDecisionProject}>
                <div className={styles.taskTile02}>
                  <div className={styles.taskTileInner}>
                    <div className={styles.taskTileContent}>
                      <div
                        className={styles.taskTileIconWrapper}
                      >
                        <div className={styles.taskTileIcon} data-testid="new-project-icon">
                          <WorkflowAutomation size={24} fill="#525252" />
                        </div>
                      </div>
                      <p className={styles.taskTileTextContent}>
                        Create a new decision project to get
                        started with decision automation
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* New Service Tile */}
              <div className={styles.newDecisionService}>
                <div className={styles.taskTile01}>
                  <div className={styles.taskTileInner}>
                    <div className={styles.taskTileContent}>
                      <div
                        className={styles.taskTileIconWrapper}
                      >
                        <div className={styles.taskTileIcon} data-testid="new-service-icon">
                          <ServiceDesk size={24} fill="#525252" />
                        </div>
                      </div>
                      <p className={styles.taskTileTextContent}>
                        Create a decision service in a new or
                        existing project
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Display Settings Modal - using standard Modal pattern */}
      <Modal
        isOpen={isDisplaySettingsOpen}
        onClose={() => setIsDisplaySettingsOpen(false)}
        title="Home page display settings"
        primaryButtonText="Apply"
        secondaryButtonText="Cancel"
        onPrimaryClick={() => {
          displaySettingsApplyRef.current?.();
          setIsDisplaySettingsOpen(false);
        }}
        size="large"
      >
        <DisplaySettingsContent
          isOpen={isDisplaySettingsOpen}
          onApply={() => {
            // Applied successfully
          }}
          applyRef={displaySettingsApplyRef}
        />
      </Modal>
    </>
  );
}
