document.addEventListener('DOMContentLoaded', function() {
  // First, remove any existing navigation
  const existingNav = document.querySelector('.nav.sticky-nav:not(.global-nav-placeholder)');
  if (existingNav) {
    existingNav.remove();
  }
  
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
    const linkPath = link.getAttribute('href');
    // Remove trailing slash and .html extension for comparison
    const normalizedLinkPath = linkPath.replace(/\/$/, '').replace(/\.html$/, '');
    const normalizedCurrentPath = currentPath.replace(/\/$/, '').replace(/\.html$/, '');
    
    if (normalizedLinkPath === normalizedCurrentPath) {
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