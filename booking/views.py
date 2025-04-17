from django.forms import ValidationError
from django.http import HttpResponse
from django.shortcuts import render

# Create your views here.
from rest_framework.views import APIView
from rest_framework.response import Response
from .models import Hotel , User , Room
from .serializers import *
from rest_framework import status
from rest_framework import generics
from rest_framework.permissions import IsAuthenticated
from .services import (
    request_room_booking,
    request_table_booking,
    approve_room_reservation,
    approve_table_reservation,
    cancel_room_reservation,
    cancel_table_reservation,
)

class HotelAPIView(APIView):
    def get(self, request):
        hotels = Hotel.objects.all()
        return Response({'hotels': HotelSerializer(hotels, many=True).data})

    def post(self, request):
        serializer = HotelSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()

        return Response({'created': serializer.data})

    def put(self, request , *args , **kwargs ):
        pk = kwargs.get('pk', None)
        if not pk :
            return Response({'error': 'Method PUT not allowed'})
        try:
            instance = Hotel.objects.get(pk=pk)
        except:
            return Response({'error': 'Hotel not found'})
        serializer = HotelSerializer( data=request.data,instance=instance )
        if serializer.is_valid(raise_exception=True):
            serializer.save()
            return Response({'updated': serializer.data})

    def delete(self, request, *args, **kwargs):
        pk = kwargs.get('pk', None)
        if not pk:
            return Response({'error': 'Method DELETE not allowed'})
        try:
            hotel = Hotel.objects.get(pk=pk)
            hotel.delete()
            return Response({'deleted': f'Hotel with id {pk} deleted successfully'})
        except:
            return Response({'error': 'Hotel not found'})




