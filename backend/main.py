# -*- coding: utf-8 -*-
from flask import Flask, render_template, g, session
from flask_cors import CORS
from flask_script import Manager
from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate, MigrateCommand
from db_context import db
from config import config


def creat_app(config_name='dev'):
    """初始化APP
    
    Keyword Arguments:
        config_name {str} -- 配置文件名 (default: {'dev'})
    
    Returns:
        Flask -- 返回入口

    """

    app = Flask(
        __name__,
        template_folder="templates",
        static_folder="static",
        static_url_path="/backend/static")
    # 防止跨域攻击
    CORS(app)
    # 注册蓝图
    from mainentry import main
    app.register_blueprint(main)
    from jobprovider import job
    app.register_blueprint(job)
    app.config.from_object(config[config_name])
    return app

app = creat_app()
db.init_app(app)

if __name__ == '__main__':
    app.run(port=10000)
