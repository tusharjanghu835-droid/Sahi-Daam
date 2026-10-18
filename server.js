
/**
 * Sahi Daam - Backend Server & API Integration
 *
 * Author / Contributor: Tushar Janghu (https://github.com/tusharjanghu835-droid)
 * Responsibilities: Express server configuration, API routing (/api/mandi-prices),
 *                   and Government Mandi API (data.gov.in) integration.
 */

require("dotenv").config();

const express = require("express");
const app = express();

// Use port 3001 to avoid the existing conflict on port 3000.
const PORT = process.env.PORT || 3001;
const API_KEY = process.env.DATA_GOV_API_KEY;

app.use(express.static(__dirname));

app.get("/api/mandi-prices", async (req, res) => {
  if (!API_KEY) {
    return res.status(500).json({
      error: "API key missing. Check your local .env file."
    });
  }

  try {
    const resourceId = "9ef84268-d588-465a-a308-a864a43d0070";
    const url = new URL(
      `https://api.data.gov.in/resource/${resourceId}`
    );

    url.searchParams.set("api-key", API_KEY);
    url.searchParams.set("format", "json");
    url.searchParams.set("limit", "50");
    url.searchParams.set("offset", "0");

    // No commodity filter: request records across crops.
    const response = await fetch(url, {
      signal: AbortSignal.timeout(20000)
    });

    const data = await response.json();

    if (!response.ok) {
      console.error("Government API status:", response.status);
      return res.status(response.status).json({
        error: "Government API request failed.",
        status: response.status
      });
    }

    if (!Array.isArray(data.records)) {
      console.error("Unexpected API response:", data.message || "No records field");
      return res.status(502).json({
        error: "The API did not return crop records.",
        details: data.message || "Unexpected response format."
      });
    }

    console.log("Mandi records received:", data.records.length);
    res.json(data);
  } catch (error) {
    console.error("Mandi API error:", error.message);
    res.status(502).json({
      error: "Could not retrieve mandi prices.",
      details: error.message
    });
  }
});

app.listen(PORT, () => {
  console.log(`Sahi Daam running at http://localhost:${PORT}`);
});
