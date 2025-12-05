use std::path::PathBuf;
use std::time::Instant;

pub struct AppState {
    pub start_time: Instant,
    pub db_path: PathBuf,
}
