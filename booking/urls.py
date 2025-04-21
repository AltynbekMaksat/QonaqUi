from django.urls import path
from . import views
from .views import *

urlpatterns = [
    path('hotels/', views.HotelAPIView.as_view()),
    path('hotels/<int:pk>/', views.HotelAPIView.as_view()),

    path('user/', views.UserAPIView.as_view()),
    path('user/<int:pk>/', views.UserAPIView.as_view()),

    # Restaurant
    path('restaurants/', restaurant_list_create),
    path('restaurants/<int:pk>/', restaurant_update),
    path('restaurants/<int:pk>/delete/', restaurant_delete),

    path('tables/', table_list_create),
    path('tables/<int:pk>/', table_update),
    path('tables/<int:pk>/delete/', table_delete),

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

    # Room booking process
    path('book-room/', BookRoomAPIView.as_view(), name='book-room'),
    path('approve-room/', ApproveRoomReservationAPIView.as_view(), name='approve-room'),
    path('cancel-room/', CancelRoomReservationAPIView.as_view(), name='cancel-room'),

    # Table booking process
    path('book-table/', BookTableAPIView.as_view(), name='book-table'),
    path('approve-table/', ApproveTableReservationAPIView.as_view(), name='approve-table'),
    path('cancel-table/', CancelTableReservationAPIView.as_view(), name='cancel-table'),
]