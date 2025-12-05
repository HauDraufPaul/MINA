# Roadmap — Meilensteine (6) mit Zeitrahmen und Akzeptanzkriterien

Hinweis: Zeitangaben sind grobe Schätzungen für ein kleines Team (2–4 Entwickler + 1 Designer).

## Meilenstein 1 — Core Scaffold & Dev Setup (2 Wochen)
- Ziele:
  - Monorepo Struktur, Tauri + React Boilerplate, Rust backend minimal RPC.
  - DB-Schema initialisiert (SQLite), dev scripts.
- Aufgaben:
  - `tauri init` + React template, TS toolchain, Prettier/ESLint, cargo workspace.
  - CI basic build for macOS/Linux/Windows.
- Akzeptanz:
  - App startet, zeigt "Hello HomeHub" und IPC roundtrip funktioniert.

Zusatz: Meilenstein 1 etabliert auch den Projektnamen `mina`, basic offline-mode und builds für macOS/Windows.

## Meilenstein 2 — Feeds & Notes CRUD (4 Wochen)
- Ziele:
  - Implementiere RSS-Reader core (add feed, list items), und Notizen CRUD.
- Aufgaben:
  - Feed polling worker, DB tables `feeds` & `feed_items`.
  - Notizen UI + Markdown editor (simple).
- Akzeptanz:
  - Feed hinzufügen lädt Artikel, Notizen können erstellt/gesucht/exportiert werden.

Zusatz: Dashboard/Widget-Prototyp für Hubs (drag & drop) ist in Milestone 2 als Tech-Demo enthalten.

## Meilenstein 3 — Tasks, Command Palette, Dev Tools Shell (4 Wochen)
- Ziele:
  - Task-Manager, Command Palette, basic package-manager wrapper.
- Aufgaben:
  - Tasks CRUD, command-palette implementation, wrapper UI for NPM/Brew commands.
- Akzeptanz:
  - Tasks + Command Palette funktionieren vollständig per Keyboard; package commands streamen Output.

Zusatz: Dev-Hub Terminal (Ghostty) und Embedded Code-Editor Basisintegration (Monaco) werden hier als POC eingeführt.

## Meilenstein 4 — Creative Editor & UX Polish (4 Wochen)
- Ziele:
  - Lightweight creative editor, motion system integration, skeletons.
- Aufgaben:
  - Safe sketch sandbox, project file model, UX motion tokens integrated.
- Akzeptanz:
  - Sketches laufen im Sandbox, Hub transitions sind flüssig und getestete reduced-motion.

Zusatz: Ollama chatfenster wird als integrierte Hilfe/Assistent implementiert (lokal-first), mit basic context-passing.

## Meilenstein 5 — Persistence, Export/Import, Basic Sync (6 Wochen)
- Ziele:
  - Export/Import, sync queue, basic remote sync (opt-in), conflict UI.
- Aufgaben:
  - Implement Sync-Worker, REST sync endpoint client, E2EE optional prototype.
- Akzeptanz:
  - Daten können exportiert, importiert und zwischen zwei Geräten synchronisiert werden (manual server).

Hinweis: Sync ist optional; offline-first bleibt erste Priorität.

## Meilenstein 6 — Packaging, Signing, Beta Release (4 Wochen)
- Ziele:
  - Code-signing, auto-updater, release builds, basic telemetry (opt-in).
- Aufgaben:
  - macOS notarization, Windows signing, CI artifacts, prepare beta channel.
- Akzeptanz:
  - Signed builds, Updater tested, release notes erstellt.

## Weiteres
- Nach Meilenstein 6: Add-on Features (Finance advanced, Trading Calendar, Deep Package Integration, Third-party Plugins).

Zeitleiste (gesamt ~20 Wochen). Priorisiere MVP-Flow (Meilensteine 1–3) für erste user testing Runde.
