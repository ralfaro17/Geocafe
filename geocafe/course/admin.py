from django.contrib import admin
from .models import Units,  UserProgress, Topics

# Register your models here.
admin.site.register(Units)
admin.site.register(Topics)
admin.site.register(UserProgress)