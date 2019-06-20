
from django import forms
from .models import Article

class ArticleContentForm(forms.Form):

    content = forms.CharField(max_length=500)

    def create_article(self, user):
        Article.objects.create(content=self.cleaned_data['content'],
                               user=user)


    def update_article(self, id):
        article_obj = Article.objects.filter(id=id).first()

        a = Article.objects.filter(publish_time=article_obj.publish_time)
        a.update(content=self.cleaned_data["content"])



