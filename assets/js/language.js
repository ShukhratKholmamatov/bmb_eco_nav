document.addEventListener("DOMContentLoaded", function () {
  // 1. Default to English or load saved language
  let currentLang = localStorage.getItem("language") || "en";
  updateContent(currentLang);

  // 2. Function to update text
  function updateContent(lang) {
    // Update all elements with data-i18n attribute
    document.querySelectorAll("[data-i18n]").forEach((element) => {
      const key = element.getAttribute("data-i18n");
      
      if (translations[lang] && translations[lang][key]) {
        // Use innerHTML to allow tags like <br> or <em> inside translations
        element.innerHTML = translations[lang][key];
      }
    });

    // Update placeholders for inputs (like contact form)
    document.querySelectorAll("[data-i18n-placeholder]").forEach((element) => {
      const key = element.getAttribute("data-i18n-placeholder");
      if (translations[lang] && translations[lang][key]) {
        element.setAttribute("placeholder", translations[lang][key]);
      }
    });

    // Save preference
    localStorage.setItem("language", lang);
    
    // Update active class on buttons (optional visual feedback)
    document.querySelectorAll(".lang-btn").forEach(btn => {
        btn.classList.remove("active");
        if(btn.getAttribute("data-lang") === lang) {
            btn.classList.add("active");
        }
    });
  }

  // 3. Event Listeners for Buttons
  window.changeLanguage = function(lang) {
    updateContent(lang);
  };
});