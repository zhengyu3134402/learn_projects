from django.db import models
from django.contrib.auth.models import User

class Article(models.Model):

    content = models.CharField(max_length=500)
    publish_time = models.DateTimeField(auto_now_add=True)
    user = models.ForeignKey(to=User, on_delete=models.CASCADE, related_name="article")
    class Meta:
        db_table = "article"
