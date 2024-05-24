from django.urls import path
from django.conf.urls import handler404
from course.views import error_404
from . import views

app_name = "course"

urlpatterns = [
    path("", views.index, name="index"),
    path("login", views.login_view, name="login"),
    path("logout", views.logout_view, name="logout"),
    path("register", views.register, name="register"),
    path("units", views.units, name="units"),
    path("topic/<int:id>", views.load_topic, name="topic"),
    path("accounts/<str:username>", views.user_page, name="user_page"),
]

handler404 = 'course.views.error_404'