npm --version
node --version

# Installation


## First Time

npm create vite@latest vitessce-current -- --template react
cd vitessce-current
npm install react@18.0.0 react-dom@18.0.0 
npm run dev

## Re-install

Working directory is `vitessce-current`

```
rm -rf node_modules
rm package-lock.json
npm install
```

# Configuration

For private use, we have:

- [supabase](https://supabase.com/dashboard/project/xcrxdtxcbqehuigxoatz) project to handle authentication. Lorena Pantano and Shannan Ho sui have access. 
- [Netlify](https://app.netlify.com/projects/mavrikaki-brain-aging/overview) deploys the webpage after each commit. Lorena has access. I cannot add anybody else, since I am in a free tiet.

# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.
