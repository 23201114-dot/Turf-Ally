"""
URL configuration for turfally project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/6.0/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path, include
from django.http import HttpResponse
from rest_framework.routers import DefaultRouter
from turfs.views import TurfViewSet, VenueViewSet
from bookings.views import BookingViewSet
from accounts.views import AthleteProfileViewSet, UserViewSet, RegisterView
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView

router = DefaultRouter()
router.register(r'turfs', TurfViewSet, basename='turfs')
router.register(r'venues', VenueViewSet, basename='venues')
router.register(r'bookings', BookingViewSet, basename='bookings')
router.register(r'athlete-profiles', AthleteProfileViewSet, basename='athlete-profiles')
router.register(r'users', UserViewSet, basename='users')


def home(request):
    return HttpResponse("Welcome to TurfAlly API. Go to /api/ for endpoints.")


urlpatterns = [
    path('', home, name='home'),
    path('admin/', admin.site.urls),
    path('api/', include(router.urls)),
    path('api/token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('api/token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('api/register/', RegisterView.as_view(), name='register'),
]
