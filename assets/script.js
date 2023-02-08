//This function assigns "London" as the default city when the page first loads
// It also retrieves data from localstorage
// It also has a for loop to recreate the buttons when it retrieves data from localstorage
$(function() {
    cityName = "London";
    weather();
    var history = localStorage.getItem("history") ? JSON.parse(localStorage.getItem("history")) : [];
    for (var i = 0; i < history.length; i++) {
        var btn = $("<button>");
        btn.addClass("list-group-item");
        btn.text(history[i]);
        $("#history").append(btn);
    }
});

// This function empties the page, then assign the value of search-input into cityName
// It then calls the weather() function and creates the button and appends it to a list
// This also stores the value of cityName into local storage
$("#search-button").click(function (e) {
    e.preventDefault();
    
    $("#forecast").empty();
    $("#today").empty();
    cityName = $("#search-input").val();
    weather();
    var btn = $("<button>");
    btn.addClass("list-group-item");
    btn.text(cityName);
    $("#history").append(btn);
    
    var history = localStorage.getItem("history") ? JSON.parse(localStorage.getItem("history")) : [];
    history.push(cityName);
    localStorage.setItem("history", JSON.stringify(history));
    $("#search-form").trigger("reset")
});
// This function calls the weather() function using the value of the appended buttons from history
$("#history").on("click", "button", function (e) {
    e.preventDefault();
    $("#forecast").empty();
    $("#today").empty();
    $("#search-input").val($(this).text());
    cityName = $(this).text();
    weather();
});
// This function clears the list of buttons from the page and localstorage
$("#clear-results").on("click", function (e) {
    e.preventDefault();
    $("#history").empty();
    localStorage.removeItem("history"); 
    });


// This global function holds all the javascript to obtain data from the APIs
function weather() {
var APIkey = "80d2291911ec73545d4250e961efc4ce"

var queryURLFiveDay = "https://api.openweathermap.org/geo/1.0/direct?q=" + cityName + "&limit=5&appid=" + APIkey;
$.ajax({
    url: queryURLFiveDay,
    method: "GET",
})

.then(function (response) {
 // The city name, longitude and latitude were extracted  
var cityGeoName = response[0].name;
var cityGeoLon = response[0].lon;
var cityGeoLat = response[0].lat;
// They were then passed through this API
let queryURL = "https://api.openweathermap.org/data/2.5/forecast?lat=" + cityGeoLat + "&lon=" + cityGeoLon + "&appid=" + APIkey

$.ajax({

    url: queryURL,
    method: "GET",
    })

.then(function (forecastData) {
console.log(forecastData);
    
    const forecastEl = $("#forecast");
    const todayEl = $("#today");
// These variables stores the weather data and date
    var temp = Math.round((forecastData.list[0].main.temp - 273.15) * 10) / 10;
    var wind = forecastData.list[0].wind.speed;
    var humidity = forecastData.list[0].main.humidity;
    var icon = forecastData.list[0].weather[0].icon;
    var todayDate = moment().format('DD/MM/YYYY');

// The today section is created dynamically
    $("<div>").addClass("today")
    .append($("<h2>").addClass("todayDate").text(cityGeoName + '(' + todayDate + ')')
    .append($("<img>").addClass("icon2").attr("src", "https://openweathermap.org/img/wn/" + icon + "@2x.png"))
    .appendTo($("<h2>").addClass("date")))
    .append($("<h6>").addClass("h4").text("Temp: " + temp + "°C"))
    .append($("<h6>").addClass("h4").text("Wind: " + wind + "KPH"))
    .append($("<h6>").addClass("h4").text("Humidity: " + humidity + "%"))
    .appendTo(todayEl);
    $("<h2>").addClass("col-lg-12").text("5 Day Forecast")
    .appendTo(forecastEl)
// This for loop creates the data for the 5 day forecast
    for (var i = 6; i <= 38; i += 8) {
        var date = moment.unix(forecastData.list[i].dt).format("DD/MM/YYYY");
        var temp = (forecastData.list[i].main.temp - 273.15).toFixed(1);
        var wind = forecastData.list[i].wind.speed;
        var humidity = forecastData.list[i].main.humidity;
        var icon = forecastData.list[i].weather[0].icon;

// The forecast section is created dynamically 
    $("<div>").addClass("card mt-0")
    .append($("<h5>").addClass("date").text(date))
    .append($("<img>").addClass("icon").attr("src", "https://openweathermap.org/img/wn/" + icon + "@2x.png"))
    .append($("<h6>").addClass("h6").text("Temp: " + temp + "°C"))
    .append($("<h6>").addClass("h6").text("Wind: " + wind + "KPH"))
    .append($("<h6>").addClass("h6").text("Humidity: " + humidity + "%"))
    .appendTo(forecastEl);
    }
          
});
});
};
