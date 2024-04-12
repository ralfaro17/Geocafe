from django.urls import path
from . import views

APP_NAME = "levels"

urlpatterns = [
    path("", views.index, name="index")
]