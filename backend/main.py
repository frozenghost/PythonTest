# -*- coding: utf-8 -*-
from flask import Flask, render_template, g, session
from flask_cors import CORS


def creat_app():
    app = Flask(
        __name__,
        template_folder="templates",
        static_folder="static",
        static_url_path="/backend/static")
    # 防止跨域攻击
    CORS(app)
    # 注册蓝图
    from main import main
    app.register_blueprint(main)
    app.config['SECRET_KEY'] = '...自己生成的秘钥'
    app.debug = True
    return app


app = creat_app()
if __name__ == '__main__':
    app.run(port=10000)
