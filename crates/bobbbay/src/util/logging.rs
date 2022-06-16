//! Utilities.

use color_eyre::eyre::Result;

/// Set up tracing and eyre.
pub(crate) fn setup_logging() -> Result<()> {
    tracing_subscriber::fmt()
        .event_format(tracing_subscriber::fmt::format().pretty())
        .init();

    // Set up hooks.
    let (panic_hook, eyre_hook) = color_eyre::config::HookBuilder::default().into_hooks();

    eyre_hook.install()?;

    std::panic::set_hook(Box::new(move |pi| {
        tracing::error!("{}", panic_hook.panic_report(pi));
    }));

    Ok(())
}
