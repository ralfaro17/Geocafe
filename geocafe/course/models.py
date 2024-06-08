from django.db import models
from django.contrib.auth.models import AbstractUser
from django.db.models.signals import pre_save
from django.dispatch import receiver
from django.core.exceptions import ObjectDoesNotExist

# Create your models here.


class Units(models.Model):
    name= models.TextField()
    description = models.TextField()
    level = models.IntegerField(unique=True)
    
    def __str__(self):
        return f"{self.name} {self.description}"

class Topics(models.Model):
    unit = models.ForeignKey(Units, related_name='topic_unit', on_delete=models.CASCADE)
    name = models.TextField()
    content = models.TextField()
    
    def __str__(self):
        return f"{self.unit} {self.name} {self.content}" 


class User(AbstractUser):
    has_profile_picture = models.BooleanField(default=False)    
    unit = models.ForeignKey(Units, related_name='user_unit', on_delete=models.CASCADE, null=True, blank=True)


class Badges(models.Model):
    name = models.CharField(max_length=64)
    description = models.CharField(max_length=128)
    user = models.ManyToManyField(User, related_name="badges_user")

    def __str__(self):
        return f"{self.name} {self.description}"

@receiver(pre_save, sender=User)
def set_default_unit_and_topic(sender, instance, **kwargs):
    if instance.unit is None:
        try:
            instance.unit = Units.objects.get(level=1)
        except ObjectDoesNotExist:
            instance.unit = None