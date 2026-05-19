from rest_framework import serializers
from .models import Booking
from turfs.serializers import TurfSerializer


class BookingSerializer(serializers.ModelSerializer):
    turf = TurfSerializer(read_only=True)
    turf_id = serializers.IntegerField(write_only=True)

    class Meta:
        model = Booking
        fields = '__all__'
        read_only_fields = ('user', 'total_amount', 'status')



#testing 101