

from itsdangerous import TimedJSONWebSignatureSerializer
from django.conf.global_settings import SECRET_KEY
from django.core.mail import send_mail


>>> s = TimedJSONWebSignatureSerializer(SECRET_KEY)
>>> code = s.dumps({"user_id": 1})
>>> code
>>> b'eyJhbGciOiJIUzUxMiIsImlhdCI6MTU2MDUxNjA5MiwiZXhwIjoxNTYwNTE5NjkyfQ.eyJ1c2VyX2lkIjoxfQ.wrvqWIn6jGwdX4YqRgYe2cZah0
    VFVAwEmwDv2lsp4nooOL0n2HpS-9oJT6AaEurZarZImYIqV2Rrq-X15KY0oA'
>>> s.loads(code)
>>> {'user_id': 1}


