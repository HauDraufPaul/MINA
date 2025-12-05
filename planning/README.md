# HomeHub Planung — Übersicht und Nutzung

## Zweck
Dieses Verzeichnis enthält die Planungs-, Architektur- und UX-Dokumente für das Desktop-Projekt "mina" (Codename/HomeHub). Ziel ist es, ein gemeinsames, knappes Referenzset für Produkt, Design und Entwicklung bereitzustellen, damit das Team konsistent und schnell an der MVP-Implementierung arbeiten kann.

Wichtig: `mina` ist als lokal-first Desktop-Anwendung ausgelegt — volle Offline-Funktionalität ist das primäre Ziel. Erste Plattformen sind macOS und Windows.

## Inhalt der Dateien
- `MVP.md` — Liste der Minimalfeatures mit Akzeptanzkriterien und Begründung.
- `ARCHITECTURE.md` — Architekturentscheidungen: IPC, Datenspeicherung, Hintergrundaufgaben, Sync-Strategie, DB-Schema, Security-Notes.
- `UX-MOTION.md` — Richtlinien für Animationen, Accessibility, reduzierte Bewegung, Skeletons und Command-Palette.
- `ROADMAP.md` — 6 Meilensteine mit Zeitrahmen und Akzeptanzkriterien.
- `LIBRARIES.md` — Ausgewählte Bibliotheken (Frontend + Rust) mit Gründen und empfohlenen Versionen.
- `SECURITY.md` — Sicherheitsrichtlinien: Netzwerk, Verschlüsselung, Secrets, Code-Signing, Updates.
- `DEV-DX.md` — Entwickler-Flow: Scripts, lokale Befehle, CI-Matrix, Tests, Formatierung, Pre-commit.
- `QUESTIONS.md` — Offene Fragen an den Product Owner, priorisiert.
- `TODOS.md` — Konkrete Start-Tasks für das MVP mit Aufwandsschätzung.

Zusätzlich enthalten die Spezifikationen Hinweise zu einer eingebetteten lokalen Assistenz (`Ollama`-Chatfenster) welches auf allen Oberflächen per Button erreichbar ist, sowie dem Dashboard/Widget-System für jede Hub-Startseite.

## Wie man diese Dokumente verwendet
- Produktentscheidungen: Referenziere `MVP.md` und `QUESTIONS.md` während Planning Meetings.
- Implementierung: Halte dich an `ARCHITECTURE.md` und `DEV-DX.md` für Konsistenz.
- Design & UX: Nutze `UX-MOTION.md` als Source of Truth für Bewegungs- und Zugänglichkeitsregeln.
- Vor Pull Requests: Überprüfe `LIBRARIES.md` und `SECURITY.md` bei Aufnahme neuer Abhängigkeiten bzw. Features.

## Workflow-Empfehlungen
- Änderungen an diesen Markdown-Dateien erfordern: 1) kurze RFC in PR-Beschreibung, 2) Zustimmung von Produkt & Tech-Lead.
- Kleine tägliche Updates: Trage schnelle Abweichungen / Learnings in `QUESTIONS.md` oder als Kommentar in die jeweiligen Dateien.

## Quick start — wo anfangen
1. Lies `MVP.md` um das Ziel zu verstehen.
2. Folge `TODOS.md` um die lokale Entwicklungsumgebung aufzusetzen.
3. Starte mit Milestone 1 aus `ROADMAP.md`.

## Konventionen
- Aussagen in Präsens. Entscheidungen, nicht hypothetische Optionen.
- Verweise auf Dateien immer relativ: z. B. `planning/ARCHITECTURE.md`.

---

Bei Unklarheiten oder wenn du eine Datei erweitern willst: füge einen Eintrag in `planning/QUESTIONS.md` hinzu und eröffne eine kurze PR.
