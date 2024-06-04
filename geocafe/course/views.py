from django.shortcuts import render, redirect
from django.urls import reverse
from django.http import Http404
from django.contrib.auth import login, logout, authenticate
from django.contrib.auth.decorators import login_required
from django.contrib.auth.models import User
from .models import Units, Topics, Badges, UserProgress
from .aws_s3  import get_image, delete_image, upload_image
from .unit_helpers import Insertions

# Create your views here.
def index(request):
    return render(request, "course/index.html")

def insertions(request):
    if request.user.is_superuser:
        Insertions.insert_unit_1()
        Insertions.insert_topic_1_unit_1()

    return redirect(reverse("course:index"))

def login_view(request):
    if request.method == "POST":
        username = request.POST["username"]
        password = request.POST["password"]
        user = authenticate(request, username=username, password=password)
        
        if user is not None:
            login(request, user)
            return redirect(reverse("course:index"))
        else:
            return render(request, "course/login.html", {
                "error_message": "invalid username or password",
                "previous_data": {
                    "username": username,
                    "password": password
                    }
            })
        
    return render(request,"course/login.html")

@login_required
def logout_view(request):
    logout(request)
    return redirect(reverse("course:index"))

def register(request):
    if request.method == "POST":
        username = request.POST["username"]
        password = request.POST["password"]
        confirm_password = request.POST["confirm_password"]
        email = request.POST["email"]
        first_name = request.POST["first_name"]
        last_name = request.POST["last_name"]
        data = {
            "username": username,
            "password": password,
            "confirm_password": confirm_password,
            "email": email,
            "first_name": first_name,
            "last_name": last_name
            } 

        if password != confirm_password:
            return render(request, "course/register.html", {
                "error_message": "Passwords don't match",
                "previous_data": data
            })
        
        try:
            user = User.objects.create_user(username=username, email=email, password=password, first_name=first_name, last_name=last_name)
            user_progress = UserProgress.objects.create(user=user, unit=1, topic=1)
        except Exception as e:
            return render(request, "course/register.html", {
                "error_message": "Username already taken",
                "previous_data": data, 
            })
        login(request, user)
        return redirect(reverse("course:index"))

    return render(request, "course/register.html")

def user_page(request, username):
    try:
        user = User.objects.get(username=username)
        try:
            badges = Badges.objects.filter(user=user)
        except:
            badges = False
        progress = UserProgress.objects.get(user=user)
        units = Units.objects.filter(level__lte=progress.unit.level)
        profile_picture = get_image(user.username)
    except User.DoesNotExist:
        raise Http404("User does not exist")
    return render(request, "course/user_page.html", {
        "user": user,
        "profile_picture": profile_picture[1] if profile_picture[0] else False,
        "badges": badges,
        "progress": units,
        })

def units(request):
    try:
        units = Units.objects.all()
        topics = Topics.objects.all()
    except:
        raise Http404("Unexpected error")
    return render(request, "course/units.html", {
        "units": units,
        "topics": topics,
    })

def load_topic(request, id):
    try:
        topic = Topics.objects.get(id=id)
    except:
        raise Http404("The topic does not exist")
    return render(request, "course/topic.html", { "topic": topic })

@login_required
def account_settings(request):
    profile_picture = get_image(request.user.username)
    if request.method == "POST":
        user = User.objects.get(id=request.user.id)
        user.first_name = request.POST["first_name"]
        user.last_name = request.POST["last_name"]
        user.email = request.POST["email"]
        if request.POST["password"]:
            user.set_password(request.POST["password"])
        # print(request.FILES) to see the submitted files
        if "new_profile_picture" in request.FILES:
            pfp = upload_image(user.username, request.FILES["new_profile_picture"])
        user.save()
        return redirect(reverse("course:user_page", args=[user.username]))
    if profile_picture[0]:
        return render(request, "course/account_settings.html", {
            "profile_picture": profile_picture[1]
        })
    else:
        return render(request, "course/account_settings.html")