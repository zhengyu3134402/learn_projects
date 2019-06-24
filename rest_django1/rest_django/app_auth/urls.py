from django.conf.urls import url
from . import views


app_name = 'app_auth'

urlpatterns = [
    url('^$', views.AuthIndex.as_view(), name="auth_index"),

]