from django.http import HttpResponse
from django.shortcuts import render

# Create your views here.
from rest_framework.views import APIView
from rest_framework.response import Response
from .models import Hotel , User , Room
from .serializers import *
from rest_framework import status
from rest_framework import generics



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
        return Response({'created': serializer.data})

    def put(self, request, *args, **kwargs):
        pk = kwargs.get('pk', None)
        if not pk:
            return Response({'error': 'Method PUT not allowed'})
        try:
            instance = User.objects.get(pk=pk)
        except User.DoesNotExist:
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