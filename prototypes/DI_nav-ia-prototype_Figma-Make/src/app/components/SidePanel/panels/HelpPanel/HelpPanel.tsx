import React, { useRef, useState, useEffect } from 'react';
import { Theme, Search } from '@carbon/react';
import {
  Time,
  PlayOutline,
  UserMultiple,
  Earth,
  Bullhorn,
  Api,
  Settings,
  Star,
  Document,
  Launch,
  Roadmap,
  Cursor_1,
} from '@carbon/icons-react';
import { useNavigate } from 'react-router';
import { usePanelManager } from '../../PanelManager';
import styles from './HelpPanel.module.css';

import { HelpPanelHeader } from './HelpPanelHeader';
import { HelpPanelSection } from './HelpPanelSection';
import { HelpPanelLink } from './HelpPanelLink';
import { HelpPanelFooter } from './HelpPanelFooter';

type ItemKind = 'tour' | 'demo';

interface ToursDemosItem {
  key: string;
  title: string;
  kind: ItemKind;
  category: string;
}

const TOURS_AND_DEMOS: ToursDemosItem[] = [
  // Getting started
  { key: 'gs-1', title: 'Welcome to Decision Intelligence', kind: 'tour', category: 'Getting started' },
  { key: 'gs-2', title: 'Your first decision service', kind: 'demo', category: 'Getting started' },
  { key: 'gs-3', title: 'Navigating the workspace', kind: 'tour', category: 'Getting started' },
  // Decision assistant
  { key: 'da-1', title: 'Chat with the Decision Assistant', kind: 'demo', category: 'Decision assistant' },
  { key: 'da-2', title: 'Generating rules from natural language', kind: 'tour', category: 'Decision assistant' },
  { key: 'da-3', title: 'Explaining decision outcomes', kind: 'demo', category: 'Decision assistant' },
  // Decision automations
  { key: 'dau-1', title: 'Building your first automation', kind: 'tour', category: 'Decision automations' },
  { key: 'dau-2', title: 'Scheduling and triggering automations', kind: 'demo', category: 'Decision automations' },
  { key: 'dau-3', title: 'Monitoring automation runs', kind: 'tour', category: 'Decision automations' },
  // Decision services
  { key: 'ds-1', title: 'Creating a decision service', kind: 'tour', category: 'Decision services' },
  { key: 'ds-2', title: 'Versioning and publishing services', kind: 'demo', category: 'Decision services' },
  { key: 'ds-3', title: 'Calling a decision service via API', kind: 'tour', category: 'Decision services' },
  // Decision models
  { key: 'dm-1', title: 'Designing a DMN decision model', kind: 'tour', category: 'Decision models' },
  { key: 'dm-2', title: 'Working with decision tables', kind: 'demo', category: 'Decision models' },
  { key: 'dm-3', title: 'Linking models across services', kind: 'tour', category: 'Decision models' },
  // Task models
  { key: 'tm-1', title: 'Modeling a task workflow', kind: 'tour', category: 'Task models' },
  { key: 'tm-2', title: 'Assigning roles and owners', kind: 'demo', category: 'Task models' },
  { key: 'tm-3', title: 'Tracking task completion', kind: 'tour', category: 'Task models' },
  // GenAI nodes
  { key: 'gn-1', title: 'Adding a GenAI node to your flow', kind: 'tour', category: 'GenAI nodes' },
  { key: 'gn-2', title: 'Prompt engineering inside a node', kind: 'demo', category: 'GenAI nodes' },
  { key: 'gn-3', title: 'Grounding GenAI with enterprise data', kind: 'tour', category: 'GenAI nodes' },
  // ML nodes
  { key: 'ml-1', title: 'Connecting an ML model to a node', kind: 'tour', category: 'ML nodes' },
  { key: 'ml-2', title: 'Scoring and thresholding predictions', kind: 'demo', category: 'ML nodes' },
  { key: 'ml-3', title: 'Retraining and refreshing ML nodes', kind: 'tour', category: 'ML nodes' },
  // Testing, deploying, monitoring
  { key: 'tdm-1', title: 'Writing test scenarios', kind: 'tour', category: 'Testing, deploying, monitoring' },
  { key: 'tdm-2', title: 'Deploying to production', kind: 'demo', category: 'Testing, deploying, monitoring' },
  { key: 'tdm-3', title: 'Monitoring decision performance', kind: 'tour', category: 'Testing, deploying, monitoring' },
  // Goals
  { key: 'goal-1', title: 'Defining business goals', kind: 'tour', category: 'Goals' },
  { key: 'goal-2', title: 'Aligning decisions to KPIs', kind: 'demo', category: 'Goals' },
  { key: 'goal-3', title: 'Tracking goal progress over time', kind: 'tour', category: 'Goals' },
  // Decision Agents
  { key: 'agent-1', title: 'Creating your first Decision Agent', kind: 'tour', category: 'Decision Agents' },
  { key: 'agent-2', title: 'Agent reasoning and explainability', kind: 'demo', category: 'Decision Agents' },
  { key: 'agent-3', title: 'Orchestrating multi-agent workflows', kind: 'tour', category: 'Decision Agents' },
];

