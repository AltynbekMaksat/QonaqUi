from django.urls import path
from . import views
from .views import HotelAPIView , UserAPIView

urlpatterns = [
    path('hotel/', views.HotelAPIView.as_view()),
    path('user/', views.UserAPIView.as_view()),

]