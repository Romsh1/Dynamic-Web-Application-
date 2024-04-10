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
const picDisplay = document.getElementById('pictureDisplay');
const myBtn = document.querySelector('.myForm');

let curr_category = "hill";

//Function to fetch and display images
// function getPhotos(picSearch) {
//     fetch(`${URL}${picSearch}&&count=99&client_id=${API_KEY}`) 
//     .then(res => res.json())
//     .then(data => {
//         console.log(data);
//         if (data.results.length > 0) {
//             let randNumber = Math.floor(Math.random() * data.results.length);
//             const imageUrl = data.results[randNumber].urls.regular;
//             //Setting the src attribute of the img element
//             placeImage.src = imageUrl; 
//         } else {
//             console.error('No images found for the search item.');
//         }
//     })
//     .catch(error => {
//         console.error('Error fetching data:', error);
//     });
// }

//Function to fetch and display images
function getPhotos(picSearch) {
    $.ajax({
        url: `${URL}${picSearch}&&count=99&client_id=${API_KEY}`,
        method: 'GET',
        dataType: 'json',
        success: function(data) {
            console.log(data);
            if (data.results.length > 0) {
                let randNumber = Math.floor(Math.random() * data.results.length);
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


$(document).ready(function() {
    $('#myBtn').on('submit', function(e) {
        e.preventDefault();
        let picSearch = $('#searchInput').val().trim();
        if (picSearch === "") {
            alert("Please enter a search term.");
            return;
        } else {
            curr_category = picSearch;
            getPhotos(picSearch);
            //Clearing the search input after submitting the form
            $('#searchInput').val(""); 
        }
    });

    // Initial call to fetch and display images
    // getPhotos();

    // Refreshing images every 20 seconds
    setInterval(function() {
        getPhotos(curr_category);
    }, 20000); // Note: 20000 milliseconds = 20 seconds
});


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

// //Search functionality
// document.querySelector(".search-weather").addEventListener
// ('submit', e => {
//     let search = document.querySelector(".weather_searchForm");
//     //Preventing default action
//     e.preventDefault();
//     //Changes current city according to the value entered
//     curr_city = search.value;
//     //Gets the weather forecast
//     getWeather();
//     //Clearing input text box after each search
//     search.value = "";
// })

// //Converting Celcius to Fahrenheit and Vice-Versa
// document.querySelector(".weather_temp_celcius").addEventListener
// ('click', () => {
//     if(units !== "metric"){
//         //Changing to metric
//         units = "metric"
//         //Getting the weather forecast
//         getWeather();
//     }
// })

// document.querySelector(".weather_temp_fahrenheit").addEventListener
// ('click', () => {
//     if(units !== "imperial"){
//         units = "imperial"
//         getWeather();
//     }
// })


// function convertTimeStamp(timestamp, timezone) {
//     //Converting seconds to hour
//     const convertTimezone = timezone / 3600;

//     const date = new Date(timestamp * 1000);

//     const options = {
//         weekday: "long",
//         day: "numeric",
//         month: "long",
//         year: "numeric",
//         hour: "numeric",
//         minute: "numeric",
//         //Setting the timezone for date formatting
//         timeZone: `Etc/GMT${convertTimezone >= 0 ? "-" : "+"}${Math.abs(convertTimezone)}`,
//         //Specifying to use 12 hour time format
//         hour12: true,
//     };
//     return date.toLocaleString("en-US", options);
// }

// //Converting country code to Country name
// function convertCountryCode(country) {
//     let regionNames = new Intl.DisplayNames(["en"], { type: "region" });
//     //Returns the display name of provided country codes
//     return regionNames.of(country);
// }

// //Function to update date and time every second
// function updateDateTime() {
//     const datetimeDiv = document.querySelector('.weather_dateNtime');
//     setInterval(() => {
//         const now = new Date();
//         datetimeDiv.innerHTML = now.toLocaleString();
//     }, 1000);
// }

// // Call the updateDateTime function when the page loads
// document.addEventListener('DOMContentLoaded', updateDateTime);

$(document).ready(function() {
    // Search functionality
    $(".search-weather").on('submit', function(e) {
        let search = $(".weather_searchForm").val();
        // Preventing default action
        e.preventDefault();
        // Changes current city according to the value entered
        curr_city = search;
        // Gets the weather forecast
        getWeather();
        // Clearing input text box after each search
        $(".weather_searchForm").val("");
    });

    // Converting Celcius to Fahrenheit and Vice-Versa
    $(".weather_temp_celcius").on('click', function() {
        if (units !== "metric") {
            // Changing to metric
            units = "metric";
            // Getting the weather forecast
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
        // Converting seconds to hour
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
            //Specifying to use 12-hour time format
            hour12: true,
        };
        return date.toLocaleString("en-US", options);
    }

    //Converting country code to Country name
    function convertCountryCode(country) {
        let regionNames = new Intl.DisplayNames(["en"], { type: "region" });
        // Returns the display name of provided country codes
        return regionNames.of(country);
    }

    //Function to update date and time every second
    function updateDateTime() {
        const datetimeDiv = $('.weather_dateNtime');
        setInterval(function() {
            const now = new Date();
            datetimeDiv.html(now.toLocaleString());
        }, 1000);
    }

    //Calling the updateDateTime function when the page loads
    $(updateDateTime);
});


function getWeather() {
    const API_KEY = 'b0bd8bbd5f515361fdc416b758befdc5';
    // Validation if user input for city is not entered
    if (!curr_city) {
        alert("Please enter a city!");
        return;
    }

    // Showing loading message
    $('.loadStatus').css('display', 'block');

    $.ajax({
        url: `https://api.openweathermap.org/data/2.5/weather?q=${curr_city}&appid=${API_KEY}&units=${units}`,
        method: 'GET',
        success: function(data) {
            console.log(data);
            // Processing the received data
            $('.city').html(`${data.name}, ${convertCountryCode(data.sys.country)}`);
            $('.dateTime').html(convertTimeStamp(data.dt, data.timezone));
            $('.weatherForecast').html(`<p>${data.weather[0].main}</p>`);
            $('.weatherTemperature').html(`${data.main.temp.toFixed()}${units === "imperial" ? "&#176F" : "&#176C"}`);
            $('.weatherIcon').html(`<img src="http://openweathermap.org/img/wn/${data.weather[0].icon}.png" alt="Weather Icon"/>`);
            $('.weatherMinMax').html(`<p>H: ${data.main.temp_min.toFixed()}&#176 </p>
                                    <p>L: ${data.main.temp_max.toFixed()}&#176 </p>`);
            $('.weatherFeelsLike').html(`${data.main.feels_like.toFixed()}${units === "imperial" ? "&#176F" : "&#176C"}`);
            $('.weatherHumidity').html(`${data.main.humidity}%`);
            $('.weatherWind').html(`${data.wind.speed}${units === "imperial" ? "mph" : "m/s"}`);
            $('.weatherPressure').html(`${data.main.pressure}hpa`);

            // Hiding loading message after data is fetched
            $('.loadStatus').css('display', 'none');
        },
        error: function(xhr, status, error) {
            console.error('Error fetching weather data:', error);
            if (error.message === 'City not found') {
                alert("Invalid city name!");
            }
            // Hiding loading message in case of error
            $('.loadStatus').css('display', 'none');
        }
    });
}

//After the doc will be fully loaded and parsed, getWeather() function will be called
$(getWeather);