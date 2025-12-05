# UX & Motion Guidelines — Systematik, Accessibility, Patterns

## Ziel
Ein kohärentes Motion-System sicherstellen, das die App "nativer" und "flüssiger" wirken lässt, ohne Accessibility zu opfern. Animationen müssen performant und vorhersehbar sein.

## Motion-System
- Design Tokens: Definiere Timing-Token in `tokens/motion.json`:
  - `motion.duration.short: 120ms`
  - `motion.duration.medium: 200ms`
  - `motion.duration.long: 360ms`
  - `motion.easing.standard: cubic-bezier(0.2, 0.8, 0.2, 1)`
- Komponenten sollten aus diesen Tokens gebaut werden; keine ad-hoc durations.

## Shared-Element-Transitions
- Nutze shared-element transitions für Hub-Wechsel (z. B. von Listen-Item zu Detail):
  - Snapshot-Phase (JS: capture layout rect), Morphing-Phase (scale + translate + opacity).
  - Fallback: cross-fade wenn morphing zu komplex ist.
- Performance: animate transform + opacity only; keine layout-triggering CSS-Eigenschaften.

## Skeletons & Loading
- Nutze skeletons für Content-Loading (nicht reine spinners) — sie kommunizieren Struktur.
- Timing: Fade-in content nach skeleton animiert mit `motion.duration.short`.

## Reduced Motion
- Respektiere `prefers-reduced-motion` und in-app Einstellung (Global Toggle).
- Wenn reduziert: ersetze komplexe transitions durch instant switches oder sehr kurze fades.

## Accessibility
- Behalte 4.5:1 Farbkontrast für UI-Controls.
- Alle animierten Inhalte müssen pausierbar; fokussierbare Elemente müssen visuelle focus states haben.
- Motion darf nicht allein Informationsgehalt transportieren.

## Command Palette Behavior
- Öffnen: `Cmd/Ctrl+K` oder `Cmd/Ctrl+P`.
- Overlay: zentriert, niedrige Deckkraft-Hintergrund, Echtzeit-Fuzzy-Suche.
- Motion: Slide + fade-in (`short` duration). Reduce motion -> instant.
- Keyboard-first: Arrow keys, Enter, Esc to close; type-to-filter.

## Ollama Chat Button (kontextsensitiv)
- Auf allen Oberflächen wird ein immer sichtbarer Button zu einem lokalen `Ollama`-Chatfenster angezeigt (Corner-Floating oder Header-Button, designabhängig).
  - Öffnet ein modal/floating chat; übergibt optional Kontext (aktuelle Auswahl, Hub, aktive Entität).
  - Motion: leichtes pop/scale-in mit `short` duration; respect `prefers-reduced-motion`.

## Dashboard / Widgets
- Widgets sollten flüssig verschiebbar sein (drag handles, snap-to-grid optional).
- Animation beim Drag: translate + shadow lift; auf Drop: smooth reflow der anderen Widgets.
- Persistierte Layout-Änderungen sollten animiert übernommen werden (shared-element morphing optional).

## Keyboard-first Flows
- Standardisierte shortcuts pro Hub (z. B. `N` = neue Notiz, `T` = neue Task).
- Focus management: nach Aktion setzt Fokus sinnvoll (z. B. nach Task-Create Fokus auf Task-Title).
- Visible focus rings using system colors.

## Micro-interactions
- Toggle-Animationen: subtle springy easing for toggles & toasts.
- Feedback: success/toast appear with `short` timing and auto-dismiss after 3s (configurable).

## Motion Implementation Hints
- Frontend: use `framer-motion` for complex transitions; `react-spring` as alternative.
- Keep animation layers: translate/scale/opacity only in composite layer.
- Use `requestAnimationFrame` for JS-driven sequences, avoid setTimeout for frame-sync.

## Testing
- Add automated visual regression tests for key flows (Hero transitions, Command Palette).
- Manual checklist for QA includes: reduced-motion toggle, keyboard navigation, focus order.

## Examples / Tokens
```json
{
  "motion": {"duration": {"short": "120ms","medium": "200ms","long": "360ms"},"easing": "cubic-bezier(0.2,0.8,0.2,1)"}
}
```

## Zusammenfassung
Motion unterstützt Informationsarchitektur, nicht umgekehrt. Konsistente Tokens, respektierte Accessibility-Einstellungen und performant implementierte transitions sind Pflicht.
