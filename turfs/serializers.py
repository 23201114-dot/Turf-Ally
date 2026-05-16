from rest_framework import serializers
from .models import Turf, Venue


class VenueSerializer(serializers.ModelSerializer):
    class Meta:
        model = Venue
        fields = '__all__'


class TurfSerializer(serializers.ModelSerializer):
    venue = VenueSerializer(read_only=True)
    venue_id = serializers.PrimaryKeyRelatedField(
        queryset=Venue.objects.all(), source='venue', write_only=True, required=False
    )

    class Meta:
        model = Turf
        fields = '__all__'
