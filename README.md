# Sahi Daam 🌾

Sahi Daam is an Indian agriculture market price portal designed to help farmers explore and compare live mandi prices across various states and commodities.

---

## 👥 Team Members & Responsibilities

| Contributor | Role & Responsibilities | GitHub Profile |
| :--- | :--- | :--- |
| **Tushar Janghu** | **Backend Development & API Integration**<br>Server setup, Express endpoints (`/api/mandi-prices`), error handling, and Government Mandi API (data.gov.in) integration. | [@tusharjanghu835-droid](https://github.com/tusharjanghu835-droid) |
| **Tamanna Yadav** | **Frontend Development & UI/UX Design**<br>Website layout, semantic HTML, responsive design system, typography, color palette, and mobile styling. | [@tamanna-codes30](https://github.com/tamanna-codes30) |
| **Vishal** | **Frontend Development & Feature Implementation**<br>Dynamic search, state filtering, DOM price table rendering, and client-side interactions. | [@vishalbhar](https://github.com/vishalbhar) |

---

## 🚀 Features

- **Live Mandi Intelligence:** Fetches real crop price records from data.gov.in.
- **Dynamic Search & Filtering:** Filter prices by crop commodity, market, district, variety, and state.
- **Farmer-First UI:** Clean, responsive, and accessible interface built for desktop and mobile.
- **Secure Backend:** Proxy Express server preventing exposure of API keys on the client.

---

## 💻 Running the Project Locally

### Prerequisites
- [Node.js](https://nodejs.org/) (v16 or higher)

### Setup & Run
1. Install dependencies:
   ```bash
   npm install
   ```
2. Configure environment variables:
   - Create a local `.env` file (copy from `.env.example`).
   - Add your data.gov.in API key:
     ```env
     PORT=3001
     DATA_GOV_API_KEY=your_actual_api_key_here
     ```
3. Start the server:
   ```bash
   npm start
   ```
4. Open your browser and navigate to `http://localhost:3001`.

---

## 🔒 Security Note
- Never commit the `.env` file or expose private API keys in client-side code.
- `.env` must remain strictly local on each developer's machine.
