from django.contrib import admin
from .models import Booking

@admin.register(Booking)
class BookingAdmin(admin.ModelAdmin):
    list_display = ('id', 'user', 'turf', 'start_time', 'end_time', 'status', 'total_amount')
    list_filter = ('status', 'start_time')
    search_fields = ('user__username', 'turf__name')