const CATEGORIES = [
  'Getting started',
  'Decision assistant',
  'Decision automations',
  'Decision services',
  'Decision models',
  'Task models',
  'GenAI nodes',
  'ML nodes',
  'Testing, deploying, monitoring',
  'Goals',
  'Decision Agents',
];

const iconForKind = (kind: ItemKind) => (kind === 'demo' ? Cursor_1 : Roadmap);

export default function HelpPanel() {
  const { closePanel } = usePanelManager();

  const navigate = useNavigate();
  const contentRef = useRef<HTMLDivElement>(null);
  const [isScrolled, setIsScrolled] = useState(false);
  const [view, setView] = useState<'main' | 'tours'>('main');
  const [search, setSearch] = useState('');

  useEffect(() => {
    const handleScroll = () => {
      if (contentRef.current) {
        setIsScrolled(contentRef.current.scrollTop > 10);
      }
    };

    const contentEl = contentRef.current;
    if (contentEl) {
      contentEl.addEventListener('scroll', handleScroll);
      return () => contentEl.removeEventListener('scroll', handleScroll);
    }
  }, [view]);

  useEffect(() => {
    if (contentRef.current) {
      contentRef.current.scrollTop = 0;
      setIsScrolled(false);
    }
  }, [view]);

  const handleLinkClick = (action: string) => {
    if (action.startsWith('resource-')) {
      navigate('/resource-hub');
    }
    console.log('Help link clicked:', action);
  };

  const topFive = CATEGORIES.slice(0, 5).map(
    (cat) => TOURS_AND_DEMOS.find((item) => item.category === cat)!
  );

  const filteredNested = TOURS_AND_DEMOS.filter((item) =>
    item.title.toLowerCase().includes(search.toLowerCase()) ||
    item.category.toLowerCase().includes(search.toLowerCase())
  );

  const visibleCategories = CATEGORIES.filter((cat) =>
    filteredNested.some((item) => item.category === cat)
  );

  const renderMain = () => (
    <>
      <HelpPanelHeader
        title="Get help"
        subtitle="Get help and learn more about Decision Intelligence"
        onClose={() => closePanel()}
        condensed={isScrolled}
      />

      <div className={styles.content} ref={contentRef}>
        <HelpPanelSection
          title="Tours and demos"
          actionText="View all"
          onActionClick={() => setView('tours')}
        >
          {topFive.map((item) => (
            <HelpPanelLink
              key={item.key}
              title={item.title}
              leftIcon={iconForKind(item.kind)}
              contained
              size="sm"
              onClick={() => handleLinkClick(item.key)}
            />
          ))}
        </HelpPanelSection>

        <HelpPanelSection title="Relevant articles">
          <HelpPanelLink
            key="article-intro"
            title="Introducing Decision Intelligence"
            description="Learn more about Decision Intelligence"
            rightIcon={Launch}
            contained
            onClick={() => handleLinkClick('article-intro')}
          />
          <HelpPanelLink
            key="article-assistant"
            title="Decision Assistant for Decision S..."
            description="Build and update decision services wi..."
            rightIcon={Launch}
            contained
            onClick={() => handleLinkClick('article-assistant')}
          />
          <HelpPanelLink
            key="article-designer"
            title="Decision Designer for Decision S..."
            description="Build and update decision services m..."
            rightIcon={Launch}
            contained
            onClick={() => handleLinkClick('article-designer')}
          />
          <HelpPanelLink
            key="article-deploy"
            title="Deploying decision services"
            description="Learn how to deploy decision services"
            rightIcon={Launch}
            contained
            onClick={() => handleLinkClick('article-deploy')}
          />
          <HelpPanelLink
            key="article-execute"
            title="Executing decision services"
            description="Learn how to run decision services"
            rightIcon={Launch}
            contained
            onClick={() => handleLinkClick('article-execute')}
          />
        </HelpPanelSection>

        <HelpPanelSection title="More resources">
          <HelpPanelLink
            key="resource-quick-start"
            title="Quick start guide"
            leftIcon={Time}
            rightIcon={Launch}
            onClick={() => handleLinkClick('resource-quick-start')}
          />
          <HelpPanelLink
            key="resource-videos"
            title="Video tutorials"
            leftIcon={PlayOutline}
            rightIcon={Launch}
            onClick={() => handleLinkClick('resource-videos')}
          />
          <HelpPanelLink
            key="resource-support"
            title="Contact support"
            leftIcon={UserMultiple}
            rightIcon={Launch}
            onClick={() => handleLinkClick('resource-support')}
          />
          <HelpPanelLink
            key="resource-community"
            title="Community forum"
            leftIcon={Earth}
            rightIcon={Launch}
            onClick={() => handleLinkClick('resource-community')}
          />
          <HelpPanelLink
            key="resource-release-notes"
            title="Release notes"
            leftIcon={Bullhorn}
            rightIcon={Launch}
            onClick={() => handleLinkClick('resource-release-notes')}
          />
          <HelpPanelLink
            key="resource-api"
            title="API documentation"
            leftIcon={Api}
            rightIcon={Launch}
            onClick={() => handleLinkClick('resource-api')}
          />
          <HelpPanelLink
            key="resource-mcp"
            title="MCP documentation"
            leftIcon={Settings}
            rightIcon={Launch}
            onClick={() => handleLinkClick('resource-mcp')}
          />
          <HelpPanelLink
            key="resource-whats-new"
            title="What's new"
            leftIcon={Star}
            rightIcon={Launch}
            onClick={() => handleLinkClick('resource-whats-new')}
          />
          <HelpPanelLink
            key="resource-product-docs"
            title="Product documentation"
            leftIcon={Document}
            rightIcon={Launch}
            onClick={() => handleLinkClick('resource-product-docs')}
          />
        </HelpPanelSection>
      </div>
    </>
  );

  const renderNested = () => (
    <>
      <HelpPanelHeader
        title="Tours and demos"
        subtitle="Explore tours and interactive demos"
        onClose={() => closePanel()}
        onBack={() => setView('main')}
        backLabel="Back to Get help"
        condensed={isScrolled}
      />

      <Search
        size="lg"
        labelText="Find a tour or demo"
        placeholder="Find a tour or demo"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className={styles.search}
      />

      <div className={styles.content} ref={contentRef}>
        {visibleCategories.map((cat) => (
          <HelpPanelSection key={cat} title={cat}>
            {filteredNested
              .filter((item) => item.category === cat)
              .map((item) => (
                <HelpPanelLink
                  key={item.key}
                  title={item.title}
                  leftIcon={iconForKind(item.kind)}
                  contained
                  size="sm"
                  onClick={() => handleLinkClick(item.key)}
                />
              ))}
          </HelpPanelSection>
        ))}
      </div>
    </>
  );

  return (
    <Theme theme="g100" className={styles.themeRoot}>
      <div className={styles.panel}>
        {view === 'main' ? renderMain() : renderNested()}
        <HelpPanelFooter text="IBM Decision Intelligence v0.0.0" />
      </div>
    </Theme>
  );
}
