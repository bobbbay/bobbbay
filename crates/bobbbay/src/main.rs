#![feature(crate_visibility_modifier)]

pub mod util;

use color_eyre::eyre::Result;

fn main() -> Result<()> {
    util::logging::setup_logging()?;

    Ok(())
}
