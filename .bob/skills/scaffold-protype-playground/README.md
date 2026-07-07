# Self-Contained IBM Bob Skill

Use `carbon-prototype-platform-bob-skill.md` as the single Bob-ready skill/prompt.

It includes the full execution contract, file manifests, package boundaries, Carbon requirements, UI requirements, and validation checklist. It does not depend on the separate `docs/scaffolding-skills/core/` files.

Recommended use:

1. Open IBM Bob in an empty target directory.
2. Attach or paste `carbon-prototype-platform-bob-skill.md`.
3. Tell Bob: `Execute this self-contained skill exactly. Scaffold the repo directly.`
4. Require Bob to run `npm install`, `npm run check`, and `npm run verify:ui`.
