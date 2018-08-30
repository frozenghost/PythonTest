from db_context import db
from flask_sqlalchemy import SQLAlchemy


class Module(db.Model):
    __tablename__ = 'modules'
    moduleid = db.Column(db.String(10), primary_key=True)
    modulename = db.Column(db.String(30), unique=True)
    moduleicontype = db.Column(db.String(10))
    moduleurl = db.Column(db.String(200), unique=True)
    sequence = db.Column(db.Integer)

    def __init__(self, moduleid, modulename, moduleicontype, moduleurl,
                 sequence):
        self.moduleid = moduleid
        self.modulename = modulename
        self.moduleicontype = moduleicontype
        self.moduleurl = moduleurl
        self.sequence = sequence

    def __repr__(self):
        return '<Module %r>' % self.moduleid