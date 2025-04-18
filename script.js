const apiUrl = "https://www.amiiboapi.com/api/amiibo/?name=yoshi";

// Function to fetch and display Amiibo data
function fetchAmiiboData() {
  // Fetch the data from the API
  fetch(apiUrl)
    .then(response => response.json())  // Parse the JSON response
    .then(data => {
      const amiiboContainer = document.getElementById('amiibo-container'); // Grabs the amiibo-container div
      const amiiboDropdown = document.getElementById('amiiboDropdown'); // Grabs the <select> dropdown for the amiibo filter
      const amiibos = data.amiibo; // Accesses the amiibo objects from the array

      // An array of names for the dropdown search
      const amiiboNames = amiibos.map(amiibo => amiibo.name);

      // Populate the dropdown with Amiibo names
      amiiboNames.forEach(name => {
        const option = document.createElement('option'); // This creates <option> elements for the <select> dropdown
        option.value = name; // Sets the value for the <option> element
        option.textContent = name; // Sets the value for what the user will see in the dropdown
        amiiboDropdown.appendChild(option); // appends the child into the existing <select> dropdown
      });

      // Display all Amiibos initially
      displayAmiibos(amiibos);

      // An event listener that will filter Amiibos when the dropdown value changes
      amiiboDropdown.addEventListener('change', (e) => { 
        const selectedName = e.target.value; // This grabs the name of the selected option
        const filteredAmiibos = amiibos.filter(amiibo => amiibo.name === selectedName); // Filters through the whole list to grab the one the user selected
        // Hide the default option text when an option is selected
        if (selectedName) {
          amiiboDropdown.options[0].style.display = 'none';  // Hide the first option
        } else {
          amiiboDropdown.options[0].style.display = 'block'; // Show it back if nothing is selected
        }
        // Display the filtered Amiibos
        displayAmiibos(filteredAmiibos);
      });

    })
    .catch(error => console.error('Error fetching Amiibo data:', error)); // Simple console log for if the API cannot be fetched
}

// Function to display Amiibo data
function displayAmiibos(amiibos) {
  const amiiboContainer = document.getElementById('amiibo-container');
  amiiboContainer.innerHTML = '';  // Clears the current list before displaying new data

  // Loops through each Amiibo and creates the HTML elements for each one
  amiibos.forEach(amiibo => {
    const amiiboDiv = document.createElement('div');
    amiiboDiv.classList.add('amiibo-item');
    
    // A container for the images
    const imageContainer = document.createElement('div');
    imageContainer.classList.add('image-container');
    
    const image = document.createElement('img');
    image.src = amiibo.image;
    image.alt = amiibo.name;

    // An event listener for clicking on the image to expand it
    image.addEventListener('click', () => {
      expandImage(image.src);  // Pass the image src to the expandImage function
    });
    
    // Append the image to its container
    imageContainer.appendChild(image);
    
    // A container for the text
    const textContainer = document.createElement('div');
    textContainer.classList.add('text-container');
    
    const name = document.createElement('h2');
    name.textContent = amiibo.name;
    
    const gameSeries = document.createElement('p');
    gameSeries.textContent = `Game Series: ${amiibo.gameSeries}`;
    
    const releaseDate = document.createElement('p');
    releaseDate.textContent = `NA Release Date: ${amiibo.release.na}`;
    
    // Append text elements to the text container
    textContainer.appendChild(name);
    textContainer.appendChild(gameSeries);
    textContainer.appendChild(releaseDate);
    
    // Append the image and text containers to the Amiibo div
    amiiboDiv.appendChild(imageContainer);
    amiiboDiv.appendChild(textContainer);
    
    // Append the Amiibo div to the container
    amiiboContainer.appendChild(amiiboDiv);
  });
}

// Function to expand the image
function expandImage(src) {
  // Check if an overlay already exists, and if so, remove it
  const existingOverlay = document.querySelector('.overlay');
  if (existingOverlay) {
    existingOverlay.remove();  // Remove the existing overlay if present
  }

  // Creates a full-screen overlay for the expanded image
  const overlay = document.createElement('div');
  overlay.classList.add('overlay');
  
  const expandedImage = document.createElement('img');
  expandedImage.src = src;
  expandedImage.classList.add('expanded-image');

  // Append the expanded image to the overlay
  overlay.appendChild(expandedImage);
  
  // An event listener that will close the overlay when clicked
  overlay.addEventListener('click', () => {
    overlay.remove();  // Remove the overlay when clicked
  });

  // Append the overlay to the body
  document.body.appendChild(overlay);
}

// Function to change background color to black (for both body and container)
function changeBackgroundColor() {
  // Sets the background color to black for the body
  document.body.style.backgroundColor = 'black';
  
// Changes the background color of each amiibo-item to grey
const amiiboItems = document.querySelectorAll('.amiibo-item');
amiiboItems.forEach(item => {
  item.style.backgroundColor = 'grey';  // Dark grey for individual items
});

 // Changes the color of the title (h1) to match the background color (black)
 const title = document.querySelector('h1');
 title.style.color = 'grey';  // Title color matches the background

 const apiWeblink = document.querySelector('.API-weblink');
 apiWeblink.style.color = 'grey';  // Makes the weblink text white for visibility
}

// Event listener for the "Change Background Color" button
const colorChangeButton = document.getElementById('color-change-btn'); 
colorChangeButton.addEventListener('click', changeBackgroundColor);

// Call the function to fetch and display the data when the page loads
window.onload = fetchAmiiboData;
