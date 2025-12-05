# Mina — Spezifikation & Sprint-Plan (Basierend auf deinen Antworten)

Kurz: Diese Datei fasst deine Antworten zusammen und liefert einen konkreten Sprint-Plan (Tasks + Story-Punkte). Alle Entscheidungen orientieren sich an: macOS + Windows (kein 32-bit), offline-first, single-user, OS-Keychain, SQL-Migrationen, strikte Trennung UI / Domäne, verpflichtende Tests, Ollama lokal manuell installierbar, CSS-frosted-glass UI (stark), snap-to-grid Dashboards, sandboxed Drittanbieter-Widgets, Vim-like globale Shortcuts, direkte Beta-Releases zu GitHub.

## Entscheidungsübersicht (Kurz)
- Plattformen: macOS & Windows (native builds, notarization/signing). Kein 32-bit.
- Offline / Sync: offline-first; optionaler Sync später (Opt-in).
- Nutzermodell: Single-user per Gerät; Geräte-Identitäten für optionalen Sync später.
- Secrets: OS Keychain (macOS Keychain, Windows Credential Manager).
- DB-Migrationen: SQL-basiert (sqlx/`migrations` oder vergleichbar).
- Architekturstil: Hexagonal / Clean Architecture (strikte Trennung Presentation ↔ Application ↔ Domain ↔ Infrastructure).
- Tests: verpflichtende Testabdeckung überall; API/UI/Network Tests im Dev-Hub.
- IPC-Typing: generierte Typed-Bindings (serde ↔ TS) automatisch.
- Ollama: manuelle Installation auf Nutzeraufforderung; Chat kann kompletten Kontext empfangen; Chat-Logs nicht gespeichert.
- UI: CSS-basierte frosted-glass Optik (stark), Motion-Balance (Animationen vs. Performance).
- Widgets: Drittanbieter erlaubt, aber sandboxed & signed; Widget-Fähigkeiten: Render, Call Backend APIs, Persist State, Spawn Background Jobs.
- Widgets Layout: Snap-to-grid.
- Music-Player: volle Features (playback, playlists, metadata, flac/mp3 usw.); indexing manuell.
- LEGO-Management: alle Felder; Im-/Export alle Formate (priorisiere JSON/CSV/Bricklink/Brickset).
- Dev-Hub: Terminal (PTY-backed, colors, mouse), Editor (Monaco, LSP, git integration); Terminal darf Befehle mit Hinweis ausführen.
- Storage: `User Documents` standardmäßig für Projekte.
- Package Managers: Unterstützung für alle relevanten registries; installs with user consent.
- Large assets: warnen bei Größe; optional mapping to external storage.
- Backups: tägliche Snapshots, Aufbewahrung: 7 Tage (konfigurierbar).
- Shortcuts: Vim-like global shortcuts (Configurable), z. B. `:` to command palette, `gg` top, `/` search, `dd` delete, `p` paste (design later).
- Releases: direkte GitHub Releases für beta (signed artifacts via CI).

## Sicherheits- und Privacy-Handling (Kurz)
- Ollama/Modelle: manuelle Install-Option, Modellpfade im App-Support, optional verschlüsselbar, Prompt-Kontext nur mit Zustimmung übergeben.
- Terminal: Warnungen vor potenziell gefährlichen/privilegierten Befehlen; separate helper-Binaries für elevated operations.
- Widgets: keine remote-executables; WebWorkers/WASM sandboxes, CSP + restricted IPC allowlist.

## Architektur-Highlights
- Hexagonal Layers:
  - Domain: Geschäftslogik in Rust, PURE, keine UI- oder DB-Abhängigkeiten.
  - Application: Use-Cases / Orchestrierung, Unit- und Integrationstests.
  - Infrastructure: DB (SQLite, migrations), Keychain, File-System, Ollama bridge.
  - Adapters/Ports: Typed IPC via tauri-bindgen, typed HTTP clients.
- Persistence: SQLite (rusqlite/sqlx) mit WAL & FTS5, SQL-Migrationen tracked in repo.
- Background workers: Tokio; jobs have IDs surfaced via IPC events.
- IPC Contract: generate TS defs from Rust serde types. Errors standardized.

## Testing Strategy (verpflichtend)
- Rust: `cargo test` unit + integration; `cargo fmt` + `clippy` enforced.
- Frontend: unit tests (Vitest/Jest), React Testing Library; visual regression snapshots for key transitions.
- E2E: Playwright for cross-platform flows including Ollama chat interactions (mocked for CI), Command Palette, Dashboards, Terminal.
- Coverage Gate: per-module minimal thresholds (e.g. 70–80%); kritische Module 90%.

## Sprint-Plan (6 Sprints, rough story-points)
Hinweis: 1 Story-Point ≈ 1 Entwickler-Tag (rough). Team: 2 devs + 0.5 designer. Priorisiere Sprint 1–3 for MVP.

