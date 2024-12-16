from flask import Flask, request, jsonify, send_from_directory
import os
import requests

app = Flask(__name__, static_folder='../frontend', static_url_path='/')

@app.route('/debug')
def debug():
    return "Flask is running!"

# Route to serve the index.html file
@app.route('/')
def serve_index():
    return send_from_directory(app.static_folder, 'index.html')

# API route for weather data
@app.route('/api/weather', methods=['GET'])
def get_weather():
    city_name = request.args.get('city', 'London')

    try:
        # Step 1: Get geolocation
        geo_url = f"https://api.openweathermap.org/geo/1.0/direct?q={city_name}&limit=1&appid={os.getenv('OPENWEATHER_API_KEY')}"
        geo_response = requests.get(geo_url)
        geo_response.raise_for_status()
        geo_data = geo_response.json()
        
        if not geo_data: 
            return jsonify({"error": "City not found"}), 404

        lat, lon = geo_data[0]['lat'], geo_data[0]['lon']

        # Step 2: Get forecast data
        forecast_url = f"https://api.openweathermap.org/data/2.5/forecast?lat={lat}&lon={lon}&appid={os.getenv('OPENWEATHER_API_KEY')}"
        forecast_response = requests.get(forecast_url)
        forecast_response.raise_for_status()
        forecast_data = forecast_response.json()

        if not forecast_data.get("list") or len(forecast_data["list"]) == 0 or not forecast_data["list"][0].get("weather"):
            return jsonify({"error": "Incomplete forecast data received"}), 500

        # Step 3: Return processed data
        return jsonify({
            "cityName": geo_data[0]['name'],
            "forecastData": forecast_data
        })

    except requests.exceptions.RequestException as e:
        return jsonify({"error": "API request failed"}), 500

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000, debug=True)
