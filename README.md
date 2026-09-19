# maxvanzandt.github.io

Source for my personal site, served by GitHub Pages at
[maxvanzandt.github.io](https://maxvanzandt.github.io).

Static HTML, CSS, and a small amount of vanilla JavaScript. No build step, no
framework, nothing to install. Open `index.html` in a browser to preview changes.

## Files

| Path | Purpose |
| --- | --- |
| `index.html` | The whole site. One page, anchored sections. |
| `css/style.css` | Styles, including the dark colour scheme. |
| `js/main.js` | Hero density curves and the About carousel. |
| `assets/photos/` | Carousel photos and the headshot. |
| `assets/projects/` | Plot output and animations from each project. |

## Editing

Content lives directly in `index.html`. Projects are grouped under
`<div class="project-group">`; adding one means copying an existing
`<li class="project">` block. Add `is-flipped` to put the image on the right,
and keep the alternation consistent within a group.

Colours are CSS custom properties at the top of `css/style.css`. The palette is
Okabe-Ito, the same colourblind-safe set used in the Shiny projects linked here.
The carousel frame ratio is `--` set by `aspect-ratio` on `.carousel-frame`.

## Deploying

GitHub Pages serves the default branch automatically because the repository is
named `<username>.github.io`. Pushing to `main` publishes, usually within a minute.

## License

BSD 3-Clause.
