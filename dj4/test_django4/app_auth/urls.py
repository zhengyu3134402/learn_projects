from django.conf.urls import url

from . import views
app_name = "app_auth"
urlpatterns = [

    url(r'^$', views.Index.as_view(), name="index"),
    url(r'^login/$', views.Login.as_view(), name="login"),
    url(r'^register/$', views.Register.as_view(), name="register"),
    url(r'^member_active/$', views.MemberActive.as_view(), name="member_actice"),
    url(r'^logout/$', views.Logout.as_view(), name="logout"),
    url(r'^change_password/$', views.ChangePassword.as_view(), name="change_password"),
    url(r'^reset_password/$', views.ResetPassword.as_view(), name="reset_password"),
    url(r'^reset_password_r/$', views.ResetPasswordR.as_view(), name="reset_password_r"),
    url(r'^change_email/$', views.ChangeEmail.as_view(), name="change_email"),
    url(r'^user_edit/$', views.UserEdit.as_view(), name="user_edit"),




]








