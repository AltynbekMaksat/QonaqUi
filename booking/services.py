from django.core.exceptions import ValidationError, PermissionError
from .models import ReservationHotel, ReservationRest, RoomAvailability, TableAvailability

# 1. СОЗДАНИЕ ЗАЯВОК НА БРОНЬ
# функция бронирования номера
def request_room_booking(customer, room, check_in, check_out):
    overlapping = ReservationHotel.objects.filter( # проверяем занятость номера отеля
        room=room,
        status='Approved',
        check_in_date__lt=check_out,
        check_out_date__gt=check_in
    )
    if overlapping.exists():
        raise ValidationError("The room isn't available for this date!")
    return ReservationHotel.objects.create( # создание заявки
        customer=customer,
        room=room,
        check_in_date=check_in,
        check_out_date=check_out,
        status='Pending'
    )

# функция бронирования стола (та же логика)
def request_table_booking(customer, table, check_in, check_out):
    overlapping = ReservationRest.objects.filter(
        table=table,
        status='Approved',
        check_in_date__lt=check_out,
        check_out_date__gt=check_in
    )
    if overlapping.exists():
        raise ValidationError("The table isn't available for this date and time!")
    return ReservationRest.objects.create(
        customer=customer,
        table=table,
        check_in_date=check_in,
        check_out_date=check_out,
        status='Pending'
    )

# 2. ПОДТВЕРЖДЕНИЕ ЗАЯВОК НА БРОНЬ
# функция подтверждения менеджером заявки на отель
def approve_room_reservation(manager, reservation_id):
    reservation = ReservationHotel.objects.get(id=reservation_id)
    if reservation.room.hotel != manager.hotel:
        raise PermissionError("You cannot approve reservation for this hotel!")
    overlapping = ReservationHotel.objects.filter( # проверка, не забронировано ли уже это время
        room=reservation.room,
        status='Approved',
        check_in_date__lt=reservation.check_out_date,
        check_out_date__gt=reservation.check_in_date
    ).exclude(id=reservation.id)
    if overlapping.exists():
        raise ValidationError("The room isn't available!")
    reservation.status = 'Approved'
    reservation.save()

# функция подтверждения менеджером заявки на стол в рестике
def approve_table_reservation(manager, reservation_id):
    reservation = ReservationRest.objects.get(id=reservation_id)
    if reservation.table not in manager.tables.all():
        raise PermissionError("You cannot approve reservations for this place!")
    overlapping = ReservationRest.objects.filter(
        table=reservation.table,
        status='Approved',
        check_in_date__lt=reservation.check_out_date,
        check_out_date__gt=reservation.check_in_date
    ).exclude(id=reservation.id)
    if overlapping.exists():
        raise ValidationError("The table isn't available!")
    reservation.status = 'Approved'
    reservation.save()

# 3. ОТМЕНА БРОНИ
def cancel_room_reservation(reservation, user):
    if user != reservation.customer.user and user.role != 'manager':
        raise PermissionError("You do not have access to cancel this reservation")
    RoomAvailability.objects.filter(
        room=reservation.room,
        date__gte=reservation.check_in_date,
        date__lt=reservation.check_out_date
    ).delete()
    reservation.status = "Cancelled"
    reservation.save()
    return reservation

def cancel_table_reservation(reservation, user):
    if user != reservation.customer.user and user.role != 'manager':
        raise PermissionError("You do not have access to cancel this reservation")
    TableAvailability.objects.filter(
        table=reservation.table,
        date__gte=reservation.check_in_date,
        date__lt=reservation.check_out_date
    ).delete()
    reservation.status = "Cancelled"
    reservation.save()
    return reservation

