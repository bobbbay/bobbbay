use crate::error::AppError;
use axum::{extract, response::Html, Extension};
use tera::Tera;

pub async fn get_article(
    extract::Path(name): extract::Path<String>,
    Extension(ref mut templates): Extension<Tera>,
) -> Result<Html<String>, AppError> {
    // TODO: Make a query for these from a prebuilt database.
    let ctx = tera::Context::new();
    let body = templates.render(&name, &ctx)?;
    Ok(Html(body))
}
