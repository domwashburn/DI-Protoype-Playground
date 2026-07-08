# Automations Data Layer Documentation

This directory contains comprehensive documentation for the decision automations data architecture.

## Documentation Structure

### 📐 Architecture
Core architecture design and patterns:
- [Architecture Overview](./architecture/architecture.md) - System architecture and design patterns
- [Architecture Rework Summary](./architecture/rework-summary.md) - Summary of major architecture changes

### 📘 Guides
How-to guides and best practices:
- [Branching and Versioning](./guides/branching-and-versioning.md) - Git-style branching for automations
- [Deployment Data Sync](./guides/deployment-data-sync.md) - Keeping deployment data synchronized
- [Local Variables System](./guides/local-variables.md) - Two-level local variables architecture

### 🔄 Migration
Migration guides and historical records:
- [Migration Guide](./migration/migration-guide.md) - Guide for migrating to registry architecture
- [Migration Complete](./migration/migration-complete.md) - Final migration status and results
- [Cleanup Summary](./migration/cleanup-summary.md) - File cleanup and verification

### 📚 Reference
Quick reference materials:
- [Quick Reference](./reference/quick-reference.md) - Quick lookup for common patterns and APIs

## Root Documentation

- [Main README](../README.md) - Overview of the automations data layer
- [Registry README](../registry/README.md) - Registry-specific documentation

## Getting Started

1. **Understanding the Architecture**: Start with [Architecture Overview](./architecture/architecture.md)
2. **Working with Automations**: See [Quick Reference](./reference/quick-reference.md)
3. **Adding New Automations**: Follow [Local Variables System](./guides/local-variables.md)
4. **Versioning Strategy**: Read [Branching and Versioning](./guides/branching-and-versioning.md)

## Additional Resources

- **Shared Types**: `/data/automations/shared/types.ts`
- **Tag Definitions**: `/data/automations/shared/tags.ts`
- **ID Mappings**: `/data/automations/shared/id-mappings.ts`
- **Lookup Utilities**: `/data/automations/lookups.ts`
