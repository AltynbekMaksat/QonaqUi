from django.db import models
from django.contrib.auth.models import AbstractUser
from django.conf import settings


class User(AbstractUser):
    ROLE_CHOICES = (
        ('guest', 'Guest'),
        ('manager', 'Manager'),
        ('admin', 'Admin'),
    )
    role = models.CharField(max_length=10,
                            choices=ROLE_CHOICES,
                            default='guest')
    phone_number = models.CharField(max_length=20, blank=True, null=True)
    first_name = models.CharField(max_length=100)
    last_name = models.CharField(max_length=100)

    def __str__(self):
        return f"{self.first_name} {self.last_name} ({self.role})"


class Hotel(models.Model):
    name = models.CharField(max_length=255)
    address = models.TextField()
    description = models.TextField()
    rating = models.FloatField()
    latitude = models.FloatField()
    longitude = models.FloatField()
    def __str__(self):
        return f"{self.name}, {self.rating}"


class Room(models.Model):
    hotel = models.ForeignKey(Hotel, on_delete=models.CASCADE)
    room_number = models.IntegerField()
    room_type = models.CharField(max_length=100)
    price_per_night = models.DecimalField(max_digits=10, decimal_places=2)
    is_available = models.BooleanField(default=True)

    def __str__(self):
        return f"Room {self.room_number} in {self.hotel.name}"


class Restaurant(models.Model):
    name = models.CharField(max_length=100)
    address = models.CharField(max_length=255, null=True, blank=True)
    description = models.TextField(blank=True)
    rating = models.FloatField()

    def __str__(self):
        return f"{self.name}, {self.rating}"


class Table(models.Model):
    restaurant = models.ForeignKey(Restaurant, on_delete=models.CASCADE)
    number = models.IntegerField()
    seats = models.IntegerField()

    def __str__(self):
        return f"Table {self.number} at {self.restaurant.name}"


class Customer(models.Model):
    user = models.OneToOneField(settings.AUTH_USER_MODEL,
                                on_delete=models.CASCADE,
                                related_name='customer_profile')
    first_name = models.CharField(max_length=100)
    last_name = models.CharField(max_length=100)
    email = models.EmailField(unique=True)
    phone_number = models.CharField(max_length=20)

    def __str__(self):
        return f"{self.first_name} {self.last_name}"


class Manager(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    hotel = models.ForeignKey(Hotel,
                              on_delete=models.SET_NULL,
                              null=True,
                              blank=True)
    tables = models.ManyToManyField('Table', blank=True)

    def __str__(self):
        return f"Manager: {self.user.username}"


class ReservationHotel(models.Model):
    customer = models.ForeignKey(Customer, on_delete=models.CASCADE)
    room = models.ForeignKey(Room, on_delete=models.CASCADE)
    check_in_date = models.DateField()
    check_out_date = models.DateField()
    status = models.CharField(max_length=50, default="Pending")

    def __str__(self):
        return f"Reservation for {self.customer} in {self.room}"


class AvailableRoomsManager(models.Manager):

    def available_rooms(self):
        return self.filter(is_available=True)


class ReservationRest(models.Model):
    customer = models.ForeignKey(Customer, on_delete=models.CASCADE)
    table = models.ForeignKey(Table, on_delete=models.CASCADE)
    check_in_date = models.DateField()
    check_out_date = models.DateField()
    status = models.CharField(max_length=50, default="Pending")

    def __str__(self):
        return f"Reservation for {self.customer} in {self.table}"


class RoomAvailability(models.Model):
    room = models.ForeignKey(Room,
                             on_delete=models.CASCADE,
                             related_name='availabilities')
    date = models.DateField()

    class Meta:
        unique_together = ('room', 'date')

    def __str__(self):
        return f"{self.room} занята на {self.date}"


class TableAvailability(models.Model):
    table = models.ForeignKey(Table,
                              on_delete=models.CASCADE,
                              related_name='availabilities')
    date = models.DateField()

    class Meta:
        unique_together = ('table', 'date')

    def __str__(self):
        return f"{self.table} занята на {self.date}"
