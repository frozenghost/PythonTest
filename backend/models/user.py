from db_context import db
from flask_sqlalchemy import SQLAlchemy
from datetime import datetime
from werkzeug.security import generate_password_hash, check_password_hash

class User(db.Model):
    __tablename__ = 'users'
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(80), unique=True)
    email = db.Column(db.String(320), unique=True)
    password = db.Column(db.String(64), nullable=False)
    modifytime = db.Column(db.DateTime, nullable=False)
    createtime = db.Column(db.DateTime, nullable=False)
    mobile = db.Column(db.String(20), unique=True)
    internalname = db.Column(db.String(80), unique=True)


    def __init__(self, username, password, email, mobile, createtime=datetime.now(), modifytime=datetime.now()):
        self.password = generate_password_hash(password)
        self.username = username
        self.createtime = createtime
        self.mobile = mobile
        self.modifytime = modifytime
        self.email = email

    def __repr__(self):
        return '<User %r>' % self.username

    @staticmethod
    def CheckPassword(hash_password, password):
        return check_password_hash(hash_password, password)
