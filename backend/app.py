from flask import Flask, request, jsonify
from pymongo import MongoClient
from dotenv import load_dotenv
import os

load_dotenv()


app=Flask(__name__)


mongo_url = os.getenv("MONGODB_URL")
client = MongoClient(mongo_url)
db = client["customer"]
collection = db["customer_data"]
    
@app.route("/submit", methods=["POST"])
def submit_form():    
    data = request.json 
    collection.insert_one(data)
    print(data)
    return jsonify({
        "result":"data submitted successfull.."
    })


if __name__=="__main__":
    app.run(host='0.0.0.0',port=8000,debug=True)