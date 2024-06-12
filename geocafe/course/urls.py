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
    path("quiz", views.quiz, name="quiz"),
    path("generate-new-image-url", views.generate_new_image_url, name="generate_new_image_url"),
    path("increment-unit", views.increment_unit, name="increment_unit"),
    path("dos-test", views.dos_test, name="dos_test"),
    path("topic/<int:id>", views.load_topic, name="topic"),
    path("accounts/settings", views.account_settings, name="account_settings"),
    path("accounts/<str:username>", views.user_page, name="user_page"),
]