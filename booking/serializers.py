from django.contrib.auth.hashers import make_password
from rest_framework import serializers
from .models import *
from djoser.serializers import UserSerializer as BaseUserSerializer


class HotelSerializer(serializers.Serializer):
    id = serializers.IntegerField(read_only=True)
    name = serializers.CharField(max_length=255)
    address = serializers.CharField()
    description = serializers.CharField()
    rating = serializers.FloatField()
    photo_url = serializers.URLField()
    latitude = serializers.FloatField(required=True)
    longitude = serializers.FloatField(required=True)
    amenities = serializers.ListField(
        child=serializers.ChoiceField(choices=Hotel.AMENITY_CHOICES),
        required=False
    )
    def create(self, validated_data):
        amenities = validated_data.pop('amenities', None)
        hotel = Hotel.objects.create(**validated_data)
        if amenities is not None:
                hotel.amenities = amenities
                hotel.save()
        return hotel

    def update(self, instance, validated_data):
        instance.name = validated_data.get('name', instance.name)
        instance.address = validated_data.get('address', instance.address)
        instance.description = validated_data.get('description', instance.description)
        instance.rating = validated_data.get('rating', instance.rating)
        instance.photo_url = validated_data.get('photo_url', instance.photo_url)
        instance.latitude = validated_data.get('latitude', instance.latitude)
        instance.longitude = validated_data.get('longitude', instance.longitude)
        if 'amenities' in validated_data:
            instance.amenities = validated_data['amenities']
        instance.save()
        return instance

    def to_representation(self, instance):
        data = super().to_representation(instance)
        data['amenities'] = instance.amenities
        return data


class UserSerializer(serializers.Serializer):
    id = serializers.IntegerField(read_only=True)
    username = serializers.CharField(max_length=150)
    email = serializers.EmailField()
    password = serializers.CharField()
    first_name = serializers.CharField(max_length=30)
    last_name = serializers.CharField(max_length=30)
    role = serializers.CharField(max_length=50)
    phone_number = serializers.CharField(max_length=20)

    def create(self, validated_data):
        return User.objects.create(**validated_data)

    def update(self, instance, validated_data):
        instance.username = validated_data.get('username', instance.username)
        instance.email = validated_data.get('email', instance.email)
        instance.password = validated_data.get('password', instance.password)
        instance.first_name = validated_data.get('first_name',
                                                 instance.first_name)
        instance.last_name = validated_data.get('last_name',
                                                instance.last_name)
        instance.role = validated_data.get('role', instance.role)
        instance.phone_number = validated_data.get('phone_number',
                                                   instance.phone_number)
        instance.save()
        return instance


class RoomSerializer(serializers.ModelSerializer):

    class Meta:
        model = Room
        fields = '__all__'


class RestaurantSerializer(serializers.ModelSerializer):

    class Meta:
        model = Restaurant
        fields = '__all__'


class TableSerializer(serializers.ModelSerializer):

    class Meta:
        model = Table
        fields = '__all__'


class CustomerSerializer(serializers.ModelSerializer):

    class Meta:
        model = Customer
        fields = '__all__'


class ManagerSerializer(serializers.ModelSerializer):

    class Meta:
        model = Manager
        fields = '__all__'


class ReservationHotelSerializer(serializers.ModelSerializer):

    class Meta:
        model = ReservationHotel
        fields = '__all__'


class ReservationRestSerializer(serializers.ModelSerializer):

    class Meta:
        model = ReservationRest
        fields = '__all__'


# чтоб джойсер выводил все данные и а не только 3
class CustomUserSerializer(BaseUserSerializer):

    class Meta(BaseUserSerializer.Meta):
        model = User
        fields = ('id', 'username', 'email', 'first_name', 'last_name', 'role',
                  'phone_number', 'password')
        extra_kwargs = {'password': {'write_only': True}}
