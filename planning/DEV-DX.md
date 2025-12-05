# Developer Experience — Workflow, Scripts, CI, Tests, Formatting

## Lokale Entwicklungsbefehle (Quick Start)
- Install prerequisites: Node, Rust, Tauri prerequisites (per OS).

### NPM / Yarn / PNPM Beispiel
```bash
# install deps
pnpm install
# start dev (frontend + tauri)
pnpm run dev
# build production
pnpm run build
# tauri build
pnpm run tauri:build
```

### Nutze diese Skripte (package.json)
- `dev` — frontend dev server + tauri dev
- `build` — frontend production build
- `tauri:build` — native bundles
- `format:js` — `prettier --write` auf src
- `format:rs` — `cargo fmt`

## Rust-spezifisch
```bash
# build
cargo build
# run backend tests
cargo test
# lint
cargo clippy -- -D warnings
```

## CI Matrix
- OS: macOS-latest, ubuntu-latest, windows-latest
- Node: 18.x, 20.x
- Rust: stable, 1 previous minor (for compatibility)
- Matrix jobs:
  - install deps
  - build frontend
  - run eslint & prettier check
  - cargo build & cargo clippy & cargo test
  - integration: tauri packaging (artifact creation)

## Testing Strategy
- Unit Tests: Rust unit tests (cargo test) & Jest/React Testing Library for components.
- Integration Tests: Rust-integration tests for IPC layer.
- E2E: Playwright for UI flows (Command Palette, Feed CRUD, Notizen).
- Visual Regression: Capture key transitions (framer-motion) with Playwright snapshots.

## Formatting & Linting
- JavaScript/TS: `prettier` + `eslint` with rules:
  - Use project Prettier config.
  - Enforce `no-console` only for production code.
- Rust: `cargo fmt` + `cargo clippy` (deny warnings on CI).

## Pre-commit & Hooks
- `husky` with `lint-staged` for frontend.
- `cargo-husky` to run `cargo fmt` and `clippy` pre-commit (light checks only).
- Commit-msg linting (conventional commits) optional.

## Local Dev Tips
- Generate types for IPC using binding tools; keep `src/tauri/api.ts` in sync.
- Use `TAURI_DEBUG=1` for verbose logs.
- For faster iteration disable notarization/packaging steps during development.

## Working with Local LLMs (Ollama)
- Mina supports integrating a local Ollama daemon for the in-app chat. For local development:
  - Document how to install and run Ollama (or model runner) locally and where models are stored.
  - Provide helper scripts to start/stop the local Ollama process in dev (e.g. `scripts/ollama-dev.sh`).
  - Mock the Ollama responses in unit/integration tests to avoid heavy model requirements in CI.

## Recommended VSCode Extensions
- Rust Analyzer, ESLint, Prettier, TSLint, EditorConfig.

## Release Workflow
- Feature branch -> PR with `Checklist` (MVP acceptance, tests, lint, snapshots).
- Protected `main` requires CI green and 1+ approver.

Developer DX ist ein kontinuierlicher Prozess: Feedback sammeln und CI/Script-Optimierungen nach Bedarf.