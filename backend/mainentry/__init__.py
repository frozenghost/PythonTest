# -*- coding: utf-8 -*-
from flask import render_template, Blueprint, url_for, request, abort, jsonify
from common import privateKey
from common.encrypt import rsa_long_decrypt
from models.user import User
from datetime import datetime
import json
import base64
import rsa

# 主要入口
main = Blueprint(
    "Main",
    __name__,
    template_folder="..\\templates",
    static_folder="..\\static",
    static_url_path="/backend/static")

# 路由交给react控制，始终渲染一个页面
@main.route('/', defaults={'path': ''})
@main.route('/<path:path>')
def index(path):
    return render_template('index.html')

# 登录接口，返回登录结果
@main.route('/api/LoginAction', methods=['POST'])
def LoginAction():
    data = base64.decodestring(request.data)
    target = rsa_long_decrypt(privateKey, data)
    print(target)
    user_dict = json.loads(target)
    user_query = User.query.filter(User.username == user_dict["username"]).first()
    if(user_query is not None and User.CheckPassword(user_query.password, user_dict["password"])):
        return jsonify(message="Success"), 200
    else:
        return jsonify(message="未找到该用户"), 404
    
