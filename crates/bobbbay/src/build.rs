use color_eyre::eyre::Result;
use std::fs::File;
use tracing::{info, instrument};

#[derive(Debug)]
pub struct Builder<'a> {
    build_directory: &'a str,
}

impl<'a> Builder<'a> {
    #[instrument]
    pub fn build(self) -> Result<()> {
        info!("Setting up build directory...");
        std::fs::remove_dir_all(self.build_directory)?;
        std::fs::create_dir_all(self.build_directory)?;

        info!("Taking a handle to Pandoc...");
        let mut pandoc = pandoc::new();

        info!("Parsing templates...");
        let templates = tera::Tera::new("templates/**/*")?;
        let ctx = tera::Context::new();

        info!("Rendering non-contextual templates...");
        let file = File::create(format!("{}/index.html", self.build_directory))?;
        templates.render_to("index.tera", &ctx, file)?;

        info!("Copying content/static to {}/static...", self.build_directory);
        assert!(std::path::PathBuf::from("content/static").exists());
        fs_extra::dir::copy("content/static", format!("{}", self.build_directory), &fs_extra::dir::CopyOptions::new())?;

        info!("Building all SCSS stylesheets to CSS...");
        for stylesheet in glob::glob(format!("{}/static/**/*.scss", self.build_directory).as_str())? {
            match stylesheet {
                Ok(path) => {
                    let path = path.to_str().unwrap();
                    let sass = grass::from_path(path, &grass::Options::default()).unwrap();
                    let mut path = std::path::PathBuf::from(path);
                    path.set_extension("css");
                    fs_extra::file::write_all(path, &sass)?;
                },
                Err(e) => panic!("{}", e),
            }
        }

        // TODO: Export org files to html with pandoc, from content/{articles,notes,series}.

        // TODO: Index all of these in a database.

        info!("Build complete.");
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
