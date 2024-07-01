from flask import Flask, jsonify, request
from flask_cors import CORS
import requests

app = Flask(__name__)
CORS(app, origins='*')

@app.route('/api/countries', methods=['GET'])
def get_countries():
    try:
        response = requests.get("https://restcountries.com/v3.1/all")
        response.raise_for_status()  # Raise an exception for HTTP errors
        countries = [{"name": country['name']['common']} for country in response.json()]
        return jsonify(countries)
    except requests.RequestException as e:
        return jsonify({"error": str(e)}), 500

@app.route('/api/scholarships', methods=['GET'])
def get_scholarships():
    selected_country = request.args.get('selectedCountry')
    selected_degree = request.args.get('selectedDegree')
    api_key = request.args.get('apiKey')
    page = request.args.get('page', 1)
    
    try:
        response = requests.get("https://serpapi.com/search.json", params={
            "engine": "google",
            "q": f"{selected_degree} scholarships in {selected_country}",
            "api_key": api_key,
            "start": (int(page) - 1) * 10,
        })
        response.raise_for_status()  # Raise an exception for HTTP errors
        scholarships_data = response.json().get('scholarships_results', [])
        total_results = response.json().get('search_information', {}).get('total_results', 0)
        return jsonify({"scholarships": scholarships_data, "totalResults": total_results})
    except requests.RequestException as e:
        return jsonify({"error": str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True, port=8080)
