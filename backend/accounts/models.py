from django.db import models
from django.contrib.auth.models import User

class AthleteProfile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    matches = models.IntegerField(default=0)
    win_rate = models.FloatField(default=0.0)
    mvp = models.IntegerField(default=0)
    member_type = models.CharField(max_length=50, default='Elite Member')

    def __str__(self):
        return self.user.username
