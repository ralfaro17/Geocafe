from django.db import models
from django.contrib.auth.models import User

# Create your models here.
class Badges(models.Model):
    name = models.CharField(max_length=64)
    description = models.CharField(max_length=128)
    user = models.ManyToManyField(User, related_name="badges_user")

    def __str__(self):
        return f"{self.name} {self.description}"
