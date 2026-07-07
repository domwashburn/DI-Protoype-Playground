import {
  Button,
  CodeSnippet,
  Column,
  Grid,
  Link,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Tag
} from '@carbon/react';
import { Application, ArrowLeft, Document, Launch } from '@carbon/icons-react';
import { AsideNav } from '../../components/AsideNav/index.js';
import { MediaGallery } from '../../components/MediaGallery/index.js';
import { MetadataPanel } from '../../components/MetadataPanel/index.js';
import { MetricTile } from '../../components/MetricTile/index.js';
import { PanelBlock } from '../../components/PanelBlock/index.js';
import { ResourceCard } from '../../components/ResourceCard/index.js';
import { SummaryPanel } from '../../components/SummaryPanel/index.js';
import { createLaunchDescriptor } from '../../lib/utils.js';
import { ContextSection } from './ContextSection.jsx';
import { DocsSection } from './DocsSection.jsx';
import { FilesSection } from './FilesSection.jsx';
import styles from './DetailView.module.scss';

const DETAIL_TABS = [
  { id: 'overview-tab', label: 'Overview' },
  { id: 'flows-demos-tab', label: 'Flows & Demos' },
  { id: 'prototype-details-tab', label: 'Prototype Details' }
];

const DETAIL_SECTIONS = [
  { id: 'health', label: 'Health' },
  { id: 'resources', label: 'Resources' },
  { id: 'launch', label: 'Launch' },
  { id: 'files', label: 'Meeting Recordings & Files' },
  { id: 'docs', label: 'Docs' },
  { id: 'context', label: 'Context' }
];

