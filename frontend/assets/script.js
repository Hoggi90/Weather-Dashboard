var cityName; // Define cityName at a higher scope so it's accessible throughout

// This function assigns "London" as the default city when the page first loads
// It also retrieves data from localstorage and recreates buttons from the history
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

// This function empties the page, sets cityName from the input, calls weather(), and updates localStorage/history
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
    $("#search-form").trigger("reset");
});

// Clicking a history button sets cityName and fetches weather again
$("#history").on("click", "button", function (e) {
    e.preventDefault();
    $("#forecast").empty();
    $("#today").empty();
    $("#search-input").val($(this).text());
    cityName = $(this).text();
    weather();
});

// Clear the stored history and remove buttons
$("#clear-results").on("click", function (e) {
    e.preventDefault();
    $("#history").empty();
    localStorage.removeItem("history"); 
});

// Fetch weather data from the backend and update the UI
function weather() {
    var queryURL = "/api/weather?city=" + encodeURIComponent(cityName);

    $.ajax({
        url: queryURL,
        method: "GET",
        dataType: "json"
    })
    .then(function (response) {
        // response should contain cityName and forecastData
        var cityGeoName = response.cityName;
        var forecastData = response.forecastData;

        console.log("Forecast Data:", forecastData);

        // Check if forecastData is available and has the expected structure
        if (!forecastData || !forecastData.list || forecastData.list.length === 0) {
            $("#today").empty().text("No forecast data available.");
            $("#forecast").empty();
            return;
        }

        const forecastEl = $("#forecast");
        const todayEl = $("#today");
        
        // Current weather details from the first data point
        var temp = Math.round((forecastData.list[0].main.temp - 273.15) * 10) / 10;
        var wind = forecastData.list[0].wind.speed;
        var humidity = forecastData.list[0].main.humidity;
        var icon = forecastData.list[0].weather[0].icon;
        var todayDate = moment().format('DD/MM/YYYY');

        // Dynamically create today's weather section
        $("<div>").addClass("today")
            .append(
                $("<h2>").addClass("todayDate").text(cityGeoName + ' (' + todayDate + ')')
                .append(
                    $("<img>").addClass("icon2").attr("src", "https://openweathermap.org/img/wn/" + icon + "@2x.png")
                )
            )
            .append($("<h6>").addClass("h4").text("Temp: " + temp + "°C"))
            .append($("<h6>").addClass("h4").text("Wind: " + wind + " KPH"))
            .append($("<h6>").addClass("h4").text("Humidity: " + humidity + "%"))
            .appendTo(todayEl);

        // Create the heading for the 5 Day Forecast
        $("<h2>").addClass("col-lg-12").text("5 Day Forecast").appendTo(forecastEl);

        // Create the 5 day forecast cards
        // The data updates every 3 hours; we use increments of 8 to jump approximately one day
        for (var i = 6; i <= 38 && i < forecastData.list.length; i += 8) {
            var date = moment.unix(forecastData.list[i].dt).format("DD/MM/YYYY");
            var dayTemp = (forecastData.list[i].main.temp - 273.15).toFixed(1);
            var dayWind = forecastData.list[i].wind.speed;
            var dayHumidity = forecastData.list[i].main.humidity;
            var dayIcon = forecastData.list[i].weather[0].icon;

            // The forecast section is created dynamically
            $("<div>").addClass("card mt-0")
                .append($("<h5>").addClass("date").text(date))
                .append($("<img>").addClass("icon").attr("src", "https://openweathermap.org/img/wn/" + dayIcon + "@2x.png"))
                .append($("<h6>").addClass("h6").text("Temp: " + dayTemp + "°C"))
                .append($("<h6>").addClass("h6").text("Wind: " + dayWind + " KPH"))
                .append($("<h6>").addClass("h6").text("Humidity: " + dayHumidity + "%"))
                .appendTo(forecastEl);
        }
    })
    .fail(function (jqXHR) {
        console.error("Failed to fetch weather data: ", jqXHR.responseJSON || jqXHR.statusText);
        $("#today").empty().text("Error fetching weather data. Please try another city.");
        $("#forecast").empty();
    });
}
