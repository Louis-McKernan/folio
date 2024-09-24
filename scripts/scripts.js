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
      document.querySelectorAll('.icon-black').forEach(icon => icon.style.display = 'none');
      document.querySelectorAll('.icon-white').forEach(icon => icon.style.display = 'inline');
    } else {
      moonIcon.style.opacity = '0.5';
      sunIcon.style.opacity = '1';
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
      aboutContainer.querySelector('p').textContent = data.about[0].content;

      // Populate each project section separately

      // Business Projects
      const businessContainer = document.querySelector('.business-container');
      data.projects.business.forEach(project => {
        const projectHTML = createProjectHTML(project);
        businessContainer.appendChild(projectHTML);
      });

      // Community Projects
      const communityContainer = document.querySelector('.community-container');
      data.projects.community.forEach(project => {
        const projectHTML = createProjectHTML(project);
        communityContainer.appendChild(projectHTML);
      });

      // Personal Projects
      const personalContainer = document.querySelector('.personal-container');
      data.projects.personal.forEach(project => {
        const projectHTML = createProjectHTML(project);
        personalContainer.appendChild(projectHTML);
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
        imgBlack.classList.add('icon-black');

        const imgWhite = document.createElement('img');
        imgWhite.src = contact.icon_white;
        imgWhite.alt = `${contact.platform} Icon White`;
        imgWhite.classList.add('icon-white');
        imgWhite.style.display = 'none';

        link.appendChild(imgBlack);
        link.appendChild(imgWhite);
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

document.addEventListener('DOMContentLoaded', () => {
  const collapsibles = document.querySelectorAll('.collapsible');

  collapsibles.forEach(collapsible => {
    const content = collapsible.nextElementSibling;
    
    // Initially expand all sections by default
    content.classList.add('active');
    collapsible.classList.add('open');

    // Toggle collapse on click
    collapsible.addEventListener('click', () => {
      content.classList.toggle('active');
      collapsible.classList.toggle('open');
    });
  });
});
