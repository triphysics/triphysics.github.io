# Tribhuwan Pandey: personal website

A static site (plain HTML, CSS and JavaScript, with no build step) made for GitHub Pages.

## Publish on GitHub Pages

1. On GitHub (signed in as `triphysics`), create a new **public** repository named exactly
   `triphysics.github.io`. The site will live at `https://triphysics.github.io`.
   Your existing MX-PHon database at `https://triphysics.github.io/phonon-maxene-db` keeps working alongside it.
2. Open the new repo and click **Add file → Upload files**. Drag in *everything inside* this folder
   (the five `.html` pages, `.nojekyll`, `README.md`, and the `assets/`, `images/` and `cv/` folders). Click **Commit changes**.
   - `.nojekyll` is a hidden file. If your computer hides it, it's fine to skip. The site works without it.
3. Go to **Settings → Pages**. Under *Build and deployment*, choose **Deploy from a branch**,
   pick branch **main** and folder **/ (root)**, then click **Save**.
4. Wait a minute or two, then open `https://<your-username>.github.io`.

If you use a different repo name, also change the three `og:image` lines (in `index.html`,
`projects.html` and `experience.html`) to the new address, so link previews keep working.

## Add your photo

Save a portrait as `images/profile.jpg` (portrait orientation works best, about 440 × 550 px or larger)
and upload it to the `images` folder. Until then the site shows a "TP" monogram in its place.

## Add your CV

Save a general-purpose CV as `cv/Tribhuwan_Pandey_CV.pdf` and upload it to the `cv` folder.
The "Download CV" buttons appear automatically once the file is there; until then they stay hidden,
so there's never a broken link. Consider leaving your phone number off the public copy.

## Common edits

| To change… | Edit |
|---|---|
| Headline, bio, track record | `index.html` |
| Projects (add a new one by copying an `<article class="case">` block) | `projects.html` |
| Jobs, skills, education, teaching, awards | `experience.html` |
| Physics research background | `research.html` |
| Add a publication | `assets/publications.js` (copy an entry and edit it; the page groups by year automatically) |
| Colours and fonts | top of `assets/style.css` |

You can edit any file directly on GitHub: open it, click the pencil icon, then **Commit changes**.
The live site updates within a minute or two.

## Using a custom domain (optional)

In **Settings → Pages → Custom domain**, enter your domain (for example `tpandey.com`) and follow
GitHub's DNS instructions.

## After it's live

- Put `https://triphysics.github.io` in your CV header, LinkedIn "Website" field and GitHub profile, replacing the Google Sites link.
- Optionally add the site to Google Search Console so it is indexed sooner.
