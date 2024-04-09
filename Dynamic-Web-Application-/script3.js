// Romika Chaudhary
// C0921918
// April 7, 2024

// URL and API Key for accessing Unsplash picture
const API_KEY_UNSPLASH = '-yVHnIeirZXQo-y9wMRmv11KgXqtuCYWNCH_euSYfPQ';
const URL_UNSPLASH = `https://api.unsplash.com/search/photos?query=`;

// Accessing the necessary elements
const body = document.querySelector("body");
const myBtn = document.querySelector('.myForm');
const imagesContainer = document.getElementById('backgroundImageContainer');

// Function to fetch and display images
function getPhotos(picSearch) {
    fetch(`${URL_UNSPLASH}${picSearch}&client_id=${API_KEY_UNSPLASH}`)
    .then(res => res.json())
    .then(data => {
        console.log(data);
        if (data.results.length > 0) {
            // Clear existing images
            imagesContainer.innerHTML = '';
            // Display new images
            data.results.forEach(result => {
                const imageElement = document.createElement('img');
                imageElement.src = result.urls.regular;
                imagesContainer.appendChild(imageElement);
            });
        }
        else {
            console.error('No images found for the search item.');
        }
    })
    .catch(error => {
        console.error('Error fetching data:', error);
    });
}

// Event listener for form submission
myBtn.addEventListener('submit', e => {
    e.preventDefault();
    const picSearch = document.getElementById('picSearch').value.trim(); // Use the search input value and trim whitespace
    if (picSearch === "") {
        alert("Please enter a search term."); // Display an alert if the search term is empty
        return; // Exit the function early if the search term is empty
    }
    getPhotos(picSearch);
    document.getElementById('picSearch').value = ""; // Clear the search input after submitting the form
});

// Function to refresh images every 20 seconds
setInterval(() => {
    const picSearch = document.getElementById('picSearch').value.trim(); // Use the search input value and trim whitespace
    if (picSearch !== "") {
        getPhotos(picSearch);
    }
}, 20000); // Refresh every 20 seconds
