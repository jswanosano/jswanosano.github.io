// Handle accordion behavior
document.addEventListener('DOMContentLoaded', function() {
  var accordions = document.getElementsByClassName("accordion");
  
  // Function to handle iframe height adjustments and panel expansion
  function updatePanelHeight(panel) {
    // Get all iframes in the panel
    const iframes = panel.querySelectorAll('iframe');
    
    // Set an initial height for the panel based on iframe heights plus padding
    const initialHeight = Array.from(iframes).reduce((total, iframe) => {
      return total + parseInt(iframe.height || 300, 10);
    }, 100); // Add 100px for padding and other content
    
    panel.style.maxHeight = initialHeight + "px";
    
    // Re-adjust after a short delay to ensure content is fully loaded
    setTimeout(function() {
      panel.style.maxHeight = panel.scrollHeight + "px";
    }, 500);
  }
  
  for (var i = 0; i < accordions.length; i++) {
    accordions[i].addEventListener("click", function() {
      // Close all active panels first
      for (var j = 0; j < accordions.length; j++) {
        if (this !== accordions[j]) {
          accordions[j].classList.remove("active");
          accordions[j].nextElementSibling.style.maxHeight = null;
        }
      }
      
      // Toggle the clicked panel
      this.classList.toggle("active");
      var panel = this.nextElementSibling;
      
      if (panel.style.maxHeight) {
        panel.style.maxHeight = null;
      } else {
        updatePanelHeight(panel);
      }
    });
  }
}); 