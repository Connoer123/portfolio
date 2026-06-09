# Connie Chen Portfolio

Connie Chen Portfolio is a personal engineering portfolio website. It introduces my background, shows a 3D hero scene, highlights engineering projects in an interactive carousel, and opens detailed project case studies with images, video, skills, achievements, and a PDF portfolio link.

Built with React, Vite, Tailwind CSS, Framer Motion, Spline, and Lucide React

## Inspiration

Engineering portfolios can feel either too plain or too crowded. This site was built to feel clean, visual, and personal while still keeping the project work easy to scan. The layout focuses on systems, hardware, software, and design projects through a glass-style interface and a 3D first impression.

## What It Does

- shows a Spline-powered 3D hero scene
- fades in navigation after the hero scene loads
- introduces my engineering background and school information
- displays projects in an animated carousel
- opens each project in a detailed modal view
- supports image and video project media
- links to the Praxis II engineering design PDF
- includes contact links for email and LinkedIn
- includes a simple contact form success state
- groups portfolio copy and media paths in one data file

## Tech Stack

### Languages

- JavaScript
- JSX
- CSS

### Frontend

- React
- Vite
- Tailwind CSS
- Framer Motion
- Lucide React

### 3D and Media

- Spline
- `@splinetool/react-spline`
- Project images, video, PDF, and model assets stored in `public/assets`

### Deployment

- Static Vite build
- GitHub repository

## Project Structure

```txt
portfolio/
  public/
    assets/
      brand/
        logo.png
      documents/
        engineering-design-portfolio-connie-chen.pdf
      models/
        glass-wave.glb
      profile/
        about-me.jpg
      projects/
        bridge/
        fpga/
        physics/
        praxis/
        robot/
        snake/
  src/
    components/
      GlassPanel.jsx
      HeroScene.jsx
      ProjectModal.jsx
    data/
      portfolioData.js
    App.jsx
    index.css
    main.jsx
  package.json
  vite.config.js
```

## Local Development

Install dependencies:

```sh
npm install
```

Run the development server:

```sh
npm run dev
```

Local frontend:

```txt
http://localhost:5173
```

## Editing Portfolio Content

Most project text, skills, media paths, and contact links live in:

```txt
src/data/portfolioData.js
```

Media files live in:

```txt
public/assets
```

Use lowercase, hyphenated names for new files and place them inside the matching folder, such as `public/assets/projects/fpga`.

## Production Build

```sh
npm run build
```

Preview the production build locally:

```sh
npm run preview
```

## Scripts

```sh
npm run dev      # frontend dev server
npm run build    # production build
npm run preview  # preview production build
npm run lint     # eslint checks
```
