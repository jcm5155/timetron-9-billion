from django.db import models
from django.utils import timezone
from django.contrib.auth.models import User
from django.core.validators import MinValueValidator

class TimeRoutine(models.Model):
    name = models.CharField(max_length=100)
    date_created = models.DateTimeField(default=timezone.now)
    author = models.ForeignKey(User, related_name="routines", on_delete=models.CASCADE)
    plays = models.IntegerField(default=0)
    order = models.CharField(max_length=500, default="")

    def __str__(self):
        return f"{self.name} by {self.author}."


class TimeSegment(models.Model):
    name = models.CharField(max_length=100)
    duration = models.IntegerField(validators=([MinValueValidator(1, "You have to enter a positive number.")]))
    parent = models.ForeignKey(TimeRoutine, related_name="segments", on_delete=models.CASCADE)

    def __str__(self):
        return f"{self.name} | dur: {self.duration}"