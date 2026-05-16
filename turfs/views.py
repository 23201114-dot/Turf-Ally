from rest_framework import viewsets
from rest_framework.permissions import AllowAny
from .models import Turf, Venue
from .serializers import TurfSerializer, VenueSerializer


class TurfViewSet(viewsets.ModelViewSet):
    queryset = Turf.objects.all()
    serializer_class = TurfSerializer
    permission_classes = [AllowAny]


class VenueViewSet(viewsets.ModelViewSet):
    queryset = Venue.objects.all()
    serializer_class = VenueSerializer
    permission_classes = [AllowAny]
