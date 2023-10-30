# import Flask to set up back-end to call ESPN API - front-end will call this back-end for score and game data
from flask import Flask, jsonify, request
from flask_cors import CORS
import requests

app = Flask(__name__)
CORS(app)  # This will enable CORS for all routes

# You can use this backend by making requests to /proxy
# and providing the target URL as a query parameter.
# For example:
# http://localhost:5000/proxy?url=http://yourapi.com/data
@app.route('/proxy', methods=['GET'])
def proxy():
    # Get the target URL from the query parameter
    url = 'http://site.api.espn.com/apis/site/v2/sports/football/college-football/scoreboard'
    target_url = request.args.get(url)

    if not target_url:
        return jsonify({'error': 'No URL provided'}), 400

    response = requests.get(target_url)

    return jsonify(response.json())


if __name__ == '__main__':
    app.run(debug=True)
