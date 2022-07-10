//! Utilities.

use std::panic;

use color_eyre::{config::HookBuilder, eyre::Result};
use tracing::error;

/// Set up tracing and eyre.
pub(crate) fn setup_logging() -> Result<()> {
    tracing_subscriber::fmt().pretty().try_init();

    // Set up hooks.
    let (panic_hook, eyre_hook) = HookBuilder::default().into_hooks();

    eyre_hook.install()?;

    panic::set_hook(Box::new(move |pi| {
        error!("{}", panic_hook.panic_report(pi));
    }));

    Ok(())
}
