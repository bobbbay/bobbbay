use axum::extract::Extension;
use color_eyre::eyre::Result;
use tera::Tera;

pub fn templates() -> Result<Extension<Tera>> {
    let templates = Tera::new("templates/**/*").unwrap();

    tracing::info!(
        "Registered templates: {:?}",
        templates.get_template_names().collect::<Vec<_>>()
    );

    Ok(Extension(templates))
}
