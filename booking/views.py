from datetime import datetime
from django.forms import ValidationError
from django.http import HttpResponse
from django.shortcuts import render
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from django.db.models import Sum, Q
from rest_framework.views import APIView
from rest_framework.response import Response
from .models import Hotel, User, Room
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
from geopy.distance import geodesic


class HotelAPIView(APIView):

    def get(self, request, *args, **kwargs):
        pk = kwargs.get('pk', None)
        if pk:
            try:
                hotel = Hotel.objects.get(pk=pk)
                return Response({'hotel': HotelSerializer(hotel).data})
            except Hotel.DoesNotExist:
                return Response({'error': 'Hotel not found'})
        else:
            hotels = Hotel.objects.all()
            return Response(
                {'hotels': HotelSerializer(hotels, many=True).data})

    def post(self, request):
        serializer = HotelSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response({'created': serializer.data})
        return Response({'error': serializer.errors})

    def put(self, request, *args, **kwargs):
        pk = kwargs.get('pk', None)
        if not pk:
            return Response({'error': 'Method PUT not allowed'})

        try:
            instance = Hotel.objects.get(pk=pk)
        except Hotel.DoesNotExist:
            return Response({'error': 'Hotel not found'})

        serializer = HotelSerializer(data=request.data, instance=instance)
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
            return Response(
                {'deleted': f'Hotel with id {pk} deleted successfully'})
        except Hotel.DoesNotExist:
            return Response({'error': 'Hotel not found'})


# юзер
class UserAPIView(APIView):

    def get(self, request, *args, **kwargs):
        pk = kwargs.get('pk', None)
        if pk:
            try:
                user = User.objects.get(pk=pk)
                serializer = UserSerializer(user)
                return Response({'user': serializer.data})
            except User.DoesNotExist:
                return Response({'error': 'User not found'},
                                status=status.HTTP_404_NOT_FOUND)
        else:
            users = User.objects.all()
            serializer = UserSerializer(users, many=True)
            return Response({'users': serializer.data})

    def post(self, request):
        serializer = UserSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response({'user': serializer.data},
                            status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def put(self, request, *args, **kwargs):
        pk = kwargs.get('pk', None)
        if not pk:
            return Response({'error': 'Method PUT not allowed'})
        try:
            instance = User.objects.get(pk=pk)
        except:
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
            return Response(
                {'deleted': f'User with id {pk} deleted successfully'})
        except:
            return Response({'error': 'User not found'})


# для комнаты
class RoomListCreateAPIView(generics.ListCreateAPIView):
    queryset = Room.objects.all()
    serializer_class = RoomSerializer


# для чайханы
# гет и пост
@api_view(['GET', 'POST'])
def restaurant_list_create(request):
    if request.method == 'GET':
        restaurants = Restaurant.objects.all()
        serializer = RestaurantSerializer(restaurants, many=True)
        return Response(serializer.data)

    elif request.method == 'POST':
        serializer = RestaurantSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=201)
        return Response(serializer.errors, status=400)


# апдейт
@api_view(['PUT', 'GET'])
def restaurant_update(request, pk):
    try:
        restaurant = Restaurant.objects.get(pk=pk)
    except Restaurant.DoesNotExist:
        return Response({'error': 'Restaurant not found'}, status=404)

    if request.method == 'GET':
        serializer = RestaurantSerializer(restaurant)
        return Response(serializer.data)

    serializer = RestaurantSerializer(restaurant, data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data)
    return Response(serializer.errors, status=400)


# удаление
@api_view(['DELETE'])
def restaurant_delete(request, pk):
    try:
        restaurant = Restaurant.objects.get(pk=pk)
    except Restaurant.DoesNotExist:
        return Response({'error': 'Restaurant not found'}, status=404)

    restaurant.delete()
    return Response(status=204)


# --- Table ---
# гет и пост
@api_view(['GET', 'POST'])
def table_list_create(request):
    if request.method == 'GET':
        tables = Table.objects.all()
        serializer = TableSerializer(tables, many=True)
        return Response(serializer.data)

    elif request.method == 'POST':
        serializer = TableSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=201)
        return Response(serializer.errors, status=400)


# апдейт
@api_view(['PUT', 'GET'])
def table_update(request, pk):
    try:
        table = Table.objects.get(pk=pk)
    except Table.DoesNotExist:
        return Response({'error': 'Table not found'}, status=404)

    if request.method == 'GET':
        serializer = TableSerializer(table)
        return Response(serializer.data)

    serializer = TableSerializer(table, data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data)
    return Response(serializer.errors, status=400)


# удаление
@api_view(['DELETE'])
def table_delete(request, pk):
    try:
        table = Table.objects.get(pk=pk)
    except Table.DoesNotExist:
        return Response({'error': 'Table not found'}, status=404)

    table.delete()
    return Response(status=204)


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


class SearchHotelsByLocationAPIView(APIView):

    def get(self, request):
        location = request.query_params.get('location')

        if not location:
            return Response({'error': 'Location parameter is required'},
                            status=400)

        hotels = Hotel.objects.filter(address__icontains=location)
        hotel_data = []

        for hotel in hotels:
            rooms = Room.objects.filter(hotel=hotel)
            room_list = []

            for room in rooms:
                room_list.append({
                    'room_number': room.room_number,
                    'room_type': room.room_type,
                    'price_per_night': float(room.price_per_night),
                    'is_available': room.is_available
                })

            hotel_data.append({
                'hotel_id': hotel.pk,
                'hotel_name': hotel.name,
                'hotel_address': hotel.address,
                'hotel_description': hotel.description,
                'hotel_rating': hotel.rating,
                'rooms': room_list
            })

        return Response(hotel_data)


