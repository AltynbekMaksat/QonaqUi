from django.core.management.base import BaseCommand
from booking.models import Hotel
import json

class Command(BaseCommand):
    help = 'Fill default amenities for existing hotels'

    def handle(self, *args, **options):
        default = ['free_wifi', 'breakfast', 'parking']
        qs = Hotel.objects.filter(amenities_json__in=['', '[]', None])
        count = qs.count()
        for hotel in qs:
            hotel.amenities_json = json.dumps(default)
            hotel.save(update_fields=['amenities_json'])
        self.stdout.write(self.style.SUCCESS(
            f'Updated {count} hotels with default amenities.'
        ))