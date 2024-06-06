from django.urls import path
from django.conf.urls import handler404
from . import views

app_name = "course"

urlpatterns = [
    path("", views.index, name="index"),
    path("login", views.login_view, name="login"),
    path("logout", views.logout_view, name="logout"),
    path("register", views.register, name="register"),
    path("units", views.units, name="units"),
    path("delete-profile-picture", views.delete_profile_picture, name="delete_profile_picture"),
    path("insertions", views.insertions, name="insertions"),
    path("topic/<int:id>", views.load_topic, name="topic"),
    path("accounts/settings", views.account_settings, name="account_settings"),
    path("accounts/<str:username>", views.user_page, name="user_page"),
]