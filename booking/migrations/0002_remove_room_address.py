# Generated by Django 4.2.20 on 2025-04-22 07:09

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('booking', '0001_initial'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='room',
            name='address',
        ),
    ]
