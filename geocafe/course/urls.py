from django.urls import path
from django.conf.urls import handler404
from . import views

app_name = "course"

urlpatterns = [
    path("", views.index, name="index"),
    path("login", views.login_view, name="login"),
    path("logout", views.logout_view, name="logout"),
    path("delete-account", views.delete_account, name="delete_account"),
    path("register", views.register, name="register"),
    path("units", views.units, name="units"),
    path("delete-profile-picture", views.delete_profile_picture, name="delete_profile_picture"),
    path("insertions", views.insertions, name="insertions"),
    path("quiz", views.quiz, name="quiz"),
    path("get-user-files", views.get_user_files, name="get_user_files"),
    path("get-user-file", views.get_user_file, name="get_user_file"),
    path("save-user-file", views.save_user_file, name="save_user_file"),
    path("delete-user-file", views.delete_user_file, name="delete_user_file"),
    path("generate-new-image-url", views.generate_new_image_url, name="generate_new_image_url"),
    path("increment-unit", views.increment_unit, name="increment_unit"),
    path("code-editor", views.code_editor, name="code_editor"),
    path("topic/<int:id>", views.load_topic, name="topic"),
    path("accounts/settings", views.account_settings, name="account_settings"),
    path("accounts/<str:username>", views.user_page, name="user_page"),
]