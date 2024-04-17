from django.urls import path
from . import views

app_name = "competitive"

urlpatterns = [
    path("", views.index, name="index")
]