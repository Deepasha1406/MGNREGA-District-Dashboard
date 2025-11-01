document.addEventListener("DOMContentLoaded", async () => {
  const district = localStorage.getItem("selectedDistrict");

  const loadingDiv = document.getElementById("loading");
  const resultDiv = document.getElementById("result-data");

  if (!district) {
    document.querySelector(".result-header h2").innerText = "Select a District to View Data";
    loadingDiv.innerText = "No district selected.";
    return;
  }

  document.querySelector(".result-header h2").innerText = `${district} Performance`;

  // 🟢 Debug line added to check which district is being fetched
  console.log("Fetching district data for:", district);

  try {
    const res = await fetch(`/api/district/${district}`);
    const data = await res.json();

    loadingDiv.style.display = "none";
    resultDiv.style.display = "block";

    if (data.error) {
      resultDiv.innerHTML = `<p>${data.error}</p>`;
      return;
    }

    // Update "last updated" time
    document.getElementById("last-updated").innerText = new Date().toLocaleString('en-IN');

    // 🟢 Display data in box layout
    resultDiv.innerHTML = `
      <div class="performance-box">
        <h3>${district} Key Indicators</h3>
        <div class="box-grid">
          <div class="box"><strong>औसत वेतन दर:</strong><br>₹${data.Average_Wage_rate_per_day_per_person}</div>
          <div class="box"><strong>कुल घरों ने काम किया:</strong><br>${data.Total_Households_Worked}</div>
          <div class="box"><strong>कुल व्यक्तियों ने काम किया:</strong><br>${data.Total_Individuals_Worked}</div>
          <div class="box"><strong>औसत रोजगार दिवस:</strong><br>${data.Average_days_of_employment_provided_per_Household}</div>
          <div class="box"><strong>100 दिन पूरा करने वाले घर:</strong><br>${data.Total_No_of_HHs_completed_100_Days_of_Wage_Employment}</div>
          <div class="box"><strong>महिला कार्य दिवस:</strong><br>${data.Women_Persondays}</div>
          <div class="box"><strong>SC कार्य दिवस:</strong><br>${data.SC_persondays}</div>
          <div class="box"><strong>ST कार्य दिवस:</strong><br>${data.ST_persondays}</div>
          <div class="box"><strong>कुल खर्च (₹ लाख):</strong><br>${data.Total_Exp}</div>
          <div class="box"><strong>जॉब कार्ड जारी:</strong><br>${data.Total_No_of_JobCards_issued}</div>
          <div class="box"><strong>सक्रिय जॉब कार्ड:</strong><br>${data.Total_No_of_Active_Job_Cards}</div>
        </div>
      </div>
    `;
  } catch (err) {
    console.error("Error loading data:", err);
    loadingDiv.innerText = "❌ Failed to load data. Please try again later.";
  }
});
