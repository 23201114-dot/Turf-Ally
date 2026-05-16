from rest_framework import viewsets
from .models import Turf, Venue
from .serializers import TurfSerializer, VenueSerializer

class TurfViewSet(viewsets.ModelViewSet):
    queryset = Turf.objects.all()
    serializer_class = TurfSerializer

class VenueViewSet(viewsets.ModelViewSet):
    queryset = Venue.objects.all()
    serializer_class = VenueSerializer
