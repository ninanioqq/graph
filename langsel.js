const languageSelector = document.getElementById('langs');
let docLang = {};

// Set the initial value from localStorage or default to 'en'
languageSelector.value = localStorage.getItem('lang') || 'en';

// Function to load the language JSON
function loadLanguage(lang) {
  fetch(`${lang}.json`)
    .then(response => response.json())
    .then(data => {
      docLang = data;
      console.log('Language loaded:', lang);
    })
    .catch(error => console.error('Error loading language:', error));
  for (let i = 1; i < 15; i++) {
  	document.querySelector(`#btn${i}`).innerText = docLang[`btn${i}`]
  }

// Event listener for language changes
languageSelector.addEventListener('change', () => {
  const lang = languageSelector.value;
  localStorage.setItem('lang', lang);
  loadLanguage(lang);
});

// Load the language initially
loadLanguage(languageSelector.value);
