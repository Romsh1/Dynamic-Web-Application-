// Romika Chaudhary
// C0921918
// April 7, 2024

// URL and API Key for accessing Unsplash picture
const API_KEY_UNSPLASH = '-yVHnIeirZXQo-y9wMRmv11KgXqtuCYWNCH_euSYfPQ';
const URL_UNSPLASH = `https://api.unsplash.com/search/photos?query=`;

// URL and API Key for accessing Weather information
const API_KEY_WEATHER = 'b0bd8bbd5f515361fdc416b758befdc5';

// Accessing the necessary elements
const body = document.querySelector("body");
const myBtn = document.querySelector('.myForm');
const dateTimeElement = document.querySelector(".weather_dateNtime");

// Function to fetch and display images
function getPhotos(picSearch) {
    fetch(`${URL_UNSPLASH}${picSearch}&client_id=${API_KEY_UNSPLASH}`)
    .then(res => res.json())
    .then(data => {
        console.log(data);
        if (data.results.length > 0) {
            body.style.backgroundImage = `url(${data.results[0].urls.regular})`;
        }
        else {
            console.error('No images found for the search item.');
        }
    })
    .catch(error => {
        console.error('Error fetching data:', error);
    });
}

// Function to fetch weather information
function getWeather(city) {
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY_WEATHER}&units=metric`)
    .then(res => res.json())
    .then(data => {
        console.log(data);
        updateWeather(data);
    })
    .catch(error => {
        console.error('Error fetching weather data:', error);
    });
}

// Function to update weather information on the page
function updateWeather(data) {
    const date = new Date(data.dt * 1000); // Convert timestamp to milliseconds
    const options = {
        weekday: "long",
        day: "numeric",
        month: "long",
        year: "numeric",
        hour: "numeric",
        minute: "numeric",
        second: "numeric"
    };
    const formattedDate = date.toLocaleString("en-US", options);
    dateTimeElement.textContent = formattedDate;
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

// Call the getWeather function initially
const initialCity = "Sarnia"; // Initial city for weather information
getWeather(initialCity);

// Update weather information every minute
setInterval(() => {
    getWeather(initialCity);
}, 60000);

// Update current date and time every second
setInterval(() => {
    const currentDate = new Date();
    const options = {
        weekday: "long",
        day: "numeric",
        month: "long",
        year: "numeric",
        hour: "numeric",
        minute: "numeric",
        second: "numeric"
    };
    const formattedDate = currentDate.toLocaleString("en-US", options);
    dateTimeElement.textContent = formattedDate;
}, 1000);
