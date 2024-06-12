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
    profile_picture_update = request.GET.get('profile_picture_update', None)
    print(profile_picture_update)
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
        "profile_picture_update": profile_picture_update,
        })


def units(request):
    if not request.user.is_authenticated:
        try:
            units = Units.objects.filter(level=1)
        except Exception as e:
            raise Http404(f"Unexpected error: {e}")
    else:
        try:
            user = User.objects.get(id=request.user.id)
            # progress = UserProgress.objects.get(user=request.user)
            units = Units.objects.filter(level__lte=user.unit.level)
        except Exception as e:
            raise Http404(f"Unexpected error: {e}")
    return render(request, "course/units.html", {
        "units": units,
    })


def load_topic(request, id):
    try:
        topic = Topics.objects.get(id=id)
    except:
        raise Http404("The topic does not exist")
    
    user = User.objects.get(id=request.user.id)
    if user.unit.level < topic.unit.level:
        raise Http404("You are not authorized to view this page")
    
    return render(request, "course/topic.html", { "topic": topic })


@login_required
def quiz(request):
    return render(request,"course/quiz.html")


@login_required
def account_settings(request):
    if request.method == "POST":
        user = User.objects.get(id=request.user.id)
        new_first_name = request.POST["first_name"]
        new_last_name = request.POST["last_name"]
        new_email = request.POST["email"]
        new_password = request.POST["password"]
        
        if new_first_name and new_first_name != user.first_name:
            user.first_name = new_first_name
        if new_last_name and new_last_name != user.last_name:
            user.last_name = new_last_name
        if new_email and new_email != user.email:
            user.email = new_email
        if new_password:
            user.set_password(new_password)
        if "new_profile_picture" in request.FILES:
            pfp = upload_image(user.username, request.FILES["new_profile_picture"])
            if pfp[0]:
                user.has_profile_picture = True
        user.save()
        url = reverse("course:user_page", kwargs={"username": user.username}) + f'?profile_picture_update={1}'
        return redirect(url)
    else:
        return render(request, "course/account_settings.html")


@login_required
def delete_profile_picture(request):
    if request.method == "POST":
        user = User.objects.get(id=request.user.id)
        user.has_profile_picture = False
        action = delete_image(request.user.username)
        if action[0]:
            user.save()
            return JsonResponse({"message": action[1]}, status = 200)
        else:
            return JsonResponse({"message": action[1]}, status = 400)
    else:
        return JsonResponse({"message": "Method not allowed"}, status = 405)


def increment_unit(request):
    if request.method == "POST":
        user = User.objects.get(id=request.user.id)
        try:
            user.unit = Units.objects.get(level=user.unit.level + 1)
            user.save()
            return JsonResponse({"message": "Unit incremented"}, status = 200)
        except:
            return JsonResponse({"message": "Unit not incremented"}, status = 400)
    else:
        return JsonResponse({"message": "Method not allowed"}, status = 405)


def dos_test(request):
    return render(request, "course/dos_test.html")

def generate_new_image_url(request):
    if request.method == "GET":
        if request.user.has_profile_picture:
            profile_picture = get_image(request.user.username)
        else:
            profile_picture = get_default_image()
        print(profile_picture)
        return JsonResponse({"url": profile_picture[1]}, status = 200)
    else:
        return JsonResponse({"message": "Method not allowed"}, status = 405)