# поиск свободной комнаты и отелей  по параметрам


class SearchAvailableRoomsAPIView(APIView):

    def get(self, request):
        location = request.query_params.get('location')
        check_in = request.query_params.get('check_in')
        check_out = request.query_params.get('check_out')
        guests = request.query_params.get('guests', 1)

        if not all([location, check_in, check_out]):
            return Response({'error': 'Missing required parameters'},
                            status=400)

        try:
            guests = int(guests)
        except ValueError:
            return Response({'error': 'Guests must be a number'}, status=400)

        try:
            check_in_date = datetime.strptime(check_in, '%Y-%m-%d')
            check_out_date = datetime.strptime(check_out, '%Y-%m-%d')
        except ValueError:
            return Response({'error': 'Invalid date format. Use YYYY-MM-DD.'},
                            status=400)

        hotels = Hotel.objects.filter(address__icontains=location)
        hotel_data = []

        for hotel in hotels:
            rooms = Room.objects.filter(hotel=hotel)
            available_rooms = []
            for room in rooms:
                overlapping_reservations = ReservationHotel.objects.filter(
                    room=room,
                    check_in_date__lt=check_out,
                    check_out_date__gt=check_in)

                if not overlapping_reservations.exists():
                    available_rooms.append({
                        'room_number': room.room_number,
                        'hotel': room.hotel.name,
                        'address': room.hotel.address,
                        'room type': room.room_type,
                        'photo_url': room.photo_url
                    })
            hotel_data.append({
                'hotel_id': hotel.pk,
                'hotel_name': hotel.name,
                'hotel_address': hotel.address,
                'hotel_description': hotel.description,
                'hotel_rating': hotel.rating,
                'rooms': available_rooms
            })

        return Response(hotel_data)


class SearchAvailableRoomsByCoordsAPIView(APIView):

    def get(self, request):
        latitude = request.query_params.get('latitude')
        longitude = request.query_params.get('longitude')
        check_in = request.query_params.get('check_in')
        check_out = request.query_params.get('check_out')
        guests = request.query_params.get('guests', 1)

        if not all([latitude, longitude, check_in, check_out]):
            return Response({'error': 'Missing required parameters'},
                            status=400)

        try:
            latitude = float(latitude)
            longitude = float(longitude)
        except ValueError:
            return Response(
                {'error': 'Latitude and longitude must be numbers'},
                status=400)

        try:
            guests = int(guests)
        except ValueError:
            return Response({'error': 'Guests must be a number'}, status=400)

        try:
            check_in_date = datetime.strptime(check_in, '%Y-%m-%d')
            check_out_date = datetime.strptime(check_out, '%Y-%m-%d')
        except ValueError:
            return Response({'error': 'Invalid date format. Use YYYY-MM-DD.'},
                            status=400)

        hotels = Hotel.objects.filter(latitude=latitude, longitude=longitude)
        hotel_data = []

        for hotel in hotels:
            rooms = Room.objects.filter(hotel=hotel)
            available_rooms = []
            for room in rooms:
                hotel_latitude = room.hotel.latitude
                hotel_longitude = room.hotel.longitude
                distance = geodesic((latitude, longitude),
                                    (hotel_latitude, hotel_longitude)).km
                if distance <= 50:
                    overlapping_reservations = ReservationHotel.objects.filter(
                        room=room,
                        check_in_date__lt=check_out_date,
                        check_out_date__gt=check_in_date)

                    if not overlapping_reservations.exists():
                        available_rooms.append({
                            'room_number': room.room_number,
                            'hotel': room.hotel.name,
                            'address': room.hotel.address,
                            'room_type': room.room_type,
                            'distance': distance,
                            'photo_url': room.photo_url
                        })
            hotel_data.append({
                'hotel_id': hotel.pk,
                'hotel_name': hotel.name,
                'hotel_address': hotel.address,
                'hotel_description': hotel.description,
                'hotel_rating': hotel.rating,
                'rooms': available_rooms
            })

        return Response(hotel_data)


# --- Room booking, approving, & cancelling view ---
class BookRoomAPIView(APIView):

    def get(self, request):
        reservations = ReservationHotel.objects.all().values(
            'id', 'customer', 'room', 'check_in_date', 'check_out_date',
            'status')
        return Response(list(reservations))

    def post(self, request):
        customer_id = request.data.get('customer_id')
        room_number = request.data.get('room_number')
        check_in = request.data.get('check_in')
        check_out = request.data.get('check_out')
        try:
            customer = Customer.objects.get(id=customer_id)
            room = Room.objects.get(room_number=room_number)
            reservation = request_room_booking(customer, room, check_in,
                                               check_out)
            return Response({
                'status': 'Reservation created',
                'reservation_id': reservation.id
            })
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
            reservation = request_table_booking(customer, table, check_in,
                                                check_out)
            return Response({
                'status': 'Reservation created',
                'reservation_id': reservation.id
            })
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
