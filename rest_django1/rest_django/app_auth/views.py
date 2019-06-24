from django.shortcuts import render, HttpResponse, redirect
from rest_framework.views import APIView
from rest_framework



class AuthIndex(APIView):
    """用户相关主页"""
    def get(self, request):

        return render(request, 'temp_app_auth/auth_index.html')


class AuthLogin(APIView):
    """用户登录"""
    def post(self):
        pass


class AuthRegister(APIView):
    """用户注册"""
    def post(self):
        pass
