
from django import forms
from .models import Article, Comment

class ArticleContentForm(forms.Form):

    content = forms.CharField(max_length=500)

    def create_article(self, user):
        Article.objects.create(content=self.cleaned_data['content'],
                               user=user)


    def update_article(self, id):
        article_obj = Article.objects.filter(id=id).first()

        a = Article.objects.filter(publish_time=article_obj.publish_time)
        a.update(content=self.cleaned_data["content"])



class ArticleCommentForm(forms.Form):

    comment = forms.CharField(max_length=200)

    def save_comment(self, article, comment_user, comment_content):


        Comment.objects.create(comment_article=article, comment_user=comment_user,
                               comment_content=comment_content)


