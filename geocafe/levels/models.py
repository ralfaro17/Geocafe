from django.db import models
from django.contrib.auth.models import User

# Create your models here.
class Levels(models.Model):
    name= models.CharField(max_length=64)
    description = models.CharField(max_length=200)
    content = models.CharField(max_length=2000)
    
    def __str__(self):
        return f"{self.name} {self.description} {self.content}"

class UserLevel(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    level = models.ForeignKey(Levels, related_name='level', on_delete=models.CASCADE)

    def __str__(self):
        return f"{self.user} {self.level}"
