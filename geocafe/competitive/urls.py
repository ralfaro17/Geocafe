from django.urls import path
from . import views

APP_NAME = "competitive"

urlpatterns = [
    path("", views.index, name="index")
]