from django.contrib import admin
from .models import (
    User, Hotel, Room, Restaurant, Table, Customer,
    Manager, ReservationHotel, ReservationRest
)

admin.site.register(User)
admin.site.register(Hotel)
admin.site.register(Room)
admin.site.register(Restaurant)
admin.site.register(Table)
admin.site.register(Customer)
admin.site.register(Manager)
admin.site.register(ReservationHotel)
admin.site.register(ReservationRest)
