import os

BASEDIR = os.path.abspath(os.path.dirname(__file__))


class Config:
    """配置类，包含了基本的flask设置
    """

    SECRET_KEY = 'V9jwR89yCOXvVBNQ'
    SQLALCHEMY_COMMIT_ON_TEARDOWN = True
    SQLALCHEMY_TRACK_MODIFICATIONS = True
    FLASKY_ADMIN = os.environ.get('FLASKY_ADMIN')

    FLASKY_MAIL_SENDED = 'jianghan@julanling.com'  # 发件人地址
    FLASKY_MAIL_SUBJECT_PREFIX = '[Flasky]'  # 邮件主题前缀

    SQLALCHEMY_DATABASE_URI = ''


class DevConfig(Config):
    SQLALCHEMY_DATABASE_URI = 'mysql+pymysql://flask:flask@localhost/flask' # 开发使用的数据库


config = {'dev': DevConfig, 'default': DevConfig}
