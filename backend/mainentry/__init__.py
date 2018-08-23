from flask import render_template, Blueprint, url_for, request
from common import privateKey
from common.encrypt import rsa_long_decrypt
from models.user import User
from datetime import datetime
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


@main.route('/api/LoginAction', methods=['POST'])
def LoginAction():
    data = base64.decodestring(request.data)
    target = rsa_long_decrypt(privateKey, data)
    print(target)
    user_dict = json.loads(target)
    user_query = User.query.filter(User.username == user_dict["username"]).first()
    if(user_query is not None):
        pass
    return json.dumps(target)
