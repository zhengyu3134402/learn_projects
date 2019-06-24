from django.db import models
from django.contrib.auth.models import User


class Article(models.Model):

    content = models.CharField(max_length=500)
    publish_time = models.DateTimeField(auto_now_add=True)
    user = models.ForeignKey(to=User, on_delete=models.CASCADE, related_name="article")
    class Meta:
        db_table = "article"


class Comment(models.Model):
    comment_article = models.ForeignKey(Article, related_name="comment_article", null=True)
    comment_user = models.ForeignKey(User, related_name="comment_user", null=True)
    comment_content = models.CharField(max_length=200)

