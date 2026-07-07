import { useEffect, useMemo, useState } from 'react';
import {
  Content,
  Header,
  HeaderGlobalAction,
  HeaderGlobalBar,
  HeaderMenuButton,
  HeaderName,
  Search,
  SideNav,
  SideNavItems,
  SideNavLink
} from '@carbon/react';
import { Asleep, Dashboard, Light, Search as SearchIcon } from '@carbon/icons-react';
import { prototypeRegistry } from './data/registry.js';
import { useNavigationMode } from './lib/useNavigationMode.js';
import {
  filterRegistry,
  getPrototypeIcon,
  normalizePrototypeMetadata
} from './lib/utils.js';
import { HubView } from './views/HubView/index.js';
import { DetailView } from './views/DetailView/index.js';
import styles from './App.module.scss';

// Derive the initial theme from the OS preference.
function getSystemTheme() {
  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'g90' : 'g10';
}

export default function App() {
  const prototypes = useMemo(
    () => prototypeRegistry.map(normalizePrototypeMetadata),
    []
  );

  const { isPersistent, isExpanded, setExpanded } = useNavigationMode();
  const [activeId, setActiveId] = useState(prototypes[0]?.id);
  const [activeView, setActiveView] = useState('hub');
  const [query, setQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [carbonTheme, setCarbonTheme] = useState(getSystemTheme);

  // Persist the chosen theme on the <html> element so CSS selectors pick it up.
  useEffect(() => {
    document.documentElement.setAttribute('data-carbon-theme', carbonTheme);
  }, [carbonTheme]);

  function toggleTheme() {
    setCarbonTheme((current) => (current === 'g10' ? 'g90' : 'g10'));
  }

  const filteredRegistry = useMemo(
    () => filterRegistry(prototypes, query),
    [prototypes, query]
  );
  const activePrototype =
    prototypes.find((p) => p.id === activeId) ?? prototypes[0];

  function closeTemporaryNav() {
    if (!isPersistent) setExpanded(false);
  }

  function selectPrototype(prototypeId) {
    setActiveId(prototypeId);
    setActiveView('detail');
    closeTemporaryNav();
  }

  function showHub() {
    setActiveView('hub');
    closeTemporaryNav();
  }

  return (
    <div className={styles.managementShell}>
      <Header aria-label="Management Control Center">
        <HeaderMenuButton
          aria-label={isExpanded ? 'Close navigation' : 'Open navigation'}
          isActive={isExpanded}
          onClick={() => setExpanded((current) => !current)}
        />
        <HeaderName href="#" onClick={showHub} prefix="IBM">
          Management Control Center
        </HeaderName>
        <HeaderGlobalBar>
          <HeaderGlobalAction aria-label="Search registry" onClick={showHub}>
            <SearchIcon size={20} />
          </HeaderGlobalAction>
          <HeaderGlobalAction
            aria-label={carbonTheme === 'g10' ? 'Switch to dark mode' : 'Switch to light mode'}
            onClick={toggleTheme}
            tooltipAlignment="end"
          >
            {carbonTheme === 'g10' ? <Asleep size={20} /> : <Light size={20} />}
          </HeaderGlobalAction>
        </HeaderGlobalBar>
      </Header>

      <SideNav
        aria-label="Prototype registry"
        expanded={isExpanded}
        isPersistent={isPersistent}
      >
        <SideNavItems>
          <div className={styles.registrySearch}>
            <Search
              closeButtonLabelText="Clear search"
              id="registry-search"
              labelText="Search prototypes"
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Search"
              size="md"
              value={query}
            />
          </div>
          <SideNavLink
            href="#"
            isActive={activeView === 'hub'}
            onClick={(event) => {
              event.preventDefault();
              showHub();
            }}
            renderIcon={Dashboard}
          >
            Prototype Hub
          </SideNavLink>
          {filteredRegistry.map((prototype) => (
            <SideNavLink
              href="#"
              isActive={activeView === 'detail' && prototype.id === activePrototype.id}
              key={prototype.id}
              onClick={(event) => {
                event.preventDefault();
                selectPrototype(prototype.id);
              }}
              renderIcon={getPrototypeIcon(prototype)}
            >
              {prototype.title}
            </SideNavLink>
          ))}
        </SideNavItems>
      </SideNav>

      <Content className={styles.managementContent}>
        {activeView === 'hub' ? (
          <HubView
            onSelectPrototype={selectPrototype}
            prototypes={prototypes}
            query={query}
            setQuery={setQuery}
            setStatusFilter={setStatusFilter}
            statusFilter={statusFilter}
          />
        ) : (
          <DetailView activePrototype={activePrototype} onBackToHub={showHub} />
        )}
      </Content>
    </div>
  );
}
