from flask import Flask, jsonify
from pymongo import MongoClient
from flask_cors import CORS
import redis

app = Flask(__name__)
CORS(app, resources={r"/api/*": {"origins": "http://localhost:3000"}})


# MongoDB setup
client = MongoClient("mongodb://mongo:27017/")
db = client['test_db']
collection = db['test_collection']

# Redis setup
r = redis.Redis(host='redis', port=6379, db=0)

@app.route('/api/publish', methods=['GET'])
def publish_data():
    # Data to publish, this could be from DB or any dynamic content
    data = {"outfit": "Casual Look", "details": "T-shirt, Jeans, Sneakers"}
    
    # Publishing the message to Redis channel
    r.publish('outfit_channel', str(data))

    return jsonify({"message": "Data published to subscribers!"})

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000)
