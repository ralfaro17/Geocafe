from django.urls import path
from . import views

APP_NAME = "course"

urlpatterns = [
    path("", views.index, name="index")
]