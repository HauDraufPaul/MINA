# Bibliotheken & Crates — Empfehlungsliste mit Begründung

## Frontend (React / TS)
- `react` — UI-Framework; empfohlen: ^18.2.0
- `zustand` — leichtgewichtige State-Library; minimal Boilerplate; empfohlen: ^4.x
- `react-router` — optional für deep links; empfohlen: ^6.x
- `framer-motion` — Motion-Primärbibliothek, Shared-element und complex transitions; empfohlen: ^10.x
  - Alternative: `react-spring` (falls physics-based animation bevorzugt werden)
- `remark` / `react-markdown` — Markdown-Rendering in Notizen; empfohlen: `react-markdown@^8.x`
- `prettier` & `eslint` — Formatierung & Linting; bereits installiert.
- `playwright` — E2E-Tests (GUI); empfohlen: ^1.x

## Additional Tools (Mina-specific)
- `monaco-editor` — Full-featured code editor for Create/Dev hub; recommended for integrated editing.
- `xterm.js` or `ghostty` frontend bindings — Terminal emulator for Dev hub (xterm.js for browser-based, ghostty for TTY-like behavior).
- `ollama` integration: prefer a local Ollama daemon/CLI bridge (no single official JS crate recommended) — implement via local HTTP or spawn + IPC.

## Native Bridge / Tauri
- `@tauri-apps/api` (frontend) — Tauri JS API; kompatibel mit Tauri stable.
- `tauri` CLI — Build/packaging.

## Rust Backend (Crates)
- `tauri` (Rust) — Plattform-Bridge.
- `serde` / `serde_json` — Serialisierung.
- `sqlx` — Async SQL (sqlite) mit compile-time checked queries; empfohlen: `sqlx = "^0.6"`.
  - Alternative: `rusqlite` (synchron, simpler API).
- `tokio` — Async runtime für Background Workers; `^1.40`.
- `reqwest` — HTTP Client für feeds, package registries, and sync; `^0.11`.
- `chrono` — Datums/Zeitzonen-Handling.
- `ring` / `age` / `orion` — Kryptographie primitives (je nach E2EE-Ansatz).
- `native-tls` / `rustls` — TLS-Stack je nach Platform.
- `anyhow` / `thiserror` — Fehlerbehandlung.

## Dev & Tooling
- `ts-node` / `typescript` — Dev-TS.
- `husky` + `lint-staged` — Pre-commit Hooks.
- `cargo-husky` — Rust-side hooks.

## Versionierungsempfehlungen
- Bevorzuge semver-minor-sprünge und feste `^`-Ranges im `package.json`.
- Pin kritische rust crates in `Cargo.toml` mittels `= "0.x.y"` für deterministische builds in CI.

## Hinweise zur Auswahl
- Bevorzuge Libraries mit aktiver Wartung und nativen TypeScript-Typen.
- Für kritische Funktionen (DB, Crypto) prüfe Sicherheitsreviews und CVEs.

Wenn eine Bibliothek eingeführt wird, dokumentiere sie in `planning/LIBRARIES.md` mit Grund und Version.
