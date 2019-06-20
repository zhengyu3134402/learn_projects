from django.conf.urls import url
from . import views

app_name = "app_article"

urlpatterns = [


    url(r'^$', views.Index.as_view(), name="index"),
    url(r'^user_articles/(.*)/$', views.UserArticles.as_view(), name="user_articles"),
    url(r'^user_article/(\d+)/$', views.UserArticle.as_view(), name="user_article"),
    url(r'^article_manage/$', views.ArticleManage.as_view(), name="article_manage"),
    url(r'^article_edit/(?P<id>\d+)&(?P<username>.*)$', views.ArticleEdit.as_view(), name="article_edit"),
    url(r'^article_edit1/$', views.ArticleEdit.as_view(), name="article_edit1"),


]