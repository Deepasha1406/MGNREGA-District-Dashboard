// ------------------- District Page Logic ------------------- //
const searchInput = document.getElementById('search');
const districts = document.querySelectorAll('.district-card');

// 🔍 Search Filter Logic
if (searchInput) {
  searchInput.addEventListener('input', () => {
    const value = searchInput.value.toLowerCase();
    districts.forEach(card => {
      const name = card.textContent.toLowerCase();
      card.style.display = name.includes(value) ? 'block' : 'none';
    });
  });
}

// 🗺️ Hindi → English mapping for all Uttar Pradesh districts
const districtMapUP = {
  "आगरा": "Agra",
  "अलीगढ़": "Aligarh",
  "अम्बेडकर नगर": "Ambedkar Nagar",
  "अमरोहा": "Amroha",
  "औरैया": "Auraiya",
  "अयोध्या": "Ayodhya",
  "आजमगढ़": "Azamgarh",
  "बागपत": "Baghpat",
  "बहराइच": "Bahraich",
  "बल्लिया": "Ballia",
  "बलरामपुर": "Balrampur",
  "बांदा": "Banda",
  "बाराबंकी": "Barabanki",
  "बरेली": "Bareilly",
  "बस्ती": "Basti",
  "भदोही": "Bhadohi",
  "बिजनौर": "Bijnor",
  "बदायूं": "Budaun",
  "बुलंदशहर": "Bulandshahr",
  "चित्रकूट": "Chitrakoot",
  "देवरिया": "Deoria",
  "एटा": "Etah",
  "इटावा": "Etawah",
  "फर्रुखाबाद": "Farrukhabad",
  "फतेहपुर": "Fatehpur",
  "फिरोजाबाद": "Firozabad",
  "गौतम बुद्ध नगर": "Gautam Buddha Nagar",
  "गाजियाबाद": "Ghaziabad",
  "गाजीपुर": "Ghazipur",
  "गोंडा": "Gonda",
  "गोरखपुर": "Gorakhpur",
  "हमीरपुर": "Hamirpur",
  "हापुड़": "Hapur",
  "हरदोई": "Hardoi",
  "हाथरस": "Hathras",
  "जालौन": "Jalaun",
  "जौनपुर": "Jaunpur",
  "झाँसी": "Jhansi",
  "कन्नौज": "Kannauj",
  "कानपुर देहात": "Kanpur Dehat",
  "कानपुर नगर": "Kanpur Nagar",
  "कासगंज": "Kasganj",
  "कौशाम्बी": "Kaushambi",
  "कुशीनगर": "Kushinagar",
  "लखीमपुर खीरी": "Lakhimpur Kheri",
  "ललितपुर": "Lalitpur",
  "लखनऊ": "Lucknow",
  "महाराजगंज": "Maharajganj",
  "महोबा": "Mahoba",
  "मैनपुरी": "Mainpuri",
  "मथुरा": "Mathura",
  "मऊ": "Mau",
  "मेरठ": "Meerut",
  "मिर्जापुर": "Mirzapur",
  "मुरादाबाद": "Moradabad",
  "मुज़फ़्फरनगर": "Muzaffarnagar",
  "पीलीभीत": "Pilibhit",
  "प्रतापगढ़": "Pratapgarh",
  "प्रयागराज": "Prayagraj",
  "रायबरेली": "Rae Bareli",
  "रामपुर": "Rampur",
  "सहारनपुर": "Saharanpur",
  "सम्भल": "Sambhal",
  "संत कबीर नगर": "Sant Kabir Nagar",
  "शाहजहाँपुर": "Shahjahanpur",
  "शामली": "Shamli",
  "श्रावस्ती": "Shravasti",
  "सिद्धार्थनगर": "Siddharthnagar",
  "सीतापुर": "Sitapur",
  "सोनभद्र": "Sonbhadra",
  "सुल्तानपुर": "Sultanpur",
  "उन्नाव": "Unnao",
  "वाराणसी": "Varanasi"
};

// 🏙️ District Selection + Redirect
if (districts.length > 0) {
  districts.forEach(card => {
    card.addEventListener('click', () => {
      const nameEl = card.querySelector("p, h3, span"); // support multiple tag structures
      if (!nameEl) return;

      const hindiName = nameEl.innerText.trim();
      const englishName = districtMapUP[hindiName] || hindiName; // Translate or use as-is

      console.log("Saving district:", englishName);

      // Save selected district for results page
      localStorage.setItem("selectedDistrict", englishName);

      // Redirect to results page (works both locally and hosted)
      if (window.location.origin.includes("localhost") || window.location.href.endsWith(".html")) {
        window.location.href = "results.html";
      } else {
        window.location.href = "/results";
      }
    });
  });
}
