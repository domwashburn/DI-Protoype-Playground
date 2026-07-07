import { Button, Column, Grid, Search, Tile } from '@carbon/react';
import { HubSummaryPanel } from '../../components/HubSummaryPanel/index.js';
import { RegistryRow } from '../../components/RegistryRow/index.js';
import {
  createLaunchDescriptor,
  filterRegistry,
  getPrototypeIcon,
  getStatusCount,
  getStatusOptions
} from '../../lib/utils.js';
import styles from './HubView.module.scss';

export function HubView({
  onSelectPrototype,
  prototypes,
  query,
  setQuery,
  setStatusFilter,
  statusFilter
}) {
  const activeCount = prototypes.filter((p) => p.statusTag === 'Active').length;
  const docsCount = prototypes.reduce((total, p) => total + (p.docs?.length ?? 0), 0);
  const storageCount = prototypes.reduce((total, p) => total + (p.storageLinks?.length ?? 0), 0);
  const statusOptions = getStatusOptions(prototypes);
  const filteredByQuery = filterRegistry(prototypes, query);
  const filteredPrototypes =
    statusFilter === 'All'
      ? filteredByQuery
      : filteredByQuery.filter((p) => p.statusTag === statusFilter);

  const heroStats = [
    { label: 'Registry objects', value: prototypes.length },
    { label: 'Active', value: activeCount },
    { label: 'Docs', value: docsCount },
    { label: 'Storage links', value: storageCount }
  ];

  return (
    <div>

      {/* ── Hero band — full-bleed, content pinned to grid padding ─────────── */}
      <div className={styles.hubHeroBand}>
        <Grid narrow fullWidth>
          <Column sm={4} md={8} lg={16}>
            <section className={styles.hubHero} aria-labelledby="hub-title">
              <div className={styles.hubHeroCopy}>
                <div className={styles.docsEyebrow}>Management Control Center</div>
                <h1 id="hub-title">Prototype Hub</h1>
                <p>
                  Scan prototypes, stable component packages, documentation coverage, recordings,
                  and future LLM wiki context from one registry.
                </p>
              </div>
              <HubSummaryPanel stats={heroStats} />
            </section>
          </Column>
        </Grid>
      </div>

      {/* ── Main content — narrow grid ──────────────────────────────────────── */}
      <Grid narrow fullWidth>
        <Column sm={4} md={8} lg={16}>
          <div className={styles.managementPage}>

            <section className={styles.hubToolbar} aria-label="Registry search">
              <div className={styles.hubToolbarSearch}>
                <Search
                  closeButtonLabelText="Clear search"
                  id="hub-search"
                  labelText="Search prototype registry"
                  onChange={(event) => setQuery(event.target.value)}
                  placeholder="Search prototypes, docs, owners, context"
                  size="lg"
                  value={query}
                />
              </div>
              <div
                className={styles.hubStatusFilters}
                role="group"
                aria-label="Filter registry by status"
              >
                {statusOptions.map((status) => {
                  const isActive = statusFilter === status;
                  return (
                    <Button
                      aria-pressed={isActive}
                      className={styles.statusFilter}
                      key={status}
                      kind={isActive ? 'primary' : 'ghost'}
                      onClick={() => setStatusFilter(status)}
                      size="sm"
                    >
                      {`${status} ${getStatusCount(prototypes, status)}`}
                    </Button>
                  );
                })}
              </div>
            </section>

            <section className={styles.hubList} aria-label="Prototype registry index">
              <div className={styles.registryBoard}>
                <div className={styles.registryBoardHeader}>
                  <div>
                    <h2>Registry index</h2>
                    <p>
                      Workspace objects with launch readiness, docs, recordings, and context
                      coverage.
                    </p>
                  </div>
                  <span className={styles.registryBoardHeaderMeta}>
                    {filteredPrototypes.length} shown
                  </span>
                </div>
                <div className={styles.registryBoardColumns} aria-hidden="true">
                  <span className={styles.registryBoardColumn}>Workspace object</span>
                  <span className={styles.registryBoardColumn}>Evidence</span>
                  <span className={styles.registryBoardColumn}>Ownership</span>
                  <span className={styles.registryBoardColumn}>Action</span>
                </div>
                <div className={styles.registryList} role="list">
                  {filteredPrototypes.map((prototype) => (
                    <RegistryRow
                      key={prototype.id}
                      launch={createLaunchDescriptor(prototype)}
                      onSelectPrototype={onSelectPrototype}
                      prototype={prototype}
                      PrototypeIcon={getPrototypeIcon(prototype)}
                    />
                  ))}
                </div>
              </div>
              {filteredPrototypes.length === 0 ? (
                <Tile className={styles.emptyState}>
                  <h2>No registry objects match that search.</h2>
                  <p>Try a prototype title, owner, status, docs term, or context keyword.</p>
                </Tile>
              ) : null}
            </section>

          </div>
        </Column>
      </Grid>
    </div>
  );
}
