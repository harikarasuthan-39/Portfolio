# Harikara Suthan — AI & Data Science Portfolio

A dark, glassmorphic, "living" portfolio site — animated neural-network background,
boot sequence, custom cursor, AI assistant chat, floating skill nodes, and a
honest project lab (no fabricated finished projects).

## File structure

```
Portfolio/
  index.html          ← page structure (all sections)
  style.css            ← all styling / theme tokens
  script.js            ← all interactivity (boot, cursor, canvas, nav, AI chat...)
  config.js            ← ⭐ THE ONLY FILE YOU SHOULD NEED TO EDIT
  README.md            ← this file
  assets/
    profile.png         ← your photo (replace this exact filename)
    logo.png             ← small monogram used in navbar/favicon
    resume.pdf            ← placeholder resume — replace with the real one
    projects/
      cyberguard.jpg
      dait-ai.jpg
      resume-analyser.jpg
      career-ai.jpg
```

## How to personalize (do this first)

Open **`config.js`** — every real detail (GitHub, LinkedIn, email, phone) lives
in one object at the top of that file. Edit the values, save, and every link
across the whole site (navbar, hero socials, contact section, footer) updates
automatically. You do not need to touch `index.html` for links.

```js
const CONFIG = {
  github:   "https://github.com/your-username",
  linkedin: "https://linkedin.com/in/your-profile",
  email:    "your.email@example.com",
  phone:    "+91 00000 00000",
  resume:   "assets/resume.pdf",
  profile:  "assets/profile.png",
  logo:     "assets/logo.png"
};
```

To swap your photo, resume, or project images: just drop a new file into
`assets/` **with the exact same filename** as the placeholder it replaces.
No code edits required.

## Running it locally

Any static file server works — you already have the VS Code "Go Live"
extension installed (saw it in your screenshot), so:

1. Open the `Portfolio` folder in VS Code
2. Right-click `index.html` → **Open with Live Server**

Or with Python, from inside the `Portfolio` folder:
```
python -m http.server 8000
```
then open `http://localhost:8000`.

## Why the projects say "In Progress" / "Planned" instead of finished

You mentioned you don't have real projects built yet. Listing finished apps
that don't exist is risky — it falls apart the moment an interviewer asks a
follow-up question, and that's a much worse outcome than an honest "in
progress" portfolio. The four project cards are tied directly to the learning
roadmap from our earlier conversation (classical ML → deep learning → applied
AI/RAG). As you actually build each one:

1. Replace the thumbnail in `assets/projects/`
2. Update the title/description/tech tags in `index.html` (search for the
   project's `<h3>` tag)
3. Change the status badge from `IN PROGRESS` / `PLANNED` to a real "Live"
   state, and re-enable the "Demo soon" button with a real link

Same idea for the **Certification Vault** — it's intentionally a near-empty,
honest state with a few "Planned" certs and an empty-state card. Replace
those as you actually earn certificates.

## Notes on the audio & video in the original brief

- **Sound effects** (startup chime, hover ticks) are synthesized live in
  `script.js` using the Web Audio API — no `.mp3` files needed. There's a
  mute toggle in the navbar (saved to the browser so it remembers your
  preference).
- **The animated background** is a canvas-drawn neural network (particles +
  connecting lines that react to your cursor) instead of a background video —
  it's lighter-weight, doesn't need a video file, and fits the "Digital Mind"
  theme directly.

## Accessibility & performance built in

- Respects `prefers-reduced-motion` (animations calm down automatically)
- Custom cursor and particle density scale down on touch devices
- Visible keyboard focus states throughout
- Fully responsive: desktop, tablet, mobile
