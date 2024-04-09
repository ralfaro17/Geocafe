# Project General data

*Repository for computational geometry project*

**Name:** Geocafe

**App type:** Web

**Objective:** teach concepts of computational geometry step by step

**Target public:** University students

**Technologies to use:** Django, CSS, HTML, JS, PostgreSQL, Vite

**Libraries:** font awesome, sweet alerts, bootstrap, threeJS

**Deploy and test:** Docker

**Project management tools:** Github, Trello

*Repository link:* https://github.com/Ralfaro17/Geocafe

*Trello workspace:* https://trello.com/invite/geocafe/ATTIc612a4419b64021c0b090e20b1853784A13253C2

**Wireframe:** Figma

*Figma project:* https://www.figma.com/file/RyBIoI5WYnmwkVVmJQdRic/Geocafe?type=design&node-id=0%3A1&mode=dev&t=MuRLlb0XElNuEwzh-1

**Language to teach:** C++

**Specifications:**
- Account system for users to save their progress
- 3D library use for frontend
- Light and dark mode view
- Level system based learning modules
- Code practices and examples
- Competitive code challenges
- Multiple choice test at the end of each level, or on different sections to advance to next one

# VScode extensions

These are the steps to install some recommended VScode extension to work with web technologies, improve programming experience and create better comments

1. Verify that you're in the **Geocafe** directory (with capital G)

2. You can check the extensions that will be installed by opening the **extensions.list** file

3. Execute the command `cat extensions.list |% { code --install-extension $_}` in the console

# Virtual environment

Virtual environments are a tool that python offers to install packages, modules and other dependencies of the language in an isolated folder, that when activated, let's you run a project with the version of the modules installed os the virtual environment, and not the ones installed globally in your system.
Virtual environments are useful when working with a group because these let you execute a program with the same versions of everything for everyone

### How to use a virtual environment

1. First of all, if you haven't installed the virtual environment package, execute the command `pip install venv`

2. Verify that you're in the **Geocafe** directory (with capital G)

3. Execute the command `Set-ExecutionPolicy Unrestricted -Scope Process` to ensure that windows allows the use of scripts and the activation of the environment, if it doesn't work, try any of the other methods in [this page](https://dev.to/shriekdj/python-venv-or-virtualenv-wont-activate-on-windows-3e2)

4. Execute the command `python -m venv venv` to create the virtual environment

5. Execute the command `venv/Scripts/activate` to activate the environment, you will know that you're using the environment when a green **(venv)** text appears at the left side of the directory you're at in the console

6. once activated, execute the command `pip install -r requirements.txt` to install the dependencies of the project

7. to deactivate the environment, you have to write `deactivate` and press enter in the console

# Node Packages

node packages are used mainly for JS scripts, that when installed, you can later import them inside the project in a similar way like with python, the node package modules we use for the project are:

- Bootstrap
- Sweet alerts
- Three.js
- vite
- sass

### Steps to install Node Packages

