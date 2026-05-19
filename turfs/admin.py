from django.contrib import admin

# Import Venue and Turf models from models.py
from .models import Venue, Turf


# Register Venue model in Django Admin Panel
@admin.register(Venue)
class VenueAdmin(admin.ModelAdmin):

    # Fields displayed in the admin list view
    list_display = ('id', 'name', 'location')

    # Enables search functionality for these fields
    search_fields = ('name', 'location')


# Register Turf model in Django Admin Panel
@admin.register(Turf)
class TurfAdmin(admin.ModelAdmin):

    # Fields displayed in the admin list view
    list_display = ('id', 'name', 'sport', 'venue', 'hourly_rate')

    # Adds filtering options in admin sidebar
    list_filter = ('sport', 'venue')

    # Enables search functionality for turf name
    search_fields = ('name',)