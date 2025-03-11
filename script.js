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
    
    const name = document.createElement('h2');
    name.textContent = amiibo.name;
    
    const gameSeries = document.createElement('p');
    gameSeries.textContent = `Game Series: ${amiibo.gameSeries}`;
    
    const releaseDate = document.createElement('p');
    releaseDate.textContent = `NA Release Date: ${amiibo.release.na}`;
    
    const image = document.createElement('img');
    image.src = amiibo.image;
    image.alt = amiibo.name;

    // Add an event listener for clicking on the image to expand it
    image.addEventListener('click', () => {
      expandImage(image.src);  // Pass the image src to the expandImage function
    });
    
    // Append the elements to the Amiibo div
    amiiboDiv.appendChild(image);
    amiiboDiv.appendChild(name);
    amiiboDiv.appendChild(gameSeries);
    amiiboDiv.appendChild(releaseDate);
    
    // Append the Amiibo div to the container
    amiiboContainer.appendChild(amiiboDiv);
  });
}

// Function to expand the image
function expandImage(src) {
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

// Function to change background color to black
function changeBackgroundColor() {
  // Set the background color to black
  document.body.style.backgroundColor = 'black';
}

// Event listener for the "Change Background Color" button
const colorChangeButton = document.getElementById('color-change-btn'); // Ensure the ID matches here
colorChangeButton.addEventListener('click', changeBackgroundColor);


// Call the function to fetch and display the data when the page loads
window.onload = fetchAmiiboData;
