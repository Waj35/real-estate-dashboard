# Real Estate Listings Dashboard (React + TypeScript)

A small dashboard that fetches property data and provides search, filters, sorting, and a details page. Includes a subtle hover animation on cards and a bonus price chart.

## Features

- **Property List** with image, title, price, bedrooms, location.
- **Responsive** grid (3 → 2 → 1 columns).
- **Search** by title (case-insensitive). Placeholder: `"Search properties..."`.
- **Filter** by minimum bedrooms.
- **Sort** by price (asc/desc).
- **Details Page** via React Router.
- **Empty state**: `No properties found. Try adjusting your filters.`
- **Hover effect**: slight shadow + scale-up.
- **Bonus**: synthetic price history chart via **Recharts**.

Data fetched from:
`https://s3.us-central-1.wasabisys.com/mashvisor-cdn/task-fe-listings.json`

If the request fails, the app falls back to the provided 2-item sample dataset.

## Getting Started

```bash
# 1) Install
npm i --force

# 2) Run dev server
npm run dev
# Vite will show a local URL to open in your browser
```

## Tech Choices

- **Vite** for a fast TS + React setup.
- **React Router v6** for routing.
- **Recharts** for a lightweight price chart.
- **Vanilla CSS** with a small design system and modern neumorphic-glass look.
- **Custom hook (`useProperties`)** for data fetching + fallback.

## Accessibility

- Inputs have `aria-label` and descriptive titles.
- Links and images include accessible text/alt.
- Keyboard focus-friendly controls.

## Time & Self‑Assessment

- Time spent: ~1.5 hours.
- Satisfaction: **8.5/10**.
- If I had more time:
  - Add pagination & skeleton loaders.
  - Add map view with Leaflet and mock coordinates.
  - Improve testing (React Testing Library) and error boundaries.
  - Extract a tiny design token system using CSS vars more broadly.

## Submission

Push this project to a public GitHub repo or zip and share the archive.
Then email:
- aqeel@mashvisor.com
- jawad@mashvisor.com
- hasan@mashvisor.com

**Subject**: `Task Submission - Frontend Developer - Wajahat Irfan, 7 years`

Include the GitHub link.

---

Made with ❤️


### Google Maps
This project uses **@react-google-maps/api**. To enable the map:
1. Create a `.env` file at the project root.
2. Add your API key:
```
VITE_GOOGLE_MAPS_API_KEY=YOUR_KEY_HERE
```
3. Restart `npm run dev`.
If no key is provided, the UI gracefully shows a note instead of a map or show random map.