export function DetailView({ activePrototype, onBackToHub }) {
  const launch = createLaunchDescriptor(activePrototype);
  const validationErrors = activePrototype.validation.errors;
  const docs = activePrototype.docs ?? [];
  const storageLinks = activePrototype.storageLinks ?? [];

  return (
    <section className={styles.detailShell}>

      <div className={styles.detailHeroBand}>
        <Grid narrow fullWidth>
          <Column sm={4} md={8} lg={16}>
            <section className={styles.detailHero} aria-labelledby="prototype-title">
              <Button kind="ghost" onClick={onBackToHub} renderIcon={ArrowLeft} size="sm">
                Hub
              </Button>
              <div className={styles.docsEyebrow}>Prototype details</div>
              <h1 id="prototype-title">{activePrototype.title}</h1>
              <p>{activePrototype.description}</p>
              <div className={styles.tabsHeader}>
                <Tabs>
                  <TabList contained aria-label="Prototype detail sections" size="lg">
                    {DETAIL_TABS.map(({ id, label }) => (
                      <Tab key={id}>{label}</Tab>
                    ))}
                  </TabList>
                </Tabs>
              </div>
            </section>
          </Column>
        </Grid>
      </div>

      <Grid narrow fullWidth className={styles.detailGrid}>
        <Column lg={12} md={6} sm={4}>
          <div className={styles.detailPanels}>

            <section className={styles.docsPageSection} id="overview-tab">
              <div className={styles.docsSectionHeader}>
                <div className={styles.docsSectionEyebrow}>Overview</div>
                <h2>What this prototype is designed to prove</h2>
                <p>{activePrototype.description}</p>
              </div>

              <div className={styles.docsLeadSpace}>
                <div>
                  <h3>At a glance</h3>
                  <p>
                    Use this prototype record to understand design intent, ownership,
                    readiness, and launch path before opening the working implementation.
                  </p>
                </div>
                <div className={styles.docsTagRow}>
                  <Tag type="blue">{activePrototype.statusTag}</Tag>
                  <Tag type={activePrototype.validation.valid ? 'green' : 'red'}>
                    {activePrototype.validation.valid ? 'Validation passed' : 'Validation issues'}
                  </Tag>
                  <Tag type="gray">{docs.length} docs</Tag>
                </div>
              </div>

              <PanelBlock
                description="Current schema and workspace status for this registry object."
                id="health"
                title="Health"
              >
                <div className={styles.metricRow}>
                  <MetricTile
                    helperText={validationErrors[0] ?? 'Registry object passes required metadata checks.'}
                    label="Schema validation"
                    value={activePrototype.validation.valid ? 'Valid' : 'Invalid'}
                  />
                  <MetricTile
                    helperText="Command is intended to be run from the root workspace."
                    label="Launch command"
                    value={launch.canLaunch ? 'Ready' : 'Missing'}
                  />
                  <MetricTile
                    helperText="Local workspace package links keep this prototype unpublished."
                    label="Distribution"
                    value="Local"
                  />
                </div>
              </PanelBlock>

              <PanelBlock
                description="Primary execution and product-design references connected to this registry object."
                id="resources"
                title="Resources"
              >
                <div className={styles.resourceGrid}>
                  <ResourceCard heading="Epic tracking" icon={<Document size={24} />}>
                    {activePrototype.epicTrackingUrl ? (
                      <Link href={activePrototype.epicTrackingUrl}>Open epic</Link>
                    ) : (
                      <span>Not linked</span>
                    )}
                  </ResourceCard>
                  <ResourceCard heading="Figma spec" icon={<Launch size={24} />}>
                    {activePrototype.figmaSpecUrl ? (
                      <Link href={activePrototype.figmaSpecUrl}>Open spec</Link>
                    ) : (
                      <span>Not linked</span>
                    )}
                  </ResourceCard>
                  <ResourceCard
                    heading="Workspace"
                    icon={<Application size={24} />}
                    subText={activePrototype.rootLaunchCommand || 'No command configured'}
                  />
                </div>
              </PanelBlock>
            </section>

            <section className={styles.docsPageSection} id="flows-demos-tab">
              <div className={styles.docsSectionHeader}>
                <div className={styles.docsSectionEyebrow}>Flows &amp; Demos</div>
                <h2>Walkthrough and supporting prototype assets</h2>
                <p>
                  Launch guidance, recordings, and artifacts grouped for review sessions and async playback.
                </p>
              </div>

              <PanelBlock
                description="Run this command from the monorepo root."
                id="launch"
                title="Launch"
              >
                {launch.canLaunch ? (
                  <CodeSnippet feedback="Copied" type="single">
                    {activePrototype.rootLaunchCommand}
                  </CodeSnippet>
                ) : (
                  <p className={styles.emptyNote}>No launch command configured.</p>
                )}
              </PanelBlock>

              <FilesSection prototypeId={activePrototype.id} storageLinks={storageLinks} />

              <MediaGallery
                items={activePrototype.media ?? []}
                title="Screenshots & Recordings"
              />
            </section>

            <section className={styles.docsPageSection} id="prototype-details-tab">
              <div className={styles.docsSectionHeader}>
                <div className={styles.docsSectionEyebrow}>Prototype Details</div>
                <h2>Registry-backed documentation and context</h2>
                <p>
                  Linked docs, file references, and context sources associated with this prototype.
                </p>
              </div>

              <DocsSection docs={docs} prototypeId={activePrototype.id} />
              <ContextSection context={activePrototype.context} prototypeId={activePrototype.id} />
            </section>

          </div>
        </Column>

        <Column lg={4} md={2} sm={4}>
          <aside className={styles.detailAside} aria-label="Prototype status and metadata">
            <SummaryPanel
              figmaSpecUrl={activePrototype.figmaSpecUrl}
              lastUpdated={activePrototype.lastUpdated}
              launchReady={launch.canLaunch}
              status={activePrototype.statusTag}
            />
            <AsideNav sections={DETAIL_SECTIONS} />
            <MetadataPanel
              items={[
                { term: 'Design owner', description: activePrototype.designOwner },
                { term: 'Contributors', description: (activePrototype.contributors ?? []).join(', ') },
                { term: 'Registry ID', description: activePrototype.id },
                { term: 'Workspace command', description: activePrototype.rootLaunchCommand || '—' }
              ]}
            />
          </aside>
        </Column>
      </Grid>
    </section>
  );
}
