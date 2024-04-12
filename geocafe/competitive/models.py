from django.db import models
from django.contrib.auth.models import User

# Create your models here.
class CodeProblem(models.Model):
    name = models.CharField(max_length=64)
    description = models.CharField(max_length=200)
    difficulty = models.PositiveIntegerField()

    def __str__(self):
        return f"{self.name} {self.description} {self.difficulty}"

class Comments(models.Model):
    content = models.CharField(512)
    problem = models.ForeignKey(CodeProblem, on_delete=models.CASCADE)
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    time = models.DateTimeField()

    def __str__(self):
        return f"{self.content} {self.problem} {self.user} {self.time}"

class Submissions(models.Model):
    is_correct = models.BooleanField()
    code_content = models.CharField(max_length=2000)
    execution_time = models.PositiveIntegerField()
    user = models.ManyToManyField(User, related_name="submission_user")

    def __str__(self):
        return f"{self.is_correct} {self.code_content} {self.execution_time}"