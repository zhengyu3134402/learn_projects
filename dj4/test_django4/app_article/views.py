from django.shortcuts import render, redirect, HttpResponse, reverse

# Create your views here.
from django.views import View
from django.utils.decorators import method_decorator
from django.contrib.auth.decorators import login_required
from .models import Article
from .auticle_form import ArticleContentForm, ArticleCommentForm
from django.contrib.auth.models import User
from libs.pagination import Pagination
from django.utils.safestring import mark_safe
from app_auth.models import Follower

class Index(View):
    """文章主页"""
    def get(self, request):
        current_page = request.GET.get("current_page", 1)
        articles = Article.objects.all().order_by("-publish_time")
        mk_user = True

        if not request.user.is_authenticated:
            mk_user = False

        a = Pagination('/app_article/', current_page, articles, 3, 11)
        p = mark_safe(a.make_html())
        show_data = a.make_start_end_data_list()


        return render(request, 'temp_article/index.html',
                      {"p":p, "articles": show_data, "mk_user":mk_user})

    @method_decorator(login_required)
    def post(self, request):
        a = ArticleContentForm(request.POST)
        user = request.user
        if a.is_valid():
            a.create_article(user)
        return redirect('app_article:index')


class UserArticles(View):
    """用户发过的所有文章列表"""
    def get(self, request, username):
        user = User.objects.filter(username=username).first()
        articles = Article.objects.filter(user=user).order_by("-publish_time")
        return render(request, 'temp_article/user_articles.html', {"articles":articles, "user_obj":user})

    def post(self, request):
        pass


class UserArticle(View):
    """用户发过的单个文章"""

    def get(self, request, article_id):

        article = Article.objects.filter(id=article_id).first()

        comment_list = article.comment_article.all()

        return render(request, 'temp_article/user_article.html', {"article":article,
                                                                  "comment_list": comment_list})


class ArticleManage(View):
    """用户管理文章"""

    @method_decorator(login_required)
    def get(self, request):
        user = User.objects.filter(username=request.user.username).first()
        print(user)
        if request.user == user:
            articles = user.article.all().order_by("-publish_time")
            current_page = request.GET.get("current_page")
            a = Pagination('', current_page, articles, 3, 11)
            p = mark_safe(a.make_html())
            show_data = a.make_start_end_data_list()

            return render(request, 'temp_article/article_manage.html', {"articles":show_data, "p":p})
        return redirect("app_article:index")


class ArticleEdit(View):
    """编辑文章"""

    @method_decorator(login_required)
    def get(self, request, id, username):

        article = Article.objects.filter(id=id).first()
        user = User.objects.filter(username=username).first()
        if user == request.user:
            return render(request, 'temp_article/article_edit.html', {"article": article})
        return HttpResponse('haha')

    @method_decorator(login_required)
    def post(self, request):

        a = ArticleContentForm(request.POST)
        user = request.POST.get("username")

        if a.is_valid() and user == request.user.username:
            a.update_article(request.POST.get("article_id"))
            return redirect("app_article:article_manage", "zhengyu")
        return HttpResponse("认证不成功")


class FollowedUserArticleList(View):
    """用户关注用户的文章列表"""
    @method_decorator(login_required)
    def get(self, request):
        user = request.user

        followed_user_list = Follower.objects.filter(be_followed=user).values_list("followed__username")
        # print(followed_user_list)

        users_list = []
        for username in followed_user_list:
            user_obj = User.objects.filter(username=username[0]).first()
            users_list.append(user_obj)

        return render(request, 'temp_article/followed_user_article_list.html', {"users_list":users_list})


class ArticleComment(View):
    """文章评论"""

    @method_decorator(login_required)
    def post(self, request):
        article_id = request.POST.get("id")

        article_comment = request.POST.get("comment")

        article = Article.objects.filter(id=int(article_id)).first()

        a = ArticleCommentForm(request.POST)
        if a.is_valid() and article:
            a.save_comment(article, request.user, article_comment)
            return HttpResponse('评论完毕')
        return HttpResponse('评论验证不成功')