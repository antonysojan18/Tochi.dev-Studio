# TOCHI (.dev studio)

Boutique software studio web application built with [TanStack Start](https://tanstack.com/start) and React.

## Development

Prerequisites: Node.js (v20+) and npm.

```sh
npm install
npm run dev
```

The dev server will run locally at `http://localhost:3000` (or the next available port).

## Production Build

To build the project for production:

```sh
npm run build
```

To preview the production build locally:

```sh
npm run preview
```

## Deployment to Vercel

This project is configured with standard Nitro and TanStack Start plugins, ready for zero-config Vercel deployment:

1. Import this repository into [Vercel](https://vercel.com).
2. Framework Preset: **TanStack Start** (or Nitro).
3. Build Command: `npm run build`
4. Output Directory: `.output`
5. Deploy!
