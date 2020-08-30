# How `bobbbay/bobbbay` works

This is the principal question that crosses many minds when realizing that my profile README is a bit more complex than most think. If you check out the languages for this repository, you'll see that this isn't written in Markdown, but actually in many programming languages (currently just JS).

### Modules

Each directory in [`src/`](src/) is a sort of module. They each are run (via their respective compilers/interpreters) every day, via GitHub actions. Here is a list of modules, with links to explanations of how each works:

- ![](<https://github.com/Bobbbay/bobbbay/raw/development/assets/JavaScript-square%20(4).png>) JavaScript - [`/src/wakatime-api/`](src/wakatime-api) - Generate a donut chart via stats recieved from wakatime - [Explanation](src/wakatime-api/README.md)
