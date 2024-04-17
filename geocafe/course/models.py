from django.db import models
from django.contrib.auth.models import User

# Create your models here.
class Badges(models.Model):
    name = models.CharField(max_length=64)
    description = models.CharField(max_length=128)
    user = models.ManyToManyField(User, related_name="badges_user")

    def __str__(self):
        return f"{self.name} {self.description}"


class Units(models.Model):
    name= models.CharField(max_length=64)
    description = models.CharField(max_length=200)
    
    def __str__(self):
        return f"{self.name} {self.description}"

class Topics(models.Model):
    unit = models.ForeignKey(Units, related_name='topic_unit', on_delete=models.CASCADE)
    name = models.CharField(max_length=64)
    content = models.CharField(max_length=2000)
    
    def __str__(self):
        return f"{self.unit} {self.name} {self.content}" 

class UserProgress(models.Model):
    user = models.ForeignKey(User,  related_name="user_progress",on_delete=models.CASCADE)
    unit = models.ForeignKey(Units, related_name='user_unit', on_delete=models.CASCADE)
    topic = models.ForeignKey(Topics, related_name="user_topic", on_delete=models.CASCADE)

    def __str__(self):
        return f"{self.user} {self.unit} {self.topic}"
