#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

mod commands;
mod db;
mod state;

use commands::{add_feed, run_terminal, status};
use db::run_migrations;
use state::AppState;
use std::error::Error;
use std::time::Instant;
use tauri::{Manager, WindowBuilder};

fn main() -> Result<(), Box<dyn Error>> {
    let context = tauri::generate_context!();

    tauri::Builder::default()
        .setup(|app| {
            let app_data_dir = app
                .path_resolver()
                .app_data_dir()
                .ok_or("failed to resolve app data dir")?;

            let db_path = app_data_dir.join("mina.db");
            run_migrations(&db_path)?;

            app.manage(AppState {
                start_time: Instant::now(),
                db_path,
            });

            WindowBuilder::new(app, "main", tauri::WindowUrl::App("index.html".into()))
                .title("mina")
                .build()
        })
        .invoke_handler(tauri::generate_handler![status, add_feed, run_terminal])
        .run(context)?;

    Ok(())
}
