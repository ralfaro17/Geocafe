from django.contrib import admin
from django.contrib.auth.admin import UserAdmin
from .models import Units, Topics, User

# Register your models here.
admin.site.register(User, UserAdmin)
admin.site.register(Units)
admin.site.register(Topics)