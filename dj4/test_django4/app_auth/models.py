from django.db import models

from django.contrib.auth.models import AbstractUser


from django.db import models
from django.contrib.auth.models import User
# 引入内置信号
from django.db.models.signals import post_save
# 引入信号接收器的装饰器
from django.dispatch import receiver


# 用户扩展信息
class UserInfo(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE, related_name='userinfo')
    phone = models.CharField(max_length=20, blank=True)
    address = models.CharField(max_length=200, blank=True)
    about_me = models.TextField(max_length=500, blank=True)

    class Meta:
        db_table = "userinfo"

# 信号接收函数，每当新建 User 实例时自动调用
@receiver(post_save, sender=User)
def create_user_userinfo(sender, instance, created, **kwargs):
    if created:
        UserInfo.objects.create(user=instance)


# 信号接收函数，每当更新 User 实例时自动调用
@receiver(post_save, sender=User)
def save_user_profile(sender, instance, **kwargs):
    instance.userinfo.save()






