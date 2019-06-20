import hashlib
from django.conf.global_settings import SECRET_KEY
from itsdangerous import TimedJSONWebSignatureSerializer
from django.contrib.auth.models import User


# def add_secret_to_password(password):
#     """对用户提供的密码进行加密"""
#     m = hashlib.md5(SECRET_KEY.encode('utf-8'))
#     m.update(password.encode('utf-8'))
#     se_password = m.hexdigest()
#     return se_password


def check_actice_code(code, username):
    """检查激活码是否正确"""
    user = User.objects.filter(username=username).first()

    if user:

        s = TimedJSONWebSignatureSerializer(SECRET_KEY)
        user_id = s.loads(code.encode('utf-8'))
        if user_id['user_id'] == user.id:
            return True, user

    return False

