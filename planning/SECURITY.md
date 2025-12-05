# Sicherheit & Berechtigungen — Richtlinien für HomeHub

## Grundprinzipien
- Principle of Least Privilege: Features fordern nur die minimal notwendigen Berechtigungen an.
- Explicit Opt-in: Netzwerk-Scanning, Telemetrie oder Shell-Execution benötigen offensichtliche Zustimmung.
- Defense-in-Depth: Sanitisierung, sandboxes, TLS, signed artifacts.

## Netzwerk-Scanning & Netzwerktools
- Default: Netzwerk-Tools deaktiviert.
- Aktivierung: Nutzer muss explizit zustimmen (Modal + Erklärung der Auswirkungen).
- Laufzeit-Policies:
  - Timeouts und Rate-Limits für scan-Aufrufe.
  - Ergebnisse lokal behandeln; nur bei ausdrücklicher Zustimmung an externe Services senden.

## Encryption At Rest
- Standard: DB unverschlüsselt, aber mit OS-Dateisystem-Rechten.
- Optional: SQLCipher (recommended) enableable in Settings.
- Empfehlung: E2EE-Mode für sensible Daten (Notizen/Finanzen) — clientseitig verschlüsselt vor Sync.

## Secret Storage
- Nutze OS Keychain APIs:
  - macOS Keychain
  - Windows Credential Manager
  - Linux Secret Service (libsecret)
- Keine Secrets in Klartext in DB oder Logfiles.

## Communication Security
- TLS 1.2+ enforced for all remote comms; prefer TLS 1.3.
- Certificate pinning optional for sync endpoints.

## Code Signing & Updates
- Builds müssen signiert sein (macOS notarization, Windows signtool).
- Updater akzeptiert nur signierte Releases (verify signature before apply).
- CI: Release artifacts produziert nur mit protected main branch.

## Sandboxing & Execution Safety
- Creative Editor: Ausführung in Sandbox-Environment/WASM-Worker mit CPU/Memory-Limits und Timeout.
- Shell Commands: spawn in restricted environment; avoid running arbitrary commands as root.

## Logging & Telemetry
- Telemetry ist opt-in, minimal, und anonymisiert.
- Keine personenbezogenen Inhalte (PII) in Telemetrie.
- Logs mit sensitiven Informationen (API keys, tokens) werden automatisch redacted.

## Dependency Management
- Regelmäßige Dependency-Audits (monthly).
- Verwende `cargo audit` und `npm audit` in CI.

## Incident Response
- Kommunikationsplan, Bug-Bounty / Security Contact in README.
- Procedures for security fixes and forced-update mechanisms.

## Developer Guidance
- Secrets in CI: use encrypted secrets, never commit keys.
- Use `RUSTFLAGS` & reproducible builds where possible.

Kurz: Sicherheit ist konfigurierbar (Balance zwischen UX und Schutz). Standardmäßig sichere Defaults; stärkere Schutzmodi auf Opt-in.
## LLM / Ollama Security
- Modelle können großen Speicher/CPU-Bedarf haben; weise Nutzer auf Speicherbedarf hin und erlaube Modell-Auswahl.
- Lokale Modelle und Prompt-History sind sensibel: speichere nur wenn Nutzer zustimmt; bieten Opt-out und einfache Lösch-Option.
- Verifiziere Modell-Quellen und prüfe Lizenzen bevor automatische Downloads angeboten werden.

## Offline-LLM & Model-Handling
- Wenn `Ollama` oder andere lokale LLMs verwendet werden, gelten zusätzliche Regeln:
  - Modelle sollten standardmäßig nicht automatisch heruntergeladen werden — Nutzer entscheidet.
  - Modelldateien können sehr groß sein; prüfe verfügbaren Speicher und warne vor Installation.
  - Modell-Dateien und Cache sollten standardmäßig im App-Support-Ordner liegen und optional verschlüsselbar sein.
  - Prompt-History und temporäre Logs sind sensibel; standardmäßig lokal speichern und nur mit Opt-in extern teilen.

## Widget Safety
- Widgets dürfen keine ungesicherten externen Skripte ausführen. Third-party widgets müssen signed oder streng sandboxed werden.
