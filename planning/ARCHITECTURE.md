# Architektur-Spezifikation — IPC, Storage, Hintergrund, Sync, DB-Schema, Security

## Überblick
HomeHub ist eine Tauri-Desktop-App mit React/Zustand-Frontend und Rust-Core-Backend. Kommunikation erfolgt per IPC (RPC-stil) mit JSON-serialisierten Commands. Die App ist offline-first; persistente Daten werden lokal in einer SQLite-Datenbank gehalten. Hintergrundaufgaben laufen im Rust-Backend (Tokio/async) und synchronisieren optional mit einem entfernten Service.

## IPC-Patterns
- Primitive: `invoke(command: string, payload)` (Tauri `invoke`) für synchrone/async Calls.
- Events: `emit` / `listen` für Push-Events (z. B. Hintergrund-Feed-Update).
- Schema:
  - Commands sind namespaced: `feed.add`, `note.create`, `sync.push`.
  - Payloads strikt typisiert in Rust (serde) und gespiegelt in TypeScript-typings (generated via `ts-bindgen` / `tauri-bindgen`).
- Fehlerbehandlung: Fehlerobjekte standardisiert: `{ code: string, message: string, details?: any }`.

## Ollama / Local-LLM Integration
- Mina stellt auf allen Oberflächen einen Schnellzugriff auf ein lokales Chatfenster (Ollama) bereit. Integration erfolgt über:
  - Lokal laufender Ollama-Daemon (oder lokaler HTTP-Endpoint), kommuniziert über IPC / HTTP.
  - Rust-Backend verwaltet Modell-Pfade, Start/Stop des lokalen Daemon (optional) und Ressourcenlimits.
  - Frontend öffnet ein kontextsensitives Chatfenster; UI-Events/Context werden an Ollama übergeben (nur lokal).

Hinweis: Da Mina offline-first ist, ist die LLM-Integration so ausgelegt, dass Modelle lokal auf dem Gerät liegen oder optional nicht installiert werden können.

## Datenhaltung
- Primär DB: `SQLite` (datei-basiert) via `sqlx` oder `rusqlite`. Grund: zuverlässiger ACID, einfache Debugging/backup, Tauri-kompatibel.
- Optional: SQLCipher für Verschlüsselung-at-rest (auf Wunsch aktiviert).
- DB-Datei pro Benutzer: `~/.local/share/homehub/homehub.db` (macOS: `~/Library/Application Support/HomeHub/`)

## Background Tasks
- Rust-Backend nutzt Tokio (oder tauri::async_runtime) und spawnt Tasks für:
  - Feed-Poller (configurable interval, backoff)
  - Sync-Worker (retry-Queue)
  - Long-running package manager commands (streaming stdout)
- Tasks melden Status via IPC-Events (`feed.update.started`, `feed.update.finished`).

## Widget / Dashboard System
- Jede Hub-Startseite ist ein Dashboard mit modularen Widgets.
  - Widgets sind kleine UI-Module (NotesPreview, FeedTicker, MusicPlayer, PackageUpdates, NetworkSummary).
  - Widget-Layout & Konfiguration wird lokal persistiert in DB (positions, size, config).
  - Drag & Drop, add/remove widgets via Command Palette.
  - Widgets können lokale Rust-APIs via typed IPC aufrufen; heavy tasks bleiben im Backend.


## Sync-Strategie
- Design-Prinzip: Offline-first, eventual consistency.
- Basismodell:
  - Local authoritative DB; Änderungen werden in `sync_queue` geschrieben.
  - Background Sync-Worker sendet Deltas (per-entity) an Sync-Endpunkt.
  - Konfliktauflösung: LWW (last write wins) mit optionalem merge UI für Notizen/recipes.
- Optional: E2EE-Modus — Daten werden clientseitig verschlüsselt mit per-device keys; Server speichert nur Ciphertext.

## DB-Schema — Outline (ausgewählte Tabellen)
- `feeds`:
  - `id` TEXT PRIMARY KEY
  - `url` TEXT NOT NULL
  - `title` TEXT
  - `created_at` DATETIME
  - `last_checked` DATETIME
- `feed_items`:
  - `id` TEXT PRIMARY KEY
  - `feed_id` TEXT REFERENCES feeds(id)
  - `title` TEXT
  - `content` TEXT
  - `url` TEXT
  - `published_at` DATETIME
  - `is_read` BOOLEAN DEFAULT 0
- `notes`:
  - `id` TEXT PRIMARY KEY
  - `title` TEXT
  - `body_md` TEXT
  - `created_at` DATETIME
  - `updated_at` DATETIME
  - `tags` TEXT -- JSON ARRAY
- `tasks`:
  - `id` TEXT PRIMARY KEY
  - `title` TEXT
  - `status` TEXT (todo/doing/done)
  - `priority` INTEGER
  - `due_date` DATETIME
  - `hub` TEXT
- `recipes`:
  - `id`, `title`, `ingredients` JSON, `steps` TEXT
- `transactions`:
  - `id`, `amount` INTEGER (cents), `currency`, `date`, `category`
- `projects_creative`:
  - `id`, `name`, `files` JSON, `last_run_output` TEXT
- `sync_queue`:
  - `id`, `entity`, `entity_id`, `operation`, `payload`, `created_at`, `attempts`

- `dashboards`:
  - `id`, `hub`, `layout` JSON (widget positions), `created_at`, `updated_at`

- `music_index`:
  - `id`, `file_path`, `title`, `artist`, `album`, `duration`, `tags`, `indexed_at`

- `lego_collections`:
  - `id`, `name`, `items` JSON, `notes` TEXT, `created_at`

- `terminal_sessions` (ephemeral):
  - `id`, `cwd`, `command_history` JSON, `started_at`

(Alle Zeitfelder in UTC; `id` als UUIDv4.)

## Security Notes (Kurz)
- Inputs sanitizen: feed HTML via HTML-sanitizer before Rendering.
- Secrets: OS Keychain (macOS Keychain, Windows Credential Manager, Linux Secret Service) für API-Keys.
- Encryption-at-rest: optional SQLCipher.
- Sandboxed execution für Creative Editor: limitierte process capabilities, timeouts, resource limits.
- Network access: Netzwerk-Tools erfordern explizite Opt-In und will-permission-permission.

## LLM / Ollama Security
- Modelle können großen Speicher/CPU-Bedarf haben; weise Nutzer auf Speicherbedarf hin und erlaube Modell-Auswahl.
- Lokale Modelle und prompt-history sind sensibel: speichere nur wenn Nutzer zustimmt; bieten Opt-out.
- Verifiziere Modell-Quellen und prüfe Lizenzen bevor automatische Downloads angeboten werden.

## Deployment / Packaging
- Tauri builds für macOS (signed + notarized), Windows (signed) und Linux Snap/AppImage.
- Updater: Tauri Updater mit signed release artifacts.

## Erweiterungen
- Telemetrie nur opt-in; externe integrations (IFTTT, Zapier) über OAuth-Connected Services.

Referenzen: Tauri docs, sqlx, rusqlite, serde, tauri-bindgen.
