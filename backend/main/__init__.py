from flask import render_template, Blueprint, url_for
import json

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
    return json.dumps("hehe")