# юзер
class UserAPIView(APIView):
    def get(self, request):
        users = User.objects.all()
        return Response({'users': UserSerializer(users, many=True).data})

    def post(self, request):
        serializer = UserSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response({'user': serializer.data}, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def put(self, request, *args, **kwargs):
        pk = kwargs.get('pk', None)
        if not pk:
            return Response({'error': 'Method PUT not allowed'})
        try:
            instance = User.objects.get(pk=pk)
        except :
            return Response({'error': 'User not found'})
        serializer = UserSerializer(data=request.data, instance=instance)
        if serializer.is_valid(raise_exception=True):
            serializer.save()
            return Response({'updated': serializer.data})

    def delete(self, request, *args, **kwargs):
        pk = kwargs.get('pk', None)
        if not pk:
            return Response({'error': 'Method DELETE not allowed'})
        try:
            user = User.objects.get(pk=pk)
            user.delete()
            return Response({'deleted': f'User with id {pk} deleted successfully'})
        except :
            return Response({'error': 'User not found'})



# для чайханы
class RestaurantAPIList(generics.ListCreateAPIView):
    queryset = Restaurant.objects.all()
    serializer_class = RestaurantSerializer

class RestaurantAPIUpdate(generics.RetrieveUpdateAPIView):
    queryset = Restaurant.objects.all()
    serializer_class = RestaurantSerializer

class RestaurantAPIDestroy(generics.RetrieveDestroyAPIView):
    queryset = Restaurant.objects.all()
    serializer_class = RestaurantSerializer




# --- Table ---
class TableAPIList(generics.ListCreateAPIView):
    queryset = Table.objects.all()
    serializer_class = TableSerializer

class TableAPIUpdate(generics.RetrieveUpdateAPIView):
    queryset = Table.objects.all()
    serializer_class = TableSerializer

class TableAPIDestroy(generics.RetrieveDestroyAPIView):
    queryset = Table.objects.all()
    serializer_class = TableSerializer




# --- Customer ---
class CustomerAPIList(generics.ListCreateAPIView):
    queryset = Customer.objects.all()
    serializer_class = CustomerSerializer

class CustomerAPIUpdate(generics.RetrieveUpdateAPIView):
    queryset = Customer.objects.all()
    serializer_class = CustomerSerializer

class CustomerAPIDestroy(generics.RetrieveDestroyAPIView):
    queryset = Customer.objects.all()
    serializer_class = CustomerSerializer



# --- Manager ---
class ManagerAPIList(generics.ListCreateAPIView):
    queryset = Manager.objects.all()
    serializer_class = ManagerSerializer

class ManagerAPIUpdate(generics.RetrieveUpdateAPIView):
    queryset = Manager.objects.all()
    serializer_class = ManagerSerializer

class ManagerAPIDestroy(generics.RetrieveDestroyAPIView):
    queryset = Manager.objects.all()
    serializer_class = ManagerSerializer



# --- ReservationHotel ---
class ReservationHotelAPIList(generics.ListCreateAPIView):
    queryset = ReservationHotel.objects.all()
    serializer_class = ReservationHotelSerializer

class ReservationHotelAPIUpdate(generics.RetrieveUpdateAPIView):
    queryset = ReservationHotel.objects.all()
    serializer_class = ReservationHotelSerializer

class ReservationHotelAPIDestroy(generics.RetrieveDestroyAPIView):
    queryset = ReservationHotel.objects.all()
    serializer_class = ReservationHotelSerializer



# --- ReservationRest ---
class ReservationRestAPIList(generics.ListCreateAPIView):
    queryset = ReservationRest.objects.all()
    serializer_class = ReservationRestSerializer

class ReservationRestAPIUpdate(generics.RetrieveUpdateAPIView):
    queryset = ReservationRest.objects.all()
    serializer_class = ReservationRestSerializer

class ReservationRestAPIDestroy(generics.RetrieveDestroyAPIView):
    queryset = ReservationRest.objects.all()
    serializer_class = ReservationRestSerializer

# --- Room booking, approving, & cancelling view ---
class BookRoomAPIView(APIView):
    def post(self, request):
        customer_id = request.data.get('customer_id')
        room_number = request.data.get('room_number')
        check_in = request.data.get('check_in')
        check_out = request.data.get('check_out')
        try:
            customer = Customer.objects.get(id=customer_id)
            room = Room.objects.get(room_number=room_number)
            reservation = request_room_booking(customer, room, check_in, check_out)
            return Response({'status': 'Reservation created', 'reservation_id': reservation.id})
        except Customer.DoesNotExist:
            return Response({'error': 'Customer not found'}, status=404)
        except Room.DoesNotExist:
            return Response({'error': 'Room not found'}, status=404)
        except ValidationError as e:
            return Response({'error': str(e)}, status=400)
        
class ApproveRoomReservationAPIView(APIView):
    def post(self, request):
        reservation_id = request.data.get('reservation_id')
        manager_id = request.data.get('manager_id')
        try:
            manager = Manager.objects.get(id=manager_id)
            approve_room_reservation(manager, reservation_id)
            return Response({'status': 'Reservation approved'})
        except Manager.DoesNotExist:
            return Response({'error': 'Manager not found'}, status=404)
        except ReservationHotel.DoesNotExist:
            return Response({'error': 'Reservation not found'}, status=404)
        except (ValidationError, PermissionError) as e:
            return Response({'error': str(e)}, status=400)
        
class CancelRoomReservationAPIView(APIView):
    def post(self, request):
        reservation_id = request.data.get('reservation_id')
        user_id = request.data.get('user_id')
        try:
            reservation = ReservationHotel.objects.get(id=reservation_id)
            user = User.objects.get(id=user_id)
            cancelled = cancel_room_reservation(reservation, user)
            return Response({'status': 'Reservation cancelled'})
        except ReservationHotel.DoesNotExist:
            return Response({'error': 'Reservation not found'}, status=404)
        except User.DoesNotExist:
            return Response({'error': 'User not found'}, status=404)
        except (ValidationError, PermissionError) as e:
            return Response({'error': str(e)}, status=400)
        
# --- Table booking, approving, & cancelling view ---
class BookTableAPIView(APIView):
    def post(self, request):
        customer_id = request.data.get('customer_id')
        number = request.data.get('number')
        check_in = request.data.get('check_in')
        check_out = request.data.get('check_out')
        try:
            customer = Customer.objects.get(id=customer_id)
            table = Table.objects.get(number=number)
            reservation = request_table_booking(customer, table, check_in, check_out)
            return Response({'status': 'Reservation created', 'reservation_id': reservation.id})
        except Customer.DoesNotExist:
            return Response({'error': 'Customer not found'}, status=404)
        except Room.DoesNotExist:
            return Response({'error': 'Room not found'}, status=404)
        except ValidationError as e:
            return Response({'error': str(e)}, status=400)
        
class ApproveTableReservationAPIView(APIView):
    def post(self, request):
        reservation_id = request.data.get('reservation_id')
        manager_id = request.data.get('manager_id')
        try:
            manager = Manager.objects.get(id=manager_id)
            approve_table_reservation(manager, reservation_id)
            return Response({'status': 'Reservation approved'})
        except Manager.DoesNotExist:
            return Response({'error': 'Manager not found'}, status=404)
        except ReservationRest.DoesNotExist:
            return Response({'error': 'Reservation not found'}, status=404)
        except (ValidationError, PermissionError) as e:
            return Response({'error': str(e)}, status=400)
        
class CancelTableReservationAPIView(APIView):
    def post(self, request):
        reservation_id = request.data.get('reservation_id')
        user_id = request.data.get('user_id')
        try:
            reservation = ReservationRest.objects.get(id=reservation_id)
            user = User.objects.get(id=user_id)
            cancelled = cancel_room_reservation(reservation, user)
            return Response({'status': 'Reservation cancelled'})
        except ReservationRest.DoesNotExist:
            return Response({'error': 'Reservation not found'}, status=404)
        except User.DoesNotExist:
            return Response({'error': 'User not found'}, status=404)
        except (ValidationError, PermissionError) as e:
            return Response({'error': str(e)}, status=400)