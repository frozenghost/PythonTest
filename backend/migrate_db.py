# -*- coding: utf-8 -*-
from flask_script import Manager
from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate, MigrateCommand
from main import app, db
from models.user import User
from models.module import Module
from models.job import Job

"""数据库迁移脚本，用于更新表结构，请单独运行
    python migrate_db.py db migrate 收集变更并生成更新脚本

    python migrate_db.py db upgrade 确认并执行更新脚本

    python migrate_db.py db downgrade 回滚上一次更新
"""

migrate = Migrate(app, db)
manager = Manager(app)
manager.add_command('db', MigrateCommand)

manager.run()
