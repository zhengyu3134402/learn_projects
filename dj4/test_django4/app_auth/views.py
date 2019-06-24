from django.shortcuts import render,HttpResponse,redirect,reverse
from django.views import View
from .auth_forms import RegisterForm, LoginForm, ChangePasswordForm, ResetPasswordForm
from .auth_forms import ResetPasswordRForm, ChangeEmailForm, UserEditForm
from .libs import check_actice_code
from django.contrib.auth.decorators import login_required
from django.utils.decorators import method_decorator
from django.contrib.auth.models import User
from .models import Follower

from django.contrib.auth import login, logout
from django.db.utils import IntegrityError


class Index(View):
    """用户主页可跳转登录和注册页面"""
    def get(self, request):
        return render(request, 'temp_auth/index.html')


class Login(View):
    """用户登录页面"""
    def get(self, request):
        return render(request, 'temp_auth/login.html')

    def post(self, request):
        a = LoginForm(request.POST)
        if a.is_valid():

            login(request, a.cleaned_data[1])

            return render(request, 'temp_auth/login.html')
        return HttpResponse('登录失败')


class Register(View):
    """用户注册页面"""
    def get(self, request):
        return render(request, "temp_auth/register.html")

    def post(self, request):
        a = RegisterForm(request.POST)
        if a.is_valid():
            user = a.create_user()
            code = a.make_code(user)
            a.to_mail(user, code)

        return HttpResponse('haha')


class MemberActive(View):
    """激活用户为成员"""


    def get(self, request):
        username = request.GET.get('username')
        code = request.GET.get('code')

        check, user = check_actice_code(code, username)
        if check:
            user.is_staff = 1
            user.save()
            return HttpResponse('激活成功')
        return HttpResponse('验证未成功')


class Logout(View):
    """退出登录"""
    def get(self, request):
        logout(request)
        return render(request, 'temp_auth/login.html')


class ChangePassword(View):
    """修改用户密码"""

    @method_decorator(login_required)
    def get(self, request):
        return render(request, 'temp_auth/change_password.html')

    @method_decorator(login_required)
    def post(self, request):
        a = ChangePasswordForm(request.POST)
        if a.is_valid() and a.ms_password(request.user):
            request.user.set_password(a.cleaned_data['new_password'])
            request.user.save()
            logout(request)
            return redirect('app_auth:login')
        return redirect('app_auth:login')


class ResetPassword(View):
    """用户忘记密码重置密码"""
    def get(self, request):
        return render(request, 'temp_auth/reset_password.html')

    def post(self, request):

        a = ResetPasswordForm(request.POST)
        if a.is_valid():
            _, user = a.cleaned_data
            code = a.make_code(user)
            a.to_mail(user, code)
            return HttpResponse('已发送邮箱请点击邮箱连接进行密码重置')
        return HttpResponse('11')


class ResetPasswordR(View):
    """重置密码页面"""
    def get(self, request):
        code = request.GET.get("code")
        username = request.GET.get("username")
        if check_actice_code(code, username):
            return render(request, 'temp_auth/reset_password_r.html',{"username":username})
        return HttpResponse('您的验证码过期')
    def post(self, request):

        a = ResetPasswordRForm(request.POST)
        if a.is_valid():
            data, user = a.cleaned_data
            user.set_password(data['password'])
            user.save()
            return HttpResponse("密码设置完毕，请登录账户")
        return HttpResponse("密码格式有误不能重置密码")


class ChangeEmail(View):
    """用户修改邮箱"""
    @method_decorator(login_required)
    def get(self, request):
        return render(request, 'temp_auth/change_email.html')

    @method_decorator(login_required)
    def post(self, request):
        a = ChangeEmailForm(request.POST)
        if a.is_valid():
            data, user = a.cleaned_data
            print(data)
            user.email = data['new_email']
            user.save()
            return HttpResponse('已经重新设置了邮箱')
        return HttpResponse('验证失败无法重置邮箱')


class UserEdit(View):
    """普通用户编辑个人信息页面"""

    @method_decorator(login_required)
    def get(self, request):
        user = User.objects.filter(username=request.user.username).first()
        return render(request, 'temp_auth/user_edit.html', {"user_obj":user})

    @method_decorator(login_required)
    def post(self, request):

        a = UserEditForm(request.POST)
        if a.is_valid():
            request.user.userinfo.phone = a.cleaned_data['phone']
            request.user.userinfo.address = a.cleaned_data['address']
            request.user.userinfo.about_me = a.cleaned_data['about_me']
            request.user.save()
            return HttpResponse('添加内容完毕')
        return HttpResponse('输入信息有误，验证不正确')


class UserFollowed(View):
    """用户关注"""
    @method_decorator(login_required)
    def get(self, request, username):


        be_followed = User.objects.filter(username=username).first()
        followed = User.objects.filter(username=request.user.username).first()

        try:
            Follower.objects.create(followed=followed, be_followed=be_followed)
        except IntegrityError:
            return HttpResponse('您已经关注过他了')
        # print(followed)
        # print(be_followed)



        return HttpResponse('关注完毕')


class FollowerList(View):
    """用户关注和被关注用户列表"""
    def get(self, request, username, follow):
        print(follow)
        print(type(follow))
        user = User.objects.filter(username=username).first()
        if follow == "1":
            follow_list = Follower.objects.filter(followed=user).values_list("be_followed__username")
            return render(request, 'temp_auth/follower_list.html', {"follow_list": follow_list})
        elif follow == "0":
            be_follow_list = Follower.objects.filter(be_followed=user).values_list("followed__username")
            return render(request, 'temp_auth/follower_list.html', {"be_follow_list": be_follow_list})
        else:
            return HttpResponse('查无此人')








