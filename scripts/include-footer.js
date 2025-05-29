// Include standard footer
document.addEventListener('DOMContentLoaded', function() {
  const footerPlaceholder = document.querySelector('.footer-placeholder');
  if (footerPlaceholder) {
    fetch('/includes/standard-footer.html')
      .then(response => response.text())
      .then(html => {
        footerPlaceholder.outerHTML = html;
        // Initialize the year
        if (document.getElementById('year')) {
          document.getElementById('year').textContent = new Date().getFullYear();
        }
      })
      .catch(error => {
        console.error('Error loading footer:', error);
        footerPlaceholder.innerHTML = '<p>Error loading footer</p>';
      });
  }
}); 