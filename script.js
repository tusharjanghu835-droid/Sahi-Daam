
/**
 * Sahi Daam - Client-Side Search & Mandi Data Handling
 *
 * Contributors:
 *   - Vishal (https://github.com/vishalbhar): Client-side search, state filtering logic, and user interactions.
 *   - Tamanna Yadav (https://github.com/tamanna-codes30): Frontend integration and dynamic table rendering.
 *   - Tushar Janghu (https://github.com/tusharjanghu835-droid): Mandi API contract and data field mapping.
 */

const cropTableBody = document.querySelector("#priceTableBody");
const cropSearch = document.querySelector("#cropSearch");
const stateFilter = document.querySelector("#stateFilter");
const searchButton = document.querySelector("#searchButton");

let mandiRecords = [];

function showMessage(message) {
  cropTableBody.innerHTML = `
    <tr><td colspan="5">${message}</td></tr>
  `;
}

function renderPrices() {
  const search = cropSearch.value.toLowerCase().trim();
  const selectedState = stateFilter.value.toLowerCase();

  const filtered = mandiRecords.filter((crop) => {
    const matchesSearch = [
      crop.commodity,
      crop.market,
      crop.district,
      crop.variety
    ].some((value) =>
      String(value || "").toLowerCase().includes(search)
    );

    const matchesState =
      !selectedState ||
      String(crop.state || "").toLowerCase() === selectedState;

    return matchesSearch && matchesState;
  });

  if (!filtered.length) {
    showMessage(
      mandiRecords.length
        ? "No matching prices. Try another crop or state."
        : "No live crop records were returned by the government API."
    );
    return;
  }

  cropTableBody.innerHTML = filtered.map((crop) => `
    <tr>
      <td>${escapeHTML(crop.commodity || "—")}</td>
      <td>${escapeHTML(crop.market || "—")}</td>
      <td>${escapeHTML(crop.state || "—")}</td>
      <td>₹${Number(crop.modal_price || 0).toLocaleString("en-IN")}</td>
      <td>Government API</td>
    </tr>
  `).join("");
}

function escapeHTML(value) {
  return String(value).replace(/[&<>"']/g, (character) => ({
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#39;"
  })[character]);
}

async function loadMandiPrices() {
  showMessage("Loading government mandi prices...");

  try {
    const response = await fetch("/api/mandi-prices");
    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.error || `Request failed (${response.status})`);
    }

    mandiRecords = Array.isArray(data.records) ? data.records : [];

    if (!mandiRecords.length) {
      showMessage("The API returned zero crop records. Please check the API response.");
      return;
    }

    renderPrices();
  } catch (error) {
    console.error("Could not load mandi prices:", error);
    showMessage(`Could not load prices: ${error.message}`);
  }
}

cropSearch.addEventListener("input", renderPrices);
stateFilter.addEventListener("change", renderPrices);
searchButton.addEventListener("click", renderPrices);

loadMandiPrices();
