# Sahi Daam

Sahi Daam is a simple starter website intended to help farmers look up crop prices.

## Current status

- Responsive starter website
- Search by crop name
- Filter by state
- Sample data only — prices are **not live or verified**
- Government market-data API is not connected yet

## Run locally

1. Open this folder in Visual Studio Code.
2. Open `index.html` in a browser, or use the VS Code Live Server extension if you have it installed.
3. Try searching for Wheat, Rice, or another sample crop.

This starter version does not need `npm install`.

## Project files

- `index.html` — page content
- `style.css` — page design
- `script.js` — search and sample data
- `.env.example` — example environment-variable names only; contains no secrets
- `.gitignore` — prevents common private/local files from being committed

## Important API security note

Never put a private API key in `script.js`, `index.html`, or any file that is committed to a public GitHub repository. When we add live data, we will choose a safe way to keep credentials private.

## Next steps

1. Confirm the page works on your computer.
2. Create a GitHub repository named `Sahi-Daam`.
3. Upload these files.
4. Connect a reliable official crop-price data source.
