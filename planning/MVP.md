# MVP (Minimum Viable Product) — Feature-Liste, Akzeptanzkriterien, Rationale

## Übersicht
MVP fokussiert auf Kernfunktionen, die den größten Nutzerwert liefern: Inhalte konsumieren (RSS), Informationen erfassen (Notizen, Tasks), leichte Produktivität (Kalender, Finanzen basal), und Developer/Creator-Tools. Priorität: native Performance, einfache Synchronisation (optional), exzellente UX.

Allgemein: Die Anwendung trägt den Namen `mina`. Sie soll so weit wie möglich offline funktionieren und initial für macOS und Windows ausgerichtet werden. Auf allen Oberflächen wird ein Button zum lokalen `Ollama`-Chatfenster vorhanden sein, der kontext-sensitiv Fragen zur aktuellen Oberfläche beantworten kann.

## 1) RSS-Reader — Offline-fähig, native Feed-Ansicht
- Akzeptanzkriterien:
  - Nutzer kann Feed-URLs hinzufügen/entfernen.
  - App lädt Artikel im Hintergrund und speichert sie lokal (SQLite).
  - Artikel können als gelesen/unread markiert werden und per Tag organisiert werden.
  - Artikelansicht rendert HTML sicher (CSP, sanitisierte Inhalte).
- Rationale: Hoher Engagement-Wert; einfache Content-Pipeline demonstriert offline-first.

## 2) Notizen — Schnell, lokal, Markdown
- Akzeptanzkriterien:
  - Erstellen, Bearbeiten, Löschen von Notizen; Markdown-Speicher.
  - Schnelle Suche (Titel & Inhalt) mit Instant-Ergebnissen.
  - Sync-Queue für späteren Upload (wenn Sync aktiviert).
- Rationale: Universelles Need; kleines surface area, hoher utility.

## 3) Task-Manager (Dev & Personal) — Kommandozentriert
- Akzeptanzkriterien:
  - Aufgaben anlegen, Priorität, Status, Fälligkeitsdatum.
  - Command-Palette (Cmd/Ctrl+K) um Aufgaben zu erstellen/navigieren.
  - Keyboard-first-Flows funktionieren vollständig.
- Rationale: Kern für Produktivität, zeigt Power-User-Workflows.

## 4) Command Palette — Zentraler Launcher
- Akzeptanzkriterien:
  - Öffnet per Shortcut; bietet fuzzy search über Aktionen, Notizen, Tasks, Hubs.
  - Schnellaktionen (z. B. "Add RSS https://...") funktionieren.
- Rationale: Macht die App discoverable und schnell bedienbar.

## 5) Package-Manager Helpers (Dev Tools) — NPM/Brew Wrappers
- Akzeptanzkriterien:
  - Anzeigen installierter Pakete, Suche, einfache Install/Remove via UI (lokal, simuliert erst).
  - Commands werden in isolierter Shell ausgeführt und können output-streamed werden.
- Rationale: Attraktiv für Developer-Hub; zeigt Native shell-integration.

## 6) Creative Editor — Minimaler Processing-like Editor
- Akzeptanzkriterien:
  - Ein Container, der JS/ WASM-Sketches ausführt (sichere Sandbox).
  - Speichern/öffnen von Projekten, einfache Live-Preview.
- Rationale: Differenzierende Funktion für "Create"-Hub; hohe Delight-Rate.

## 7) Core UX / Native Feel
- Akzeptanzkriterien:
  - Native window controls, smooth transitions, low-latency input.
  - Motion-System implementiert (siehe `UX-MOTION.md`).
- Rationale: Haupt-Versprechen der App — "extrem glatt und nativ".

## 8) Basic Persistence + Export/Import
- Akzeptanzkriterien:
  - Lokale DB (SQLite) für alle Kern-Entities.
  - JSON-Export/Import für Notizen & Tasks.
- Rationale: Vermeidet Datenverlust, erlaubt einfache Migration/Backup.

## Zusätzliche MVP-Erweiterungen (per Hub)
- Dashboards: Jede Hub-Startseite bietet ein konfigurierbares Dashboard mit verschiebbaren, austauschbaren Widgets (Drag & Drop, persistiert lokal).

**Personal-Hub (zusätzlich)**
- Musik-Player für lokale Musikdateien mit integrierter Suche/Indexierung.
- LEGO-Sammlung: einfaches Management-System (Katalogisieren, Sammlungslisten, Filter/Tags).

**Dev-Hub (zusätzlich)**
- Vollwertiges Terminal (z. B. Ghostty-Integration) mit Streaming-Output und Input-Passthrough.
- Integrierter Code-Editor (Monaco) mit Syntaxhighlighting, Datei-Explorer und Extensions-Sandbox.

**Einstellungen**
- Ein zentraler Einstellungsbereich teilt alle Hubs — global konfigurierbare Optionen (Offline, Sync, Keychain, Ollama-Modell, Motion/Accessibility).

## Nicht-MVP (geblockt)
- Full E2EE Sync Server, Trading/Finanz-Hochrechnung, Deep Package Management Automationen — planbar für Roadmap.

---
Jedes Item enthält ein klares Akzeptanzkriterium, das als Definition of Done für PR-Reviews dient.
