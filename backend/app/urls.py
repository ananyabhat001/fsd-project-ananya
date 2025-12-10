from django.contrib import admin
from django.urls import path, include
from rest_framework import routers
from companies.views import CompanyViewSet

router = routers.DefaultRouter()
router.register(r'companies', CompanyViewSet)

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/', include(router.urls)),
]
