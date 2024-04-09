// Romika Chaudhary
// C0921918
// April 7, 2024

//URL and API Key for accessing Unsplash picture
const API_KEY = '-yVHnIeirZXQo-y9wMRmv11KgXqtuCYWNCH_euSYfPQ';
const URL = `https://api.unsplash.com/search/photos?query=`;

//Accessing the necessary elements
let searchBtn = document.getElementById('picButton');
let placeImage = document.getElementById('placeImage');
let searchInput = document.getElementById('picSearch'); 
const body = document.querySelector("body");
const myBtn = document.querySelector('.myForm');

//Event listener for form submission
myBtn.addEventListener('submit', e => {
    e.preventDefault();
    //Using the search input value and trim whitespace
    let picSearch = searchInput.value.trim(); 
    if (picSearch === "") {
        //Displaying an alert if the search box is empty
        alert("Please enter a search term."); 
        //Exitting the function early if the search term is empty
        return; 
    }
    getPhotos(picSearch);
    //Clearing the search input after submitting the form
    searchInput.value = ""; 
});

//Function to fetch and display images
function getPhotos(picSearch) {
    fetch(`${URL}${picSearch}&client_id=${API_KEY}`) // Updated the URL construction
    .then(res => res.json())
    .then(data => {
        console.log(data);
        //Displaying the first image from the results  
        // body.style.backgroundImage = `url(${data.results[0].urls.regular})`; 
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




//For Weather API
//Declaring current city and units
let curr_city = "Sarnia";
let units = "metric";

//Accessing Selectors
let city = document.querySelector(".weather_search_city");
let dateTime = document.querySelector(".weather_dateNtime");
let weatherForecast = document.querySelector(".forecast_weather");
let weatherTemperature = document.querySelector(".weather_temperature");
let weatherIcon = document.querySelector(".icon_weather");
let weatherMinMax = document.querySelector(".minMax_weather");
let weatherFeelsLike = document.querySelector(".weather_feels_like");
let weatherHumidity = document.querySelector(".weather_humidity");
let weatherWind = document.querySelector(".weather_wind");
let weatherPressure = document.querySelector(".weather_gauge");
let loadStatus = document.querySelector(".loading");

//Search functionality
document.querySelector(".search-weather").addEventListener
('submit', e => {
    let search = document.querySelector(".weather_searchForm");
    //Preventing default action
    e.preventDefault();
    //Changes current city according to the value entered
    curr_city = search.value;
    //Gets the weather forecast
    getWeather();
    //Clearing input text box after each search
    search.value = "";
})

//Converting Celcius to Fahrenheit and Vice-Versa
document.querySelector(".weather_temp_celcius").addEventListener
('click', () => {
    if(units !== "metric"){
        //Changing to metric
        units = "metric"
        //Getting the weather forecast
        getWeather();
    }
})

document.querySelector(".weather_temp_fahrenheit").addEventListener
('click', () => {
    if(units !== "imperial"){
        units = "imperial"
        getWeather();
    }
})


function convertTimeStamp(timestamp, timezone) {
    //Converting seconds to hour
    const convertTimezone = timezone / 3600;

    const date = new Date(timestamp * 1000);

    const options = {
        weekday: "long",
        day: "numeric",
        month: "long",
        year: "numeric",
        hour: "numeric",
        minute: "numeric",
        //Setting the timezone for date formatting
        timeZone: `Etc/GMT${convertTimezone >= 0 ? "-" : "+"}${Math.abs(convertTimezone)}`,
        //Specifying to use 12 hour time format
        hour12: true,
    };
    return date.toLocaleString("en-US", options);
}

//Converting country code to Country name
function convertCountryCode(country) {
    let regionNames = new Intl.DisplayNames(["en"], { type: "region" });
    //Returns the display name of provided country codes
    return regionNames.of(country);
}

// // Function to update date and time every second
// function updateDateTime(timezoneOffset) {
//     const datetimeDiv = document.querySelector('.weather_dateNtime');
//     setInterval(() => {
//         const now = new Date();
//         // Adjust time according to timezone offset
//         const localTime = new Date(now.getTime() + timezoneOffset * 1000);
//         datetimeDiv.innerHTML = localTime.toLocaleString();
//     }, 1000);
// }

//Declaring datetimeInterval globally
let datetimeInterval;

//Function to update date and time every second
function updateDateTime(timezoneOffset) {
    const datetimeDiv = document.querySelector('.weather_dateNtime');
    //Clearing previous interval if exists
    clearInterval(datetimeInterval); 
    datetimeInterval = setInterval(() => {
        const now = new Date();
        //Adjustting time according to timezone offset
        const localTime = new Date(now.getTime() + timezoneOffset * 1000);
        //Formatting date and time manually to ensure consistency
        const options = {
            weekday: "long",
            year: "numeric",
            month: "long",
            day: "numeric",
            hour: "numeric",
            minute: "numeric",
            hour12: true // Use 12-hour format
        };
        datetimeDiv.innerHTML = localTime.toLocaleString("en-US", options);
    }, 1000);
}


// Call the updateDateTime function when the page loads
document.addEventListener('DOMContentLoaded', () => {
    //Fetch initial weather data to get timezone information
    getWeather(); //Fetch initial weather data to get timezone information
});

//Main function with API call
function getWeather() {
    const API_KEY = 'b0bd8bbd5f515361fdc416b758befdc5';
    //Validation if user input for city is not entered
    if(!curr_city){
        alert("Please enter a city!");
        return;
    }

    //Showing loading message
    loadStatus.style.display = 'block';

    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${curr_city}&appid=${API_KEY}&units=${units}`)
    .then(res => {
        if (!res.ok) {
            throw new Error('City not found');
        }
        return res.json();
    })
    .then(data => {
        console.log(data);
        //Processing the received data
        city.innerHTML = `${data.name}, ${convertCountryCode(data.sys.country)}`;
        
        //Passing timezone offset to updateDateTime function
        updateDateTime(data.timezone);

        //Updating other weather details
        dateTime.innerHTML = convertTimeStamp(data.dt, data.timezone);
        weatherForecast.innerHTML = `<p>${data.weather[0].main}</p>`;
        weatherTemperature.innerHTML = `${data.main.temp.toFixed()}${units === "imperial" ? "&#176F" : "&#176C"}`;
        weatherIcon.innerHTML = `<img src="http://openweathermap.org/img/wn/${data.weather[0].icon}.png" alt="Weather Icon"/>`;
        weatherMinMax.innerHTML = `<p>H: ${data.main.temp_min.toFixed()}&#176 </p>
                                    <p>L: ${data.main.temp_max.toFixed()}&#176 </p>`;
        weatherFeelsLike.innerHTML = `${data.main.feels_like.toFixed()}${units === "imperial" ? "&#176F" : "&#176C"}`;
        weatherHumidity.innerHTML = `${data.main.humidity}%`;
        weatherWind.innerHTML = `${data.wind.speed}${units === "imperial" ? "mph" : "m/s"}`;
        weatherPressure.innerHTML = `${data.main.pressure}hpa`;

        //Hiding loading message after data is fetched
        loadStatus.style.display = 'none';
    })
    .catch(error => {
        console.error('Error fetching weather data:', error);
        if (error.message === 'City not found') {
            alert("Invalid city name!");
        }
        //Hiding loading message in case of error
        loadStatus.style.display = 'none';
    });
}