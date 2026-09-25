# TaskFlow | SaaS Task Manager Capstone

This is a production-ready Web Application Capstone built with vanilla ES6 Modules and Vite. It demonstrates a complete frontend feature set suitable for deployment on Vercel, Netlify, or GitHub Pages.

## Features & Requirements Met
1. **Authentication Simulation**: Login/Logout flow that guards the main dashboard.
2. **Interactive Catalog/Board**: A Kanban-style board reflecting dynamic data.
3. **Dynamic CRUD Operations**: Create tasks, Read (view in columns), Update (move between To Do/Doing/Done), and Delete tasks without page reloads.
4. **Persistent State**: Utilizes the browser's `localStorage` API to ensure user sessions and task data survive page refreshes.
5. **Modern Architecture**: Uses ES6 imports/exports and a Vite build pipeline.

## Local Setup
1. Extract the ZIP file.
2. Install dependencies: `npm install` (Installs Vite)
3. Start development server: `npm run dev`
4. Build for production: `npm run build`

## Live Deployment Instructions (Vercel / Netlify)
Since this project uses Vite, it is perfectly configured for zero-config deployments.
1. Initialize a Git repository, commit the files, and push to GitHub.
2. Log into [Vercel](https://vercel.com) or [Netlify](https://netlify.com).
3. Select "Add New Project" and import your GitHub repository.
4. The platform will automatically detect Vite. The build command is `npm run build` and the output directory is `dist`.
5. Click **Deploy**. Your capstone will be live in under 60 seconds.

## Architecture Highlights
*   `main.js`: Contains the declarative UI rendering logic and event delegation.
*   `store.js`: Encapsulates the application state and `localStorage` syncing logic, acting as the "Backend/Database" simulation.
*   `style.css`: Uses CSS Variables and Grid/Flexbox for a responsive, modern SaaS aesthetic.
