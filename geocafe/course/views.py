import json
from django.shortcuts import render, redirect
from django.urls import reverse
from django.http import Http404, JsonResponse
from django.contrib.auth import login, logout, authenticate
from django.contrib.auth.decorators import login_required
from .models import Units, Topics, Badges, User
from .aws_s3  import get_image, delete_image, upload_image, get_default_image
from .unit_helpers import Insertions

# Create your views here.
def index(request):
    return render(request, "course/index.html")

def insertions(request):
    if request.user.is_superuser:
        Insertions.insert_unit_1_full()
    else:
        raise Http404("You are not authorized to view this page")

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
            # user_progress = UserProgress.objects.create(user=user, unit=unit, topic=topic)
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
        # progress = UserProgress.objects.get(user=user)
        user = User.objects.get(username=username)
        units = Units.objects.filter(level__lte=user.unit.level)
        if user.has_profile_picture:
            profile_picture = get_image(user.username)
        else:
            profile_picture = (False, "the image does not exist")
    except User.DoesNotExist:
        raise Http404("User does not exist")
    return render(request, "course/user_page.html", {
        "user_requested": user,
        "profile_picture": profile_picture[1] if profile_picture[0] else False,
        "badges": badges,
        "progress": units,
        })

def units(request):
    if not request.user.is_authenticated:
        try:
            units = Units.objects.filter(level=1)
            topics = Topics.objects.filter(level__lte=3)
        except Exception as e:
            raise Http404(f"Unexpected error: {e}")
    else:
        try:
            user = User.objects.get(id=request.user.id)
            # progress = UserProgress.objects.get(user=request.user)
            units = Units.objects.filter(level__lte=user.unit.level)
            topics = Topics.objects.filter(level__lte=user.topic.level)
        except Exception as e:
            raise Http404(f"Unexpected error: {e}")
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

def quiz(request):
    return render(request,"course/quiz.html")


@login_required
def account_settings(request):
    if request.method == "POST":
        user = User.objects.get(id=request.user.id)
        user.first_name = request.POST["first_name"]
        user.last_name = request.POST["last_name"]
        user.email = request.POST["email"]
        if request.POST["password"]:
            user.set_password(request.POST["password"])
        if "new_profile_picture" in request.FILES:
            pfp = upload_image(user.username, request.FILES["new_profile_picture"])
            if pfp[0]:
                user.has_profile_picture = True
        user.save()
        return redirect(reverse("course:user_page", args=[user.username]))
    if request.user.has_profile_picture:
        profile_picture = get_image(request.user.username)
    else:
        profile_picture = (False, "the image does not exist")
    if profile_picture[0]:
        return render(request, "course/account_settings.html", {
            "profile_picture": profile_picture[1]
        })
    else:
        return render(request, "course/account_settings.html")

@login_required
def delete_profile_picture(request):
    if request.method == "POST":
        user = User.objects.get(id=request.user.id)
        user.has_profile_picture = False
        action = delete_image(request.user.username)
        if action[0]:
            return JsonResponse({"message": action[1]}, status = 200)
        else:
            return JsonResponse({"message": action[1]}, status = 400)
    else:
        return JsonResponse({"message": "Method not allowed"}, status = 405)