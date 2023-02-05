var cityName = $("#search-input").val().trim();
const settings = {
    "async": true,
    "crossDomain": true,
    "url": "https://open-weather13.p.rapidapi.com/city/london",
    "method": "GET",
    "headers": {
        "X-RapidAPI-Key": "14b0003685mshe3ead7338141716p16fb2cjsnaa89ee428e3f",
        "X-RapidAPI-Host": "open-weather13.p.rapidapi.com"
    }
};
$.ajax(settings).done(function (response) {
    console.log(response);
    const forecastEl = $("#forecast");

    var temp = response.main.temp;
    var wind = response.wind.speed;
    var humidity = response.main.humidity;
    var todayDate = moment().format('dddd, DD MMMM YYYY');
    var endDate = moment(todayDate, "dddd, DD MMMM YYYY").add(5, 'days');

    for (var forcast = moment(todayDate, "dddd, DD MMMM YYYY"); forcast.isBefore(endDate); forcast.add(1, 'days')) {
        var date = forcast.format("DD MMMM YYYY"); 
        $("<div>").addClass("card")
        .append($("<h4>").addClass("date").text(date))
        .append($("<img>").addClass("icon").html("<i class='fa fa-sun'></i>"))
        .append($("<h4>").addClass("temp").text("Temp: " + temp + "°C"))
        .append($("<h4>").addClass("wind").text("Wind: " + wind + "m/s"))
        .append($("<h4>").addClass("humidity").text("Humidity: " + humidity + "%"))
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

