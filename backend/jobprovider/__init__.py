# -*- coding: utf-8 -*-
from flask import render_template, Blueprint, url_for, request, abort, jsonify
from common import privateKey
from common.encrypt import rsa_long_decrypt
from models.user import User
from models.job import Job
from common.alchemy_encoder import AlchemyEncoder
from datetime import datetime
import json
import base64
import rsa

# 主要入口
job = Blueprint(
    "JobProvider",
    __name__,
    template_folder="..\\templates",
    static_folder="..\\static",
    static_url_path="/backend/static")

# 获取模块
@job.route('/api/jobs/<int:page_index>/<int:page_size>', methods=['GET'])
def GetModules(page_index, page_size):
    job_query = Job.query.order_by(Job.downloaddate.desc()).paginate(page_index, per_page=page_size)
    result = []
    for job in job_query.items:
        result.append(job)
    return json.dumps(result, cls=AlchemyEncoder, ensure_ascii=False)


    
