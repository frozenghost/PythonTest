from flask import render_template, Blueprint, url_for, request
from common import privateKey
from common.encrypt import rsa_long_decrypt
import json
import base64
import rsa

main = Blueprint(
    "Main",
    __name__,
    template_folder="..\\templates",
    static_folder="..\\static",
    static_url_path="/backend/static")

@main.route('/')
def index():
    return render_template('index.html')

@main.route('/api/LoginAction', methods=['POST', 'GET'])
def LoginAction():
    data = base64.decodestring(request.data)
    print(data)
    target = rsa_long_decrypt(privateKey, data)
    return json.dumps(target)