### Sprint 0 — Repo & Scaffold (8 SP)
- Tasks:
  - Repo init (cargo workspace + tauri + frontend) — 2 SP
  - CI skeleton (macOS/Windows matrix), signing config placeholders — 2 SP
  - Prettier/ESLint/Husky + cargo hooks — 1 SP
  - SQL migration pipeline setup (migrations folder, runner) — 2 SP
  - IPC typegen pipeline initial (tauri-bindgen) — 1 SP

Acceptance: dev env starts with `pnpm run dev` + `cargo test` runs; CI skeleton green on sample.

### Sprint 1 — Core Storage, Auth, Settings, Ollama Bridge (10 SP)
- Tasks:
  - Implement SQLite integration, initial schema (feeds, notes, tasks, dashboards, music_index, lego) — 3 SP
  - OS Keychain wrapper (Rust `keyring`) — 1 SP
  - Global Settings UI & persistence (offline, motion, keychain settings) — 2 SP
  - Ollama bridge: spawn/stop helper + manual install check + UI button stub (no model download) — 2 SP
  - Tests: unit tests for DB layer + keychain mocks — 2 SP

Acceptance: DB created with migrations; settings persisted; Ollama bridge start/stop works locally (helper mocked acceptable).

### Sprint 2 — Notes, Feeds, Command Palette, Dashboards (12 SP)
- Tasks:
  - Notes CRUD + Markdown editor + search (FTS5 index) — 3 SP
  - RSS Reader: add feed, poll worker, store items (sanitization) — 3 SP
  - Command Palette + typed actions (invoke) — 2 SP
  - Dashboard: widget system prototype (snap-to-grid, persist layout) — 3 SP
  - Tests: integration tests for feeds & notes; E2E command palette flow — 1 SP

Acceptance: Notes+Feeds usable offline; command palette operates; dashboard layout persists.

### Sprint 3 — Tasks, Music, LEGO, Widget Ecosystem (14 SP)
- Tasks:
  - Task manager CRUD + keyboard flows (Vim-like mapping) — 2 SP
  - Music player (local playback, playlists, metadata) + manual indexing UI — 4 SP
  - LEGO management UI + import/export JSON/CSV — 3 SP
  - Widget API skeleton (render, call backend, persist state) + sandbox plan — 3 SP
  - Tests: component tests + E2E for music import & lego import — 2 SP

Acceptance: Task flows, Music playback with manual indexing, LEGO import/export, widget proto available.

### Sprint 4 — Dev-Hub Terminal & Editor Integration (16 SP)
- Tasks:
  - PTY-backed Terminal integration (Rust PTY + frontend xterm.js) — 6 SP
  - Monaco integration with LSP support & file explorer basics — 5 SP
  - Terminal security: elevated operation helper & warnings — 2 SP
  - Tests: integration tests for terminal session creation & code editor load — 3 SP

Acceptance: Interactive terminal works (colors/mouse), editor opens projects & basic LSP features.

### Sprint 5 — Polish, Packaging, Backup, Release (12 SP)
- Tasks:
  - Motion tokens & frosted-glass UI polish, reduced-motion support — 3 SP
  - Backup system (daily snapshots, 7-day retention) + restore UI — 2 SP
  - Large asset warnings, storage mapping UI — 1 SP
  - CI release pipeline: build signed artifacts, upload to GitHub Releases — 3 SP
  - Final tests: Playwright smoke tests & visual regression baselines — 3 SP

Acceptance: Polished UI, backups working, signed beta artifacts produced to GitHub releases.

## Issues / Initial Tickets (examples)
- `scaffold/initial-repo` — Setup cargo workspace + tauri + frontend template (8 SP)
- `db/migrations/001-init` — Create initial migration SQL (feeds, feed_items, notes, tasks, dashboards, music_index, lego) (3 SP)
- `core/ollama-bridge` — Implement local bridge + UI button (3 SP)
- `ui/dashboard` — Implement widget grid + persist (5 SP)
- `dev/terminal-pty` — Terminal PTY integration (6 SP)

## Acceptance & Definition of Done (DoD)
- Code: Linting & formatting applied; unit & integration tests pass.
- Docs: README updated with dev quickstart & Ollama manual install instr.
- QA: E2E smoke flows succeed; critical visual snapshots accepted.
- Security: Keychain used; no secrets persisted in cleartext; Ollama model install requires explicit consent.

## Next Schritte nach deiner Bestätigung
1. Review dieser Spezifikation und Sprint-Priorisierung.
2. Ich scafolde Branch `feature/mvp-scaffold` und erstelle die initialen issues (wenn du willst, kann ich das auch direkt in GitHub anlegen).
3. Beginne Sprint 0: ich erstelle die Repo-Struktur + CI skeleton.

Wenn du bereit bist, sage: „Starte Sprint 0“ oder bitte um Anpassungen (z. B. andere Story-Point-Granularität, andere Priorisierung der Sprints oder veränderte DoD). Danke!
