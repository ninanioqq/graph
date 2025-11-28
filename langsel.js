const languageSelector = document.getElementById('langs')

languageSelector.addEventListener('change', () => {
  const lang = languageSelector.value
  languageSelector.value = localStorage.getItem('lang') || 'en';
languageSelector.dispatchEvent(new Event('change'));

languageSelector.addEventListener('change', () => {
  const lang = languageSelector.value;
  localStorage.setItem('lang', lang)
  fetch(`${lang}.json`)
    .then(response => response.json())
    .then(data => {
      document.getElementById('title').textContent = data.title
      document.getElementById('greeting').textContent = data.greeting
    })
    .catch(error => console.error('Error loading language:', error))
})
languageSelector.value = localStorage.getItem('lang') || 'en'
languageSelector.dispatchEvent(new Event('change'))

