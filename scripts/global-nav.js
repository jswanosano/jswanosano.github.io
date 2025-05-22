document.addEventListener('DOMContentLoaded', function() {
  // Find the navigation placeholder on the page
  const navPlaceholder = document.querySelector('.global-nav-placeholder');
  
  if (navPlaceholder) {
    // Load the global navigation
    fetch('/includes/navigation.html')
      .then(response => {
        if (!response.ok) {
          throw new Error(`Failed to load navigation: ${response.status}`);
        }
        return response.text();
      })
      .then(html => {
        // Replace the placeholder with the actual navigation
        navPlaceholder.outerHTML = html;
        
        // After navigation is loaded, highlight the current page
        highlightCurrentPage();
      })
      .catch(error => {
        console.error('Error loading navigation:', error);
      });
  }
});

// Function to highlight the current page in the navigation
function highlightCurrentPage() {
  // Get the current page path
  const currentPath = window.location.pathname;
  
  // Find all navigation links
  const navLinks = document.querySelectorAll('.nav-list a');
  
  // Check each link to see if it matches the current path
  navLinks.forEach(link => {
    if (link.getAttribute('href') === currentPath) {
      link.classList.add('active');
      
      // If this is in a dropdown, also highlight the dropdown
      const parentDropdown = link.closest('.dropdown-menu');
      if (parentDropdown) {
        const dropdownLabel = parentDropdown.previousElementSibling;
        if (dropdownLabel && dropdownLabel.classList.contains('dropdown-label')) {
          dropdownLabel.classList.add('active');
        }
      }
    }
  });
} 