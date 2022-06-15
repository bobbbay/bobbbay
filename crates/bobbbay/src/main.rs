pub mod util;

use color_eyre::eyre::Result;

fn main() -> Result<()> {
    util::logging::setup_logging()?;

    tracing::info!("");

    Ok(())
}
