from django.db import models
from django.contrib.auth.models import User
from turfs.models import Turf


class Booking(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, null=True, blank=True)
    turf = models.ForeignKey(Turf, on_delete=models.CASCADE)
    start_time = models.DateTimeField()
    end_time = models.DateTimeField()
    total_amount = models.DecimalField(max_digits=10, decimal_places=2)
    status = models.CharField(max_length=50, default='confirmed')

    def __str__(self):
        username = self.user.username if self.user else "Anonymous"
        return f"{username} - {self.turf.name}"
