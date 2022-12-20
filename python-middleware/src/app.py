from flask import Flask, request, jsonify, abort
from faker import Faker
from settings import USER_SERVICE_URL
import requests
import names
from flask_cors import CORS



fake = Faker()

app = Flask(__name__)
CORS(app)
cors = CORS(app, resource={
    r"/*":{
        "origins":"*"
    }
})

@app.route("/", methods=["GET"])
def home():
    return "Welcome to python middleware"

@app.route("/generate-users", methods=["POST"])
def add_users():
    count = request.get_json()["count"]

    if not str(count).isdigit():
        abort(400)

    requestBody = []

    """

    Batching the requests reduced latency by a factor of 10
    unbatched 200 users generated: 2.95 seconds
    Batched 200 users generated: 285 milliseconds

    """
    for i in range(count):
        # fake_name = fake.name().split(" ")
        # name = fake_name[0]
        # surName = fake_name[1]
        # requestBody.append({"name":name,"surName":surName})
        requestBody.append({"name":names.get_first_name(),"surName":names.get_last_name()})

    response = requests.post(USER_SERVICE_URL, json=requestBody)

    if(response.status_code != 200):
        return jsonify(response.json)

    return (response.content)


@app.errorhandler(404)
def not_found(error):
    return (
        jsonify({"success": False, "error": 404, "message": "resource not found"}),
        404,
    )

@app.errorhandler(400)
def bad_request(error):
    return jsonify({"success": False, "error": 400, "message": "bad request"}), 400

@app.errorhandler(405)
def not_allowed(error):
    return (
        jsonify({"success": False, "error": 405, "message": "method not allowed"}),
        405,
    )


if __name__ == "__main__":
    app.run(host='0.0.0.0')