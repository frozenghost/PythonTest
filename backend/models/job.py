from db_context import db
from flask_sqlalchemy import SQLAlchemy
from datetime import datetime
from werkzeug.security import generate_password_hash, check_password_hash


class Job(db.Model):
    __tablename__ = 'jobs'
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(200), nullable=False)
    company = db.Column(db.String(200), nullable=False)
    area = db.Column(db.String(200), nullable=False)
    salary = db.Column(db.String(200))
    publishdate = db.Column(db.String(200), nullable=False)
    link = db.Column(db.String(200), unique=True)
    source = db.Column(db.String(200), nullable=False)
    downloaddate = db.Column(db.DateTime, nullable=False)

    def __init__(self,
                 name,
                 company,
                 area,
                 salary,
                 publishdate,
                 link,
                 source,
                 downloaddate=datetime.now()):
        self.name = name
        self.company = company
        self.area = area
        self.salary = salary
        self.publishdate = publishdate
        self.link = link
        self.source = source

    def __repr__(self):
        return '<Job %r>' % self.name
