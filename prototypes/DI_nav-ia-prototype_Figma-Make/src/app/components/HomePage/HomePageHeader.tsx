import { useState } from "react";
import { Button } from "@carbon/react";
import svgPaths from "../../imports/svg-jon3mbttas";
import settingsIconPaths from "../../imports/svg-8azqa4lekk";
import styles from "./HomePageHeader.module.css";
import { Modal, DisplaySettingsContent } from "../Modal";
import { ChevronUp, ChevronDown } from "@carbon/icons-react";

// ── Stable icon component references (defined outside render to avoid new-FC-per-render) ──

/** Settings gear icon — composed from Figma-imported SVG paths.
 *  Accepts `className` so Carbon's Button can apply `.cds--btn__icon`
 *  positioning rules when this is passed as `renderIcon`. */
const SettingsIcon = ({ className }: { className?: string }) => (
  <svg
    viewBox="0 0 16 16"
    className={className}
    fill="currentColor"
    aria-hidden="true"
  >
    <path d={settingsIconPaths.p2acbe800} />
    <path d={settingsIconPaths.pb1a8400} />
  </svg>
);
SettingsIcon.displayName = "SettingsIcon";

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
            renderIcon={SettingsIcon}
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
                              <div className={styles.termIcon}>
                                <svg
                                  fill="none"
                                  preserveAspectRatio="none"
                                  viewBox="0 0 24 24"
                                >
                                  <g>
                                    <rect
                                      fill="white"
                                      fillOpacity="0.01"
                                      height="24"
                                      style={{
                                        mixBlendMode:
                                          "multiply",
                                      }}
                                      width="24"
                                    />
                                    <g>
                                      <path
                                        d={svgPaths.p37817100}
                                        fill="#525252"
                                      />
                                      <path
                                        d={svgPaths.p1a73cc80}
                                        fill="#525252"
                                      />
                                      <path
                                        d={svgPaths.p11e47970}
                                        fill="#525252"
                                      />
                                      <path
                                        d={svgPaths.p36b58080}
                                        fill="#525252"
                                      />
                                      <path
                                        d={svgPaths.p1697b400}
                                        fill="#525252"
                                      />
                                    </g>
                                  </g>
                                </svg>
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
                                      >
                                        <svg
                                          fill="none"
                                          preserveAspectRatio="none"
                                          viewBox="0 0 16 16"
                                        >
                                          <g>
                                            <rect
                                              fill="white"
                                              fillOpacity="0.01"
                                              height="16"
                                              style={{
                                                mixBlendMode:
                                                  "multiply",
                                              }}
                                              width="16"
                                            />
                                            <path
                                              d={
                                                svgPaths.pf9d6480
                                              }
                                              fill="#A8A8A8"
                                            />
                                          </g>
                                        </svg>
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
                        <div className={styles.taskTileIcon}>
                          <svg
                            fill="none"
                            preserveAspectRatio="none"
                            viewBox="0 0 24 24"
                          >
                            <g>
                              <rect
                                fill="white"
                                fillOpacity="0.01"
                                height="24"
                                width="24"
                              />
                              <path
                                d={svgPaths.p2e0fc7f0}
                                fill="#525252"
                              />
                            </g>
                          </svg>
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
                        <div className={styles.taskTileIcon}>
                          <svg
                            fill="none"
                            preserveAspectRatio="none"
                            viewBox="0 0 24 24"
                          >
                            <g>
                              <rect
                                fill="white"
                                fillOpacity="0.01"
                                height="24"
                                width="24"
                              />
                              <path
                                d={svgPaths.p38b1e480}
                                fill="#525252"
                              />
                            </g>
                          </svg>
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
          // Trigger the apply function from DisplaySettingsContent
          if ((window as any).__displaySettingsApply) {
            (window as any).__displaySettingsApply();
          }
          setIsDisplaySettingsOpen(false);
        }}
        size="large"
      >
        <DisplaySettingsContent
          isOpen={isDisplaySettingsOpen}
          onApply={() => {
            // Applied successfully
          }}
        />
      </Modal>
    </>
  );
}