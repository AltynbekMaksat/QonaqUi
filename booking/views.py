from django.http import HttpResponse
from django.shortcuts import render

# Create your views here.
from rest_framework.views import APIView
from rest_framework.response import Response
from .models import Hotel , User , Room
from .serializers import HotelSerializer , UserSerializer , RoomSerializer
from rest_framework import status



class HotelAPIView(APIView):
    def get(self, request):
        hotels = Hotel.objects.all()
        return Response({'hotels': HotelSerializer(hotels, many=True).data})

    def post(self, request):
        new_hotel = Hotel.objects.create(
            name=request.data['name'],
            address=request.data['address'],
            description=request.data['description'],
            rating=request.data['rating']
        )
        return Response({'created': HotelSerializer(new_hotel).data})




# юзер
class UserAPIView(APIView):
    def get(self, request):
        users = User.objects.all()
        serializer = UserSerializer(users, many=True)
        return Response({'users': serializer.data})

    def post(self, request):
        serializer = UserSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response({'user': serializer.data}, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)




# для  комнаты
class RoomAPIView(APIView):
    def get(self, request):
        rooms = Room.objects.all()
        serializer = RoomSerializer(rooms, many=True)
        return Response({'rooms': serializer.data})
    def post(self, request):
        serializer = RoomSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response({'room': serializer.data}, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)