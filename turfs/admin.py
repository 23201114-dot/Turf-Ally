from django.contrib import admin
from .models import Venue, Turf

@admin.register(Venue)
class VenueAdmin(admin.ModelAdmin):
    list_display = ('id', 'name', 'location')
    search_fields = ('name', 'location')

@admin.register(Turf)
class TurfAdmin(admin.ModelAdmin):
    list_display = ('id', 'name', 'sport', 'venue', 'hourly_rate')
    list_filter = ('sport', 'venue')
    search_fields = ('name',)
