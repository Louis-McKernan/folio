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
      // Show night (white) icons, hide day (black) icons
      document.querySelectorAll('.icon-black').forEach(icon => icon.style.display = 'none');
      document.querySelectorAll('.icon-white').forEach(icon => icon.style.display = 'inline');
    } else {
      moonIcon.style.opacity = '0.5';
      sunIcon.style.opacity = '1';
      // Show day (black) icons, hide night (white) icons
      document.querySelectorAll('.icon-black').forEach(icon => icon.style.display = 'inline');
      document.querySelectorAll('.icon-white').forEach(icon => icon.style.display = 'none');
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

  // Fetch the JSON file and populate the about, projects, and contact sections
  fetch('data/Projects.json')
    .then(response => response.json())
    .then(data => {
      // Populate the about section
      const aboutContainer = document.getElementById('about');
      aboutContainer.querySelector('p').textContent = data.about[0].Content;

      // Populate the projects section
      const projectsContainer = document.getElementById('projects-container');
      data.projects.forEach(project => {
        const projectHTML = createProjectHTML(project);
        projectsContainer.appendChild(projectHTML);
      });

      // Populate the contact section
      const contactContainer = document.querySelector('.social-icons');
      data.contact.forEach(contact => {
        const link = document.createElement('a');
        link.href = contact.url;
        link.target = '_blank';
        link.classList.add('social-link');

        const imgBlack = document.createElement('img');
        imgBlack.src = contact.icon_black;
        imgBlack.alt = `${contact.platform} Icon Black`;
        imgBlack.classList.add('icon-black'); // Day (black) icon class

        const imgWhite = document.createElement('img');
        imgWhite.src = contact.icon_white;
        imgWhite.alt = `${contact.platform} Icon White`;
        imgWhite.classList.add('icon-white'); // Night (white) icon class
        imgWhite.style.display = 'none'; // Initially hide night (white) icons

        // Append both black and white icons to the link
        link.appendChild(imgBlack);
        link.appendChild(imgWhite);

        // Append the link to the contact container
        contactContainer.appendChild(link);
      });

      // Toggle icons based on the current theme
      toggleIcons(currentTheme);
    })
    .catch(error => console.error('Error fetching the data:', error));
});

// Function to create the project HTML
function createProjectHTML(project) {
  const projectDiv = document.createElement('div');
  projectDiv.classList.add('project');

  // Create image container div
  const imageContainer = document.createElement('div');
  imageContainer.classList.add('image-container');

  // Add images to image container
  project.images.forEach(imageSrc => {
    const img = document.createElement('img');
    img.src = imageSrc;
    img.alt = `${project.title} - ${project.subtitle}`;
    img.classList.add('project-image');
    imageContainer.appendChild(img);
  });

  // Create project details div
  const projectDetailsDiv = document.createElement('div');
  projectDetailsDiv.classList.add('project-details');

  // Add project title and subtitle
  const projectTitle = document.createElement('h4');
  projectTitle.textContent = `${project.title}`;
  projectDetailsDiv.appendChild(projectTitle);

  // Add project title and subtitle WIP
  const projectSubtitle = document.createElement('h5');
  projectSubtitle.textContent = `${project.subtitle}`;
  projectDetailsDiv.appendChild(projectSubtitle);

  // Add project description
  const projectDescription = document.createElement('p');
  projectDescription.textContent = project.description;
  projectDetailsDiv.appendChild(projectDescription);

  // Add skills list
  const skillsList = document.createElement('ul');
  skillsList.classList.add('skills');
  project.skills.forEach(skill => {
    const skillItem = document.createElement('li');
    skillItem.textContent = skill;
    skillsList.appendChild(skillItem);
  });
  projectDetailsDiv.appendChild(skillsList);

  // Add image container and details to the project div
  projectDiv.appendChild(imageContainer);
  projectDiv.appendChild(projectDetailsDiv);

  return projectDiv;
}
