var cityName = "London";

$("#search-button").click(function(){
    cityName = $("#search-input").val();
});

$(function weather(){

var APIkey = "80d2291911ec73545d4250e961efc4ce"

var queryURLFiveDay = "http://api.openweathermap.org/geo/1.0/direct?q=" + cityName + "&limit=5&appid=" + APIkey;
$.ajax({
    url: queryURLFiveDay,
    method: "GET",
})

.then(function (response) {
   
var cityGeoName = response[0].name;
var cityGeoLon = response[0].lon;
var cityGeoLat = response[0].lat;

let queryURL = "http://api.openweathermap.org/data/2.5/forecast?lat=" + cityGeoLat + "&lon=" + cityGeoLon + "&appid=" + APIkey

$.ajax({

    url: queryURL,
    method: "GET",
    })

.then(function (forecastData) {
console.log(forecastData);
    
    const forecastEl = $("#forecast");
    const todayEl = $("#today");

    var temp = Math.round((forecastData.list[0].main.temp - 273.15) * 10) / 10;
    var wind = forecastData.list[0].wind.speed;
    var humidity = forecastData.list[0].main.humidity;
    var icon = forecastData.list[0].weather[0].icon;
    var todayDate = moment().format('DD/MM/YYYY');
    var tomorrow = moment(todayDate, "DD/MM/YYYY").add(1, 'days');
    var endDate = moment(tomorrow, "DD/MM/YYYY").add(5, 'days');

    
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

    for (var i = 6; i <= 38; i += 8) {
        var date = moment.unix(forecastData.list[i].dt).format("DD/MM/YYYY");
        var temp = (forecastData.list[i].main.temp - 273.15).toFixed(1);
        var wind = forecastData.list[i].wind.speed;
        var humidity = forecastData.list[i].main.humidity;
        var icon = forecastData.list[i].weather[0].icon;

    
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
});
