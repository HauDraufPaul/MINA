use crate::state::AppState;
use serde::Serialize;
use std::path::PathBuf;
use tauri::State;
use tokio::process::Command;
use uuid::Uuid;

#[derive(Serialize)]
pub struct StatusPayload {
    pub version: String,
    pub uptime: f64,
}

#[derive(Serialize)]
pub struct FeedOperationResult {
    pub success: bool,
    pub message: Option<String>,
}

#[derive(Serialize)]
pub struct TerminalOutput {
    pub id: String,
    pub output: String,
}

#[tauri::command(alias = "core.status")]
pub fn status(state: State<'_, AppState>) -> Result<StatusPayload, String> {
    let uptime = state.start_time.elapsed().as_secs_f64();
    Ok(StatusPayload {
        version: env!("CARGO_PKG_VERSION").to_string(),
        uptime,
    })
}

#[tauri::command(alias = "feeds.add")]
pub fn add_feed(state: State<'_, AppState>, url: String) -> Result<FeedOperationResult, String> {
    let conn =
        rusqlite::Connection::open(&state.db_path).map_err(|e| format!("db open failed: {e}"))?;
    let id = Uuid::new_v4().to_string();
    conn.execute(
        "INSERT OR IGNORE INTO feeds (id, url) VALUES (?, ?)",
        rusqlite::params![id, url],
    )
    .map_err(|e| format!("insert feed failed: {e}"))?;

    Ok(FeedOperationResult {
        success: true,
        message: Some("feed registered".into()),
    })
}

#[tauri::command(alias = "terminal.run")]
pub async fn run_terminal(
    _state: State<'_, AppState>,
    command: String,
    cwd: Option<String>,
) -> Result<TerminalOutput, String> {
    let shell = if cfg!(windows) { "cmd" } else { "sh" };
    let flag = if cfg!(windows) { "/C" } else { "-c" };

    let mut cmd = Command::new(shell);
    cmd.arg(flag).arg(command);
    if let Some(cwd) = cwd {
        cmd.current_dir(cwd);
    }

    let output = cmd
        .output()
        .await
        .map_err(|e| format!("command execution failed: {e}"))?;

    let stdout = String::from_utf8_lossy(&output.stdout).to_string();
    let stderr = String::from_utf8_lossy(&output.stderr).to_string();
    let combined = if stderr.is_empty() {
        stdout
    } else {
        format!("{stdout}\n{stderr}")
    };

    Ok(TerminalOutput {
        id: Uuid::new_v4().to_string(),
        output: combined,
    })
}
