# -*- coding: utf-8 -*-
from models.module import Module
from main import app, db

app.app_context().push()
module_query = Module.query.all()
for module in module_query:
    db.session.delete(module)
m = Module("10001", "主页", "home", "/home", 1)
db.session.add(m)
m = Module("10002", "常用在线工具", "tool", "/tools", 2)
db.session.add(m)
m = Module("10003", "占位符2", "question", "/2", 3)
db.session.add(m)
m = Module("10004", "占位符3", "question", "/3", 4)
db.session.add(m)
m = Module("10005", "占位符4", "question", "/4", 5)

db.session.commit()