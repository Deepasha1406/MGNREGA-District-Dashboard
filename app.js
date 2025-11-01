// ---------------------------
// 🌐 MGNREGA District Dashboard Backend
// ---------------------------

require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const path = require("path");
const axios = require("axios");
const fs = require("fs");
const connectDB = require("./config");

const app = express();

// ✅ Connect MongoDB
connectDB();

// ✅ Set port
const PORT = process.env.PORT || 8000;

// ✅ Serve static files (HTML, CSS, JS)
app.use(express.static(path.join(__dirname, "public")));

// ✅ Frontend routes
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

app.get("/district", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "district.html"));
});

app.get("/results", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "results.html"));
});

// =====================
// 🧩 District API Route
// =====================
app.get("/api/district/:name", async (req, res) => {
  const districtName = req.params.name.toLowerCase();
  const dataPath = path.join(__dirname, "data", "districtData.json");

  try {
    // ✅ Load cached data (if exists)
    let cachedData = {};
    if (fs.existsSync(dataPath)) {
      try {
        cachedData = JSON.parse(fs.readFileSync(dataPath, "utf8"));
      } catch (err) {
        console.error("❌ Cache parse error, resetting cache.");
        cachedData = {};
      }
    }

    // ✅ Serve from cache if available
    if (cachedData[districtName]) {
      console.log(`✅ Serving ${districtName} from cache`);
      return res.json(cachedData[districtName]);
    }

    // ✅ Fetch fresh data from API
const apiURL = `https://api.data.gov.in/resource/ee03643a-ee4c-48c2-ac30-9f2ff26ab722?api-key=${process.env.API_KEY}&format=json&limit=1000`;

    const response = await axios.get(apiURL, { timeout: 10000 });

    // Handle API authorization or bad key
    if (response.data?.error === "Key not authorised") {
      console.error("🚫 Invalid API key — please authorize your key on data.gov.in");
      return res.status(403).json({ error: "API key not authorized. Please authorize your key on data.gov.in." });
    }

    // ✅ Safe check for valid data
    if (!response.data || !response.data.records) {
      return res.status(500).json({ error: "Invalid response from government API" });
    }

    // ✅ Find district data
    const result = response.data.records.find(
      (r) => r.district_name?.toLowerCase() === districtName
    );

    if (!result) {
      return res.status(404).json({ error: "District not found in API data" });
    }

    // ✅ Cache result
    cachedData[districtName] = result;
    fs.mkdirSync(path.join(__dirname, "data"), { recursive: true });
    fs.writeFileSync(dataPath, JSON.stringify(cachedData, null, 2));

    console.log(`🆕 Cached data for ${districtName}`);
    res.json(result);

  } catch (error) {
    console.error("❌ Error fetching district data:", error.message);

    // Handle unauthorized API key specifically
    if (error.response && error.response.status === 403) {
      return res.status(403).json({
        error: "Access denied. Please check your API key authorization on data.gov.in."
      });
    }

    res.status(500).json({ error: "Unable to fetch data from API" });
  }
});

// ✅ Start the server
// app.listen(PORT, () => {
//   console.log(`🚀 Server running on http://localhost:${PORT}`);
// });

app.listen(8000, () => {
    console.log("Server running on http://localhost:8000");
});