1. Make sure that you have installed node.js, if not, go to [this link](https://nodejs.org/en/download)

2. run the command `npm install` at the geocafe directory (the one of the project that also has the manage.py), this will install all the packages in the **node modules** directory.

3. just for good measure, execute the command `npm install vite -g`. this install vite globally, and allows to use some vite console commands

#  Vite

Vite is basically a tool that let's you bundle and compile many node packages into a single .js file ready for production. It also has a development mode, and we are going to use it for every .js file that requires a node package. since you already installed vite via `npm install`, the following info serves the purpose to explain the use that each vite file has.

> [For more info](https://vitejs.dev/guide/)

### Important files

- **vite.config.js:** this file contains instructions for vite for things like where to read .js files, where to output their compiled version, and some other thins, what is more important in here is the **build.rollupOptions.input**, in the input brackets is where you tell vite what JS file to read and later compile in the **assets** folder, to do that, you assign a unique key/name at the left, followed by a colon, and in the right side is where you specify the route for the JS file to read and compile, vite can also read and compile other type of files, but by now we only need the javascript ones (here it would be good to create a subfolder inside /js for each app we work with)

- **src:** this folder is the route of the vite project, here you write the javascript files for templates, then tell vite to read and compiled them with the steps above.

- **assets:** here is where the compiled javascript gets stored, it also contains a **manifest.json** file, this is to tell vite the details of each javascript file compiled, like the unique key you assigned in the **vite.config.js**, and also the name of their compiled version

### important commands

to work with vite, we also need to use some commands in the console, make sure to have already executed `npm install vite -g` and `Set-ExecutionPolicy Unrestricted -Scope Process`, if it was the first time you installed vite globally, and the commands are not recognized by the console, just close and reopen VScode

> these are essential for another steps in the Django-vite implementation section

1. `vite build`: this command compiles the files you write in the **build.rollupOptions.input** and outputs them in the *assets/assets* directory, along with the corresponding *manifest.json*

2. `npm run dev`: this command executes the vite default server to visualize, use, and load the not compiled versions of the javascript files inside **src/js/**

# Django-vite implementation

By default, Django doesn't offer a native or default implementation or support for vite, however, we are using a python module called `Django-vite` that makes it easier to implement Django with vite, this is done via some configurations in the settings.py that i marked with a comment to prevent that someone changes them. The steps to use Vite with Django are:

> [For more info](https://github.com/MrBin99/django-vite?tab=readme-ov-file#vitejs)

### For any mode (either production or development)

1. At the top of any template that uses Vite, write `{% load django_vite %}`, this is used to unlock some new Jinja features that the module integrates

2. To load a javascript file from the **src** folder (the one that vite uses and is mandatory for any JS file with packages), you write `{% vite_asset 'path_you_assigned_in_vite.config.js' %}`, this creates a script tag with type="module" in development mode, or loads the compiled version of the file if you're in production mode

### For development

1. Execute `python manage.py runserver` to run your Django server

2. Execute `npm run dev` in another console to run your Vite server

3. Once you've done the steps above, your app will run successfully (note that some errors might occur if you change a core configuration from Django **settings.py** or **vite.config.js**)

### For production

1. Execute `vite build` to compile every JS file

2. Execute `python manage.py collectstatic` to let Django collect every static dependency (including the compiled JS and manifest from Vite) to the **staticfiles** directory

3. go to **settings.py**, look for `DJANGO_VITE = { "default": { "dev_mode": True } }` and change it to False

4. Execute `python manage.py runserver` to run your Django server

5. Once you've done the steps above, your app will run successfully (note that some errors might occur if you change a core configuration from Django **settings.py** or **vite.config.js**)

# .env

> [For more info](https://pypi.org/project/python-dotenv/)

The .env file is a must for projects that contain sensitive information, such as API keys, passwords, secret values, and so on. So to solve this problem, it is a good practice to store all this info in the .env file, where you can later import and substitute an alias/variable in your code that contains the actual key and useful information. To store a value in the .env file you need to do the following:

`ALIAS=your_key`

### How to use .env and the data inside

1. Create a `.env` file in the same directory of the file that needs the keys (this is to make the process easier)

2. Write the key aliases and their values in the .env file (one alias and value per line)

3. `import os` and `from dotenv import load_dotenv`

4. Write `load_dotenv()` after you import it

5. use `os.getenv("ALIAS")` to get and substitute the value of the alias you assigned in your .env file

6. ***NEVER COMMIT THE .ENV FILE TO THE REPOSITORY***

# Database

A database is an organized collection of stored information, for this project we'll use **PostgreSQL** as our database service, it's worth mentioning that we're using a relational database, and many queries will be done by Django thanks to models and the ORM (Object Relational Mapping).

> [Django Models](https://docs.djangoproject.com/en/5.0/topics/db/queries/)

an ORM, in simple terms, is a tool that let's you translate a certain language, in this case being python, to SQL queries to the database service you're using, however, you can still use normal SQL with some extra steps, usually for very specific things.

> [Django ORM](https://opensource.com/article/17/11/django-orm)

### How to implement PostgreSQL in Django


Thanks to Django native PostgreSQL support, the only thing you have to do is to change some settings in you setting.py, specifically in the DATABASES section, where you have to place the next code:

```
DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.postgresql',
        'NAME': os.getenv('DB_NAME'),
        'USER': os.getenv('DB_USER'),
        'PASSWORD': os.getenv('DB_PASSWORD'),
    }
}
```

> [Demonstrative video](https://www.youtube.com/watch?v=unFGJhIvHU4&t=490s)

- **NAME:** Represents the name of the database

- **USER:** Represents the name of the user that owns the database

- **PASSWORD:** Represents the password of the use that owns the database

All these values must be stored inside your .env file, and after you've created the database and the user with pgadmin, and stored that information inside their respective alias in the .env file, to make changes effective inside the database you run:

1. `python manage.py makemigrations`

1. `python manage.py migrate`