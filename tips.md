1. pip下载速度慢， 使用如下命令：pip install -i https://pypi.tuna.tsinghua.edu.cn/simple flask-sqlalchemy
2. 在vs code中调试python flask后台代码时，务必不启用debug模式，否则将无法命中断点
3. 使用如下方式在loadable中传递父组件的方法
> var temp = { isLogin: this.isLogin.bind(this), ...props }
