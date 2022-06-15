use color_eyre::eyre::Result;
use std::fs::File;
use tracing::instrument;

#[derive(Debug)]
pub struct Builder<'a> {
    build_directory: &'a str,
}

impl<'a> Builder<'a> {
    #[instrument]
    pub fn build(self) -> Result<()> {
        // Set up a build directory.
        std::fs::remove_dir_all(self.build_directory)?;
        std::fs::create_dir_all(self.build_directory)?;

        let templates = tera::Tera::new("templates/**/*")?;
        let ctx = tera::Context::new();

        // Parse templates that are meant to be built.
        let file = File::create(format!("{}/index.html", self.build_directory))?;
        templates.render_to("index.tera", &ctx, file)?;

        Ok(())
    }
}

impl<'a> Default for Builder<'a> {
    fn default() -> Self {
        Self {
            build_directory: "build",
        }
    }
}
