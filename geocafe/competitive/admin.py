from django.contrib import admin
from .models import CodeProblem, Comments, Submissions

# Register your models here.
admin.site.register(CodeProblem)
admin.site.register(Submissions)
admin.site.register(Comments)