# TODOs — Actionable Checklist für MVP-Scaffold (mit Aufwandsschätzung)

Hinweis zur Schätzung: small ~ <1d, medium ~ 2–5d, large ~ 1–3w (ein Entwickler)

## Projekt-Setup
- [ ] Repo initialisieren mit Monorepo-Struktur (frontend + rust) — small
- [ ] Tauri + React Boilerplate erstellen (`pnpm`, `cargo`) — small
- [ ] Prettier, ESLint, Husky, cargo-husky konfigurieren — small

## Infra & Tools
- [ ] CI-Basic: build & test pipeline (macOS/Linux/Windows matrix) — medium
- [ ] Add `cargo fmt` / `clippy` checks to CI — small

## Persistence & IPC
- [ ] Initial SQLite Schema anlegen & Migration-Skript — medium
- [ ] IPC typing: shared types generation pipeline (serde <-> TS) — medium

## Core Features (MVP)
- [ ] Feeds: Add/Remove Feed UI + backend polling worker — large
- [ ] Feed Items list + article view (sanitized) — medium
- [ ] Notes: CRUD + Markdown editor + search — medium
- [ ] Tasks: CRUD + keyboard flows + filtering — medium
- [ ] Command Palette: global overlay + fuzzy search — medium
- [ ] Package Manager UI: wrapper executing commands & streaming output — medium
- [ ] Creative Editor scaffold (sandboxed preview + project save) — large

## Mina-specific Tasks
- [ ] Add Ollama chat integration: UI button on all screens + local daemon bridge — medium
- [ ] Dashboard/Widget system: drag/drop + persistence per hub — large
- [ ] Personal: Music player + search indexing for local files — medium
- [ ] Personal: LEGO collection management UI + import/export — medium
- [ ] Dev: Integrate terminal emulator (ghostty/xterm.js) and wire to backend PTY — large
- [ ] Dev: Embed code editor (Monaco) and file explorer integration — large

## UX & Motion
- [ ] Motion tokens file + framer-motion setup — small
- [ ] Shared-element flow for item->detail — medium
- [ ] Reduced-motion switch in settings — small

## Security & Ops
- [ ] Keychain integration for secret storage — medium
- [ ] SQLCipher optional integration (proof-of-concept) — medium
- [ ] Signed builds pipeline (macOS notarize) — large

## Testing
- [ ] Unit tests for Rust backend core logic — medium
- [ ] Component tests for React components (Jest/RTL) — medium
- [ ] E2E Playwright happy-paths (Command palette, Create note, Add feed) — large

## Developer Experience
- [ ] Create local dev script `pnpm run dev` that starts all services — small
- [ ] Document dev environment in `README.md` — small

## Release Prep
- [ ] Export/Import JSON functionality for user data — medium
- [ ] Updater config + signed release test — large

## Misc
- [ ] Add `planning/QUESTIONS.md` items to next PO meeting — small
- [ ] Create issue templates and PR checklist in `.github/` — small

---
Priorisiere Tasks in Trello/Jira in dieser Reihenfolge for MVP 0.1 → 0.2. Wenn du möchtest, kann ich diese TODOs direkt in Issues umwandeln und PR-Templates vorschlagen.
