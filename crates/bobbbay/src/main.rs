pub mod articles;
pub mod error;
pub mod extensions;
pub mod util;

use axum::{body::Body, response::Html, routing::get, Extension, Router};
use color_eyre::eyre;
use error::AppError;
use std::net::SocketAddr;
use tera::Tera;
use tower::ServiceBuilder;
use tracing::{debug, instrument};

#[tokio::main]
async fn main() -> eyre::Result<()> {
    util::logging::setup_logging()?;

    let addr = SocketAddr::from(([127, 0, 0, 1], 3000));
    debug!("listening on {}", addr);
    axum::Server::bind(&addr)
        .serve(app()?.into_make_service())
        .await
        .unwrap();

    Ok(())
}

fn app() -> eyre::Result<Router<Body>> {
    Ok(Router::new()
        .route("/", get(index))
        .route("/articles/:name", get(articles::get_article))
        .layer(ServiceBuilder::new().layer(extensions::templates()?)))
}

#[instrument]
async fn index(Extension(ref mut templates): Extension<Tera>) -> Result<Html<String>, AppError> {
    let ctx = tera::Context::new();
    let body = templates.render("index.tera", &ctx)?;
    Ok(Html(body))
}
