from django.db import models


class Venue(models.Model):
    name = models.CharField(max_length=255)
    location = models.CharField(max_length=255)

    def __str__(self):
        return self.name


class Turf(models.Model):
    name = models.CharField(max_length=255)
    sport = models.CharField(max_length=100)
    hourly_rate = models.DecimalField(max_digits=10, decimal_places=2)
    venue = models.ForeignKey(Venue, related_name='turfs', on_delete=models.CASCADE, null=True, blank=True)

    def __str__(self):
        return self.name
