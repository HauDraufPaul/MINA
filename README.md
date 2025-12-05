# mina — Desktop HomeHub (scaffold)

Dieses Repository enthält den Beginn eines Tauri + Rust + React/TypeScript Projekts namens `mina`.

Quickstart (nach Installation von Node, pnpm, Rust & tauri prerequisites):

```bash
cd /path/to/mina
pnpm install --filter frontend
cd frontend
pnpm run dev
```

Native dev with Tauri (once dependencies set up):

```bash
cd /path/to/mina
pnpm --filter frontend run build
cd src-tauri
cargo build
# or use `pnpm run tauri:build` if configured
```

Weitere Dateien und konkrete CI/Signing-Setups werden im Sprint 0 ergänzt.
