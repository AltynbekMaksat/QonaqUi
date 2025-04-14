from django.urls import path
from . import views
from .views import *

urlpatterns = [
    path('hotels/', views.HotelAPIView.as_view()),
    path('hotels/<int:pk>/', views.HotelAPIView.as_view()),

    path('user/', views.UserAPIView.as_view()),
    path('user/<int:pk>/', views.UserAPIView.as_view()),

    # Restaurant
    path('restaurants/', RestaurantAPIList.as_view()),
    path('restaurants/<int:pk>/', RestaurantAPIUpdate.as_view()),
    path('restaurants/delete/<int:pk>/', RestaurantAPIDestroy.as_view()),

    # Table
    path('tables/', TableAPIList.as_view()),
    path('tables/<int:pk>/', TableAPIUpdate.as_view()),
    path('tables/delete/<int:pk>/', TableAPIDestroy.as_view()),

    # Customer
    path('customers/', CustomerAPIList.as_view()),
    path('customers/<int:pk>/', CustomerAPIUpdate.as_view()),
    path('customers/delete/<int:pk>/', CustomerAPIDestroy.as_view()),

    # Manager
    path('managers/', ManagerAPIList.as_view()),
    path('managers/<int:pk>/', ManagerAPIUpdate.as_view()),
    path('managers/delete/<int:pk>/', ManagerAPIDestroy.as_view()),

    # ReservationHotel
    path('reservation-hotels/', ReservationHotelAPIList.as_view()),
    path('reservation-hotels/<int:pk>/', ReservationHotelAPIUpdate.as_view()),
    path('reservation-hotels/delete/<int:pk>/', ReservationHotelAPIDestroy.as_view()),

    # ReservationRest
    path('reservation-restaurants/', ReservationRestAPIList.as_view()),
    path('reservation-restaurants/<int:pk>/', ReservationRestAPIUpdate.as_view()),
    path('reservation-restaurants/delete/<int:pk>/', ReservationRestAPIDestroy.as_view()),
]