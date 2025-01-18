from flask import Flask, request, jsonify
from pymongo import MongoClient
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

# MongoDB setup
client = MongoClient("mongodb://mongo:27017/")
db = client['test_db']
collection = db['test_collection']

@app.route('/api/data', methods=['POST'])
def handle_data():
    data = request.json.get('data')
    if not data:
        return jsonify({"error": "No data provided"}), 400

    collection.insert_one({"data": data})
    return jsonify({"message": "Data saved successfully!"})

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000)
