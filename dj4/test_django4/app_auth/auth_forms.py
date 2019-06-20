




from django import forms
from django.core.validators import RegexValidator
from django.core.exceptions import ValidationError
from django.contrib.auth.models import User
from itsdangerous import TimedJSONWebSignatureSerializer
from django.conf.global_settings import SECRET_KEY
from django.core.mail import send_mail


class RegisterForm(forms.Form):
    username = forms.CharField(validators=[RegexValidator(r'^\d|\w{6,12}$', '格式不对')])
    password = forms.CharField(validators=[RegexValidator(r'^\d|\w{6,12}$', '格式不对')])
    re_password = forms.CharField()
    email = forms.CharField(validators=[RegexValidator(r'^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$', '格式不对')])


    def clean(self):
        if self.cleaned_data['password'] != self.cleaned_data['re_password']:
            raise ValidationError('密码不一致')
        return self.cleaned_data

    def create_user(self):


        user = User.objects.create_user(username=self.cleaned_data['username'],
                            password=self.cleaned_data['password'],
                            email=self.cleaned_data['email'])
        return user

    def make_code(self, user):

        s = TimedJSONWebSignatureSerializer(SECRET_KEY)
        code = s.dumps({"user_id": user.id})
        return code

    def to_mail(self, user, code):

        url = "http://127.0.0.1:8000/app_auth/member_active/"
        path = "?code=%s&username=%s"%(code.decode('utf-8'), user.username)
        full_url = url+path
        send_mail('用户激活', "请点击%s"%full_url, "174927390@qq.com", [user.email])


class LoginForm(forms.Form):

    username = forms.CharField()
    password = forms.CharField()

    def clean(self):

        user = User.objects.filter(username=self.cleaned_data["username"]).first()
        if user and user.check_password(self.cleaned_data['password']):
            print(2222)
            return self.cleaned_data, user
        return False


class ChangePasswordForm(forms.Form):

    current_password = forms.CharField(validators=[RegexValidator(r'^\d|\w{6,12}$', '格式不对')])
    new_password = forms.CharField(validators=[RegexValidator(r'^\d|\w{6,12}$', '格式不对')])
    re_new_password = forms.CharField()

    def clean(self):

        if self.cleaned_data['new_password'] != self.cleaned_data['re_new_password']:
            return False
        return self.cleaned_data

    def ms_password(self, user):

        return user.check_password(self.cleaned_data['current_password'])


class ResetPasswordForm(forms.Form):

    email = forms.CharField(validators=[RegexValidator(r'^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$', '格式不对')])

    def clean(self):

        user = User.objects.filter(email=self.cleaned_data['email']).first()
        if user:
            return self.cleaned_data, user
        return None


    def make_code(self, user):

        s = TimedJSONWebSignatureSerializer(SECRET_KEY)
        code = s.dumps({"user_id": user.id})
        return code


    def to_mail(self, user, code):
        url = "http://127.0.0.1:8000/app_auth/reset_password_r/"
        path = "?code=%s&username=%s" % (code.decode('utf-8'), user.username)
        full_url = url + path
        send_mail('用户激活', "请点击%s" % full_url, "174927390@qq.com", [user.email])

class ResetPasswordRForm(forms.Form):

    username = forms.CharField()
    password = forms.CharField()
    re_password = forms.CharField()

    def clean(self):

        if self.cleaned_data['password'] != self.cleaned_data['re_password']:
            raise ValidationError('密码不一致')
        user = User.objects.filter(username=self.cleaned_data['username']).first()
        return self.cleaned_data, user


class ChangeEmailForm(forms.Form):

    current_email = forms.EmailField()
    new_email = forms.EmailField()

    def clean(self):

        user = User.objects.filter(email=self.cleaned_data['current_email']).first()
        if user:
            return self.cleaned_data, user
        raise ValidationError('邮箱不存在')



class UserEditForm(forms.Form):

    phone = forms.IntegerField(validators=[RegexValidator(r'\d{7,12}', '电话格式不正确')])
    address = forms.CharField(max_length=50)
    about_me = forms.CharField(max_length=500)



