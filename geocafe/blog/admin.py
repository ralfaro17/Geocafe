from django.contrib import admin
from .models import Users, Ranking, Comments

# Register your models here.
admin.site.register(Users)
admin.site.register(Ranking)
admin.site.register(Comments)