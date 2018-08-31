from sqlalchemy.ext.declarative import DeclarativeMeta
from db_context import db
import json
import datetime
import decimal


class AlchemyEncoder(json.JSONEncoder):
    def default(self, obj):
        if isinstance(obj.__class__, DeclarativeMeta):
            # an SQLAlchemy class
            fields = {}
            for field in [
                    x for x in dir(obj)
                    if not x.startswith('_') and x != 'metadata'
            ]:
                data = obj.__getattribute__(field)
                try:
                    json.dumps(
                        data
                    )  # this will fail on non-encodable values, like other classes
                    fields[field] = data
                except TypeError:  # 添加了对datetime的处理
                    # print(type(data),data)
                    if isinstance(data, datetime.datetime):
                        fields[field] = data.strftime(
                            "%Y-%m-%d %H:%M:%S.%f"
                        )[:
                          -3]  #SQLserver数据库中毫秒是3位，日期格式;2015-05-12 11:13:58.543
                    elif isinstance(data, datetime.date):
                        fields[field] = datadata.strftime("%Y-%m-%d")
                    elif isinstance(data, decimal.Decimal):
                        fields[field] = float(data)
                    elif isinstance(data, db.Model):
                        fields[field] = default(self, data)
                    else:
                        fields[
                            field] = None  #如果是自定义类，递归调用解析JSON，这个是对象映射关系表 也加入到JSON
        # a json-encodable dict
            return fields

        return json.JSONEncoder.default(self, obj)
