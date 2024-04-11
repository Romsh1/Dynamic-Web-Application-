//Romika Chaudhary
//C0921918
//April 7, 2024

//URL and API Key for accessing Unsplash picture
const API_KEY = '-yVHnIeirZXQo-y9wMRmv11KgXqtuCYWNCH_euSYfPQ';
const URL = `https://api.unsplash.com/search/photos?query=`;

//Accessing the necessary elements
let searchBtn = document.getElementById('picButton');
let placeImage = document.getElementById('placeImage');
let searchInput = document.getElementById('picSearch'); 
const body = document.querySelector("body");
const picDisplay = document.getElementById('pictureDisplay');
const myBtn = document.querySelector('.myForm');

//Setting up a category to display default image
let curr_category = "Jeep";

//Function to fetch and display images using AJAX
function getPhotos(picSearch) {
    $.ajax({
        url: `${URL}${picSearch}&&count=99&client_id=${API_KEY}`,
        method: 'GET',
        dataType: 'json',
        success: function(data) {
            console.log(data);
            if (data.results.length > 0) {
                //Generating random number to display pictures
                let randNumber = Math.floor(Math.random() * data.results.
                length);
                const imageUrl = data.results[randNumber].urls.regular;
                //Setting the src attribute of the img element
                $('#placeImage').attr('src', imageUrl); 
            } else {
                console.error('No images found for the search item.');
            }
        },
        error: function(xhr, status, error) {
            console.error('Error fetching data:', error);
        }
    });
}

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
    } else {
        curr_category = picSearch;
        getPhotos(picSearch);
        //Clearing the search input after submitting the form
        searchInput.value = "";     
    }
});

//Initial call to fetch and display images
//getPhotos();



//Weather API
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

$(document).ready(function() {
//Search functionality
$(".search-weather").on('submit', function(e) {
    e.preventDefault();
    let search = $(".weather_searchForm").val();
    curr_city = search;
    getWeather();
    $(".weather_searchForm").val("");
});

//Converting temperature units
$(".weather_temp_celcius").on('click', function() {
    if (units !== "metric") {
        units = "metric";
        getWeather();
    }
});

$(".weather_temp_fahrenheit").on('click', function() {
    if (units !== "imperial") {
        units = "imperial";
        getWeather();
    }
});

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
    //Returning the display name of provided country codes
    return regionNames.of(country);
}

//Updating date and time
function updateDateTime() {
    const datetimeDiv = $('.weather_dateNtime');
    setInterval(function() {
        const now = new Date();
        datetimeDiv.html(now.toLocaleString());
    }, 1000);
}    

//Calling the updateDateTime function when the page loads
updateDateTime();

//Main function to fetch weather data
function getWeather() {
    const API_KEY = 'b0bd8bbd5f515361fdc416b758befdc5';
    if (!curr_city) {
        //Setting default city
        curr_city = "Sarnia"; 
    }

    $('.loading').css('display', 'block');

    $.ajax({
        url: `https://api.openweathermap.org/data/2.5/weather?q=${curr_city}&appid=${API_KEY}&units=${units}`,
        method: 'GET',
        success: function(data) {
            console.log(data);
            $(".weather_search_city").html(`${data.name}, ${convertCountryCode(data.sys.country)}`);
            $(".weather_dateNtime").html(convertTimeStamp(data.dt, data.timezone));
            $(".forecast_weather").html(`<p>${data.weather[0].main}</p>`);
            $(".weather_temperature").html(`${data.main.temp.toFixed()}${units === "imperial" ? "&#176F" : "&#176C"}`);
            $(".icon_weather").html(`<img src="http://openweathermap.org/img/wn/${data.weather[0].icon}.png" alt="Weather Icon"/>`);
            $(".minMax_weather").html(`<p>H: ${data.main.temp_min.toFixed()}&#176 </p><p>L: ${data.main.temp_max.toFixed()}&#176 </p>`);
            $(".weather_feels_like").html(`${data.main.feels_like.toFixed()}${units === "imperial" ? "&#176F" : "&#176C"}`);
            $(".weather_humidity").html(`${data.main.humidity}%`);
            $(".weather_wind").html(`${data.wind.speed}${units === "imperial" ? "mph" : "m/s"}`);
            $(".weather_gauge").html(`${data.main.pressure}hpa`);
            $('.loading').css('display', 'none');
        },
        error: function(xhr, status, error) {
            console.error('Error fetching weather data:', error);
            if (error.message === 'City not found') {
                alert("Invalid city name!");
            }
            $('.loading').css('display', 'none');
        }
    });
}

//Initial call to fetch default weather data
getWeather();
});

//Single timer updater function for time, weather and pictures
function singleTimer() {
setInterval(() => {
    getWeather(curr_city);
}, 60000); 

setInterval(() => {
    getPhotos(curr_category);
}, 20000); 

setInterval(() => {
    updateDateTime();
}, 1000);
}

window.onload = singleTimer;