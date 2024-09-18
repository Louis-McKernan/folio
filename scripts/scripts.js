document.addEventListener('DOMContentLoaded', () => {
    const toggleSwitch = document.getElementById('toggleTheme');
    const currentTheme = localStorage.getItem('theme') || 'light';
  
    // Select the icons
    const sunIcon = document.getElementById('sun-icon');
    const moonIcon = document.getElementById('moon-icon');
  
    // Function to toggle icon visibility
    function toggleIcons(theme) {
      if (theme === 'dark') {
        moonIcon.style.opacity = '1';
        sunIcon.style.opacity = '0.5';
      } else {
        moonIcon.style.opacity = '0.5';
        sunIcon.style.opacity = '1';
      }
    }
  
    // Apply the saved theme on load
    document.body.setAttribute('data-theme', currentTheme);
    toggleSwitch.checked = currentTheme === 'dark';
    toggleIcons(currentTheme);
  
    // Listen for switch changes
    toggleSwitch.addEventListener('change', () => {
      const theme = toggleSwitch.checked ? 'dark' : 'light';
      document.body.setAttribute('data-theme', theme);
      localStorage.setItem('theme', theme);
      toggleIcons(theme);
    });
  });
  