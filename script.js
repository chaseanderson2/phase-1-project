const apiUrl = "https://www.amiiboapi.com/api/amiibo/?name=yoshi";

// Function to fetch and display Amiibo data
function fetchAmiiboData() {
  // Fetch the data from the API
  fetch(apiUrl)
    .then(response => response.json())  // Parse the JSON response
    .then(data => {
      const amiiboContainer = document.getElementById('amiibo-container');
      const amiiboDropdown = document.getElementById('amiiboDropdown');
      const amiibos = data.amiibo;

      // Create an array of names for the dropdown search
      const amiiboNames = amiibos.map(amiibo => amiibo.name);

      // Populate the dropdown with Amiibo names
      amiiboNames.forEach(name => {
        const option = document.createElement('option');
        option.value = name;
        option.textContent = name;
        amiiboDropdown.appendChild(option);
      });

      // Display all Amiibos initially
      displayAmiibos(amiibos);

      // Add an event listener to filter Amiibos when the dropdown value changes
      amiiboDropdown.addEventListener('change', (e) => {
        const selectedName = e.target.value;
        const filteredAmiibos = amiibos.filter(amiibo => amiibo.name === selectedName);
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
    .catch(error => console.error('Error fetching Amiibo data:', error));
}

// Function to display Amiibo data
function displayAmiibos(amiibos) {
  const amiiboContainer = document.getElementById('amiibo-container');
  amiiboContainer.innerHTML = '';  // Clear the current list before displaying new data

  // Loop through each Amiibo and create the HTML elements for each one
  amiibos.forEach(amiibo => {
    const amiiboDiv = document.createElement('div');
    amiiboDiv.classList.add('amiibo-item');
    
    // Create a container for the image
    const imageContainer = document.createElement('div');
    imageContainer.classList.add('image-container');
    
    const image = document.createElement('img');
    image.src = amiibo.image;
    image.alt = amiibo.name;

    // Add an event listener for clicking on the image to expand it
    image.addEventListener('click', () => {
      expandImage(image.src);  // Pass the image src to the expandImage function
    });
    
    // Append the image to its container
    imageContainer.appendChild(image);
    
    // Create a container for the text
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

  // Create a full-screen overlay for the expanded image
  const overlay = document.createElement('div');
  overlay.classList.add('overlay');
  
  const expandedImage = document.createElement('img');
  expandedImage.src = src;
  expandedImage.classList.add('expanded-image');

  // Append the expanded image to the overlay
  overlay.appendChild(expandedImage);
  
  // Add an event listener to close the overlay when clicked
  overlay.addEventListener('click', () => {
    overlay.remove();  // Remove the overlay when clicked
  });

  // Append the overlay to the body
  document.body.appendChild(overlay);
}

// Function to change background color to black (for both body and container)
function changeBackgroundColor() {
  // Set the background color to black for the body
  document.body.style.backgroundColor = 'black';
  
// Change the background color of each amiibo-item to grey
const amiiboItems = document.querySelectorAll('.amiibo-item');
amiiboItems.forEach(item => {
  item.style.backgroundColor = 'grey';  // Dark grey for individual items
});

 // Change the color of the title (h1) to match the background color (black)
 const title = document.querySelector('h1');
 title.style.color = 'grey';  // Title color matches the background

// Optionally, you could change button text to something like "Disable Dark Mode"
colorChangeButton.textContent = 'Disable Dark Background';
colorChangeButton.removeEventListener('click', changeBackgroundColor);
colorChangeButton.addEventListener('click', resetBackgroundColor);
}

// Event listener for the "Change Background Color" button
const colorChangeButton = document.getElementById('color-change-btn'); // Ensure the ID matches here
colorChangeButton.addEventListener('click', changeBackgroundColor);

// Call the function to fetch and display the data when the page loads
window.onload = fetchAmiiboData;
