from django.db import models

# Create your models here.

class Users(models.Model):
    username = models.CharField(max_length = 64, blank=False, null=False)
    name = models.CharField(max_length = 64, blank=False, null=False)
    last_name = models.CharField(max_length = 64, blank=False, null=False)
    email = models.CharField(blank=True, null=True)
    password = models.CharField(blank=False, null=False)
    spanish_preference = models.BooleanField()
    active = models.BooleanField()
    dark_mode = models.BooleanField()
    level = models.SmallIntegerField()

    def __str__(self):
        return  f"{self.username} {self.name} {self.last_name} {self.email} {self.password} {self.spanish_preference} {self.dark_mode} {self.level}"

class Ranking(models.Model):
    execution_time = models.FloatField()
    user = models.ForeignKey(Users, on_delete = models.CASCADE)
    date = models.DateField()

    def __str__(self):
        return f"{self.execution_time} {self.user} {self.date}"


class Comments(models.Model):
    sender = models.ForeignKey(Users, on_delete = models.DO_NOTHING)
    problem = models.ForeignKey(Ranking, on_delete = models.DO_NOTHING)
    message = models.TextField()

    def __str__(self):
        return f"{self.sender} {self.problem} {self.message}"

