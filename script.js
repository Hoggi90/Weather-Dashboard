$(function(){

var APIkey = "d68b76cc20e3b282be54dd010f704bd7"
let queryURLFiveDay = "http://api.openweathermap.org/geo/1.0/direct?q=London&limit=5&appid=80d2291911ec73545d4250e961efc4ce"
var cityName = $("#search-input").val().trim();

$.ajax({

    url: queryURLFiveDay,
    method: "GET",
    })

.then(function (response) {
    console.log(response);
   
var cityGeoName = response[0].name;
var cityGeoLon = response[0].lon;
var cityGeoLat = response[0].lat;

console.log(cityGeoName);
console.log(cityGeoLon);
console.log(cityGeoLat);

let queryURL = "http://api.openweathermap.org/data/2.5/forecast?lat=" + cityGeoLat + "&lon=" + cityGeoLon + "&appid=" + APIkey

$.ajax({

    url: queryURL,
    method: "GET",
    })

.then(function (geoData) {
console.log(geoData)

    
    const forecastEl = $("#forecast");
    const todayEl = $("#today");

    var temp = Math.round((geoData.list[0].main.temp - 273.15) * 10) / 10;
    var wind = geoData.list[0].wind.speed;
    var humidity = geoData.list[0].main.humidity;
    var icon = geoData.list[0].weather[0].icon;
    var todayDate = moment().format('DD/MM/YYYY');
    var tomorrow = moment(todayDate, "DD/MM/YYYY").add(1, 'days');
    var endDate = moment(tomorrow, "DD/MM/YYYY").add(5, 'days');

    
    $("<div>").addClass("today")
    .append($("<h2>").addClass("date").text(cityGeoName + '(' + todayDate + ')')
    .append($("<img>").attr("src", "https://openweathermap.org/img/wn/" + icon + "@2x.png"))
    .appendTo($("<h2>").addClass("date")))
    .append($("<h4>").addClass("temp").text("Temp: " + temp + "°C"))
    .append($("<h4>").addClass("wind").text("Wind: " + wind + "m/s"))
    .append($("<h4>").addClass("humidity").text("Humidity: " + humidity + "%"))
    .appendTo(todayEl);



    for (var forcast = moment(tomorrow, "DD/MM/YYYY"); forcast.isBefore(endDate); forcast.add(1, 'days')) {
        var date = forcast.format("DD/MM/YYYY"); 
        $("<div>").addClass("card")
        .append($("<h4>").addClass("date").text(date))
        .append($("<img>").addClass("icon").html("<i class='fa fa-sun'></i>"))
        .append($("<h4>").addClass("temp").text("Temp: " + temp5 + "°C"))
        .append($("<h4>").addClass("wind").text("Wind: " + wind5 + "m/s"))
        .append($("<h4>").addClass("humidity").text("Humidity: " + humidity5 + "%"))
        .appendTo(forecastEl);
    };

});



$("#search-form").on("submit", function(event) {
    event.preventDefault();
    var cityName = $("#search-input").val().trim();
    const settings = {
        "async": true,
        "crossDomain": true,
        "url": "https://open-weather13.p.rapidapi.com/city/" + cityName,
        "method": "GET",
        "headers": {
            "X-RapidAPI-Key": "14b0003685mshe3ead7338141716p16fb2cjsnaa89ee428e3f",
            "X-RapidAPI-Host": "open-weather13.p.rapidapi.com"
        }
    };
  
    $.ajax(settings).done(function (response) {
        console.log(response);
    });

    let 
});
});
});