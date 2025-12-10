from pathlib import Path
import os
from dotenv import load_dotenv

load_dotenv()
BASE_DIR = Path(__file__).resolve().parent.parent

SECRET_KEY = "dev-secret"
DEBUG = True
ALLOWED_HOSTS = ['*']

# at top of settings.py (INSTALLED_APPS)
INSTALLED_APPS = [
    "corsheaders",           # << add this line
    "django.contrib.admin",
    "django.contrib.auth",
    "django.contrib.contenttypes",
    "django.contrib.sessions",
    "django.contrib.messages",
    "django.contrib.staticfiles",
    "rest_framework",
    "companies",
]

# near top of MIDDLEWARE: put cors middleware first (or at least before CommonMiddleware)
MIDDLEWARE = [
    "corsheaders.middleware.CorsMiddleware",   # << add this
    "django.middleware.security.SecurityMiddleware",
    "django.contrib.sessions.middleware.SessionMiddleware",
    "django.middleware.common.CommonMiddleware",
    "django.middleware.csrf.CsrfViewMiddleware",
    "django.contrib.auth.middleware.AuthenticationMiddleware",
    "django.contrib.messages.middleware.MessageMiddleware",
    "django.middleware.clickjacking.XFrameOptionsMiddleware",
]

# Add at bottom (dev-friendly)
CORS_ALLOWED_ORIGINS = [
    "http://localhost:5173",   # Vite dev server origin
]
# OR for quick dev testing only (less secure):
# CORS_ALLOW_ALL_ORIGINS = True


ROOT_URLCONF = 'app.urls'

TEMPLATES = [{
    'BACKEND': 'django.template.backends.django.DjangoTemplates',
    'DIRS': [],
    'APP_DIRS': True,
    'OPTIONS': {'context_processors': [
        'django.template.context_processors.debug',
        'django.template.context_processors.request',
        'django.contrib.auth.context_processors.auth',
        'django.contrib.messages.context_processors.messages',
    ]},
}]

WSGI_APPLICATION = 'app.wsgi.application'

DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.postgresql',
        'NAME': 'postgres',
        'USER': 'postgres',
        'PASSWORD': 'root',
        'HOST': 'localhost',
        'PORT': '5432',
    }
}

STATIC_URL = 'static/'
