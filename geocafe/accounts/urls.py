from django.urls import path
from . import views

APP_NAME = "accounts"

urlpatterns = [
    path("", views.index, name="index")
]