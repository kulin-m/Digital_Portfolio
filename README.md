# Kulin Mathur | 3D Interactive AI/ML Portfolio

A modern, highly interactive 3D single-page portfolio website representing a "digital workspace" for Kulin Mathur, B.Tech CSE (AI & ML Specialization) student at VIT Chennai.

## Tech Stack
- **React + Vite** (Fast and lightweight development)
- **Three.js / React Three Fiber / Drei** (Procedural 3D scene elements, camera rigs, and particle networks)
- **Framer Motion** (Animate 2D overlay text blocks and interactive cards)
- **Tailwind CSS** (Custom theme colors, shadows, and glassmorphic panels)

---

## Interactive 3D Journey Map
As the user scrolls, the camera flies through a single 3D scene targeting different elements:
1. **Hero (y = 0)**: Rotating neural network connections representing AI & Machine Learning.
2. **About Me (y = -4)**: Rotating 3D Skill Orb with orbiting technology name sprites.
3. **Skills (y = -8)**: Abstract node matrix.
4. **Projects (y = -12)**: Centralized 3D data grid nodes, overlaid with:
   - **YouTube RAG QA System Playground**: Console log retrieval simulator.
   - **Loan Approval Predictor**: Live mock form predicting approvals based on income and credit score.
5. **Timeline (y = -16)**: Spiral 3D helix tracking experiences and qualifications.
6. **Contact (y = -20.5)**: Deep-space circular particle vortex.

---

## Swapping in Custom Content

### 1. Swap the Resume PDF
- Place your real resume PDF file inside the `public/` directory.
- Name the file `resume.pdf` to replace the existing layout links automatically.

### 2. Update Details & Project Repos
- All information, links, and tags are located in a central file:
  `src/data/content.json`
- Open this file and customize your contact details, social links, or text descriptions. They will automatically render on the webpage.

### 3. Change Profile Images/Avatars
- Save your custom image inside the `src/assets/` directory.
- Import and use it inside `src/components/About.jsx` if you decide to add a physical photo card.

---

## Local Development Setup

To run the portfolio on your local system, follow these steps:

1. **Verify Node.js is installed**: Ensure you have Node.js (v18+) installed.
2. **Open the project folder**:
   ```bash
   cd kulin-portfolio-3d
   ```
3. **Install dependencies**:
   ```bash
   npm install
   ```
4. **Start the local development server**:
   ```bash
   npm run dev
   ```
5. **Open the Browser**: Navigate to `http://localhost:5173` to view the 3D scene.

---

## Deployment to Vercel or Netlify

### Vercel (Recommended)
1. Install Vercel CLI globally: `npm install -g vercel`.
2. Run the deployment command inside the root folder:
   ```bash
   vercel
   ```
3. Follow the CLI instructions to link and deploy your site.

### Netlify
1. Build the production build locally:
   ```bash
   npm run build
   ```
2. Drag and drop the generated `dist/` directory into your Netlify dashboard, or push your project to GitHub and connect it to Netlify for continuous integration.
