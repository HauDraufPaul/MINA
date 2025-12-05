use anyhow::{Context, Result};
use rusqlite::Connection;
use std::fs;
use std::path::Path;

pub fn run_migrations(db_path: impl AsRef<Path>) -> Result<()> {
    let db_path = db_path.as_ref();
    if let Some(parent) = db_path.parent() {
        fs::create_dir_all(parent).context("failed to create db directory")?;
    }

    let conn = Connection::open(db_path).context("failed to open sqlite database")?;
    let mut entries: Vec<_> = fs::read_dir("src-tauri/migrations")
        .context("failed to read migrations directory")?
        .filter_map(|entry| entry.ok())
        .filter(|entry| entry.path().extension().and_then(|ext| ext.to_str()) == Some("sql"))
        .collect();

    entries.sort_by_key(|entry| entry.file_name());

    for entry in entries {
        let path = entry.path();
        let sql = fs::read_to_string(&path)
            .with_context(|| format!("failed to read migration {}", path.display()))?;
        conn.execute_batch(&sql)
            .with_context(|| format!("failed to run migration {}", path.display()))?;
    }

    Ok(())
}
