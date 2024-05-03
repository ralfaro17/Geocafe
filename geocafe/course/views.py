from django.shortcuts import render, redirect
from django.urls import reverse
from django.http import Http404
from django.contrib.auth import login, logout, authenticate
from django.contrib.auth.decorators import login_required
from django.contrib.auth.models import User

# Create your views here.
def index(request):
    return render(request, "course/index.html")

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
    except User.DoesNotExist:
        raise Http404("User does not exist")
    return render(request, "course/user_page.html", {"user": user})