pub mod articles;
pub mod build;
pub mod error;
pub mod extensions;
pub mod util;

use axum::{
    body::Body,
    error_handling::HandleError,
    http::StatusCode,
    response::{Html, IntoResponse},
    routing::get_service,
    Extension, Router,
};
use color_eyre::eyre;
use error::AppError;
use std::net::SocketAddr;
use tera::Tera;
use tower_http::{services::ServeDir, trace::TraceLayer};
use tracing::{debug, instrument};

#[tokio::main]
async fn main() -> eyre::Result<()> {
    util::logging::setup_logging()?;

    // Builds everything into a static directory called "build".
    build::Builder::default().build()?;

    let addr = SocketAddr::from(([127, 0, 0, 1], 3000));
    debug!("listening on {}", addr);
    axum::Server::bind(&addr)
        .serve(app()?.into_make_service())
        .await
        .unwrap();

    Ok(())
}

#[instrument]
fn app() -> eyre::Result<Router<(), Body>> {
    Ok(Router::new()
        .route_service(
            "/",
            HandleError::new(get_service(ServeDir::new("./build")), handle_error),
        )
        .layer(TraceLayer::new_for_http()))
}

async fn handle_error(_err: std::io::Error) -> impl IntoResponse {
    (StatusCode::INTERNAL_SERVER_ERROR, "Something went wrong...")
}
