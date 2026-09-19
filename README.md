# maxvanzandt.github.io

Source for my personal site, served by GitHub Pages at
[maxvanzandt.github.io](https://maxvanzandt.github.io).

Static HTML, CSS, and a small amount of vanilla JavaScript. No build step, no
framework, no dependencies to install. Open `index.html` in a browser to preview
changes locally.

## Files

| Path | Purpose |
| --- | --- |
| `index.html` | The whole site. One page, anchored sections. |
| `css/style.css` | Styles, including the dark colour scheme. |
| `js/main.js` | Draws the two densities in the hero from real normal density values. |
| `assets/` | Resume PDF and any images. |

## Editing

Content lives directly in `index.html`. Projects are list items under
`<ol class="projects">`, so adding one means copying an existing `<li
class="project">` block and changing the text.

Colours are CSS custom properties at the top of `css/style.css`. The palette is
Okabe-Ito, the same colourblind-safe set used in the Shiny projects linked from
the site.

## Deploying

GitHub Pages serves the default branch of this repository automatically because
the repository is named `<username>.github.io`. Pushing to `main` publishes.
Changes usually appear within a minute.

## License

BSD 3-Clause.
