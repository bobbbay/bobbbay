use axum::{
    http::StatusCode,
    response::{Html, IntoResponse, Response},
};
use tera::Tera;
use thiserror::Error;

#[derive(Error, Debug)]
pub enum AppError {
    #[error("template error")]
    TemplateError(#[from] tera::Error),
}

impl IntoResponse for AppError {
    fn into_response(self) -> Response {
        let (status, message) = match self {
            AppError::TemplateError(e) => (StatusCode::NOT_FOUND, e.to_string()),
        };

        // TODO: figure out a way around having to re-parse all templates.
        let mut ctx = tera::Context::new();
        // TODO: ctx.insert("status", &status);
        ctx.insert("message", &message);
        let body = Tera::new("templates/**/*")
            .unwrap()
            .render("error.tera", &ctx)
            .unwrap();

        Html(body).into_response()
    }
}
