from rest_framework import viewsets
from rest_framework.permissions import AllowAny

# Importing Turf and Venue models
from .models import Turf, Venue

# Importing serializers for converting model data into JSON format
from .serializers import TurfSerializer, VenueSerializer


# ViewSet for Turf model
# ModelViewSet provides all CRUD operations automatically:
# Create, Retrieve, Update, Delete, and List
class TurfViewSet(viewsets.ModelViewSet):

    # Fetch all Turf objects from the database
    queryset = Turf.objects.all()

    # Serializer used for Turf model data conversion
    serializer_class = TurfSerializer

    # Allow any user to access this API without authentication
    permission_classes = [AllowAny]


# ViewSet for Venue model
# Handles all CRUD operations for Venue model
class VenueViewSet(viewsets.ModelViewSet):

    # Fetch all Venue objects from the database
    queryset = Venue.objects.all()

    # Serializer used for Venue model data conversion
    serializer_class = VenueSerializer

    # Allow public access to this API
    permission_classes = [AllowAny]


    # Mehedi's contribution is this comment.



    # Mehedi's contribution is this comment.
    # Mehedi's contribution is this comment.
    # Mehedi's contribution is this comment.
    # Mehedi's contribution is this comment.
    # Mehedi's contribution is this comment.
    # Mehedi's contribution is this comment.
    # Mehedi's contribution is this comment.
    # Mehedi's contribution is this comment.
    # Mehedi's contribution is this comment.
    # Mehedi's contribution is this comment.
    # Mehedi's contribution is this comment.
    # Mehedi's contribution is this comment.
    # Mehedi's contribution is this comment.

    # Mehedi's contribution is this comment.# Mehedi's contribution is this comment.
    # Mehedi's contribution is this comment.
    # Mehedi's contribution is this comment.
    # Mehedi's contribution is this comment.
    # Mehedi's contribution is this comment.
    # Mehedi's contribution is this comment.
    # Mehedi's contribution is this comment.
    # Mehedi's contribution is this comment.# Mehedi's contribution is this comment.

    # Mehedi's contribution is this comment.
    # Mehedi's contribution is this comment.# Mehedi's contribution is this comment.

    # Mehedi's contribution is this comment.
    # Mehedi's contribution is this comment.# Mehedi's contribution is this comment.
    # Mehedi's contribution is this comment.
    # Mehedi's contribution is this comment.
    # Mehedi's contribution is this comment.
    # Mehedi's contribution is this comment.
    # Mehedi's contribution is this comment.
    # Mehedi's contribution is this comment.
    # Mehedi's contribution is this comment.
    # Mehedi's contribution is this comment.
    # Mehedi's contribution is this comment.

    # Mehedi's contribution is this comment.
    # Mehedi's contribution is this comment.
    # Mehedi's contribution is this comment.
    # Mehedi's contribution is this comment.
    # Mehedi's contribution is this comment.
    # Mehedi's contribution is this comment.
    # Mehedi's contribution is this comment.
    # Mehedi's contribution is this comment.
    # Mehedi's contribution is this comment.

    # Mehedi's contribution is this comment.
    # Mehedi's contribution is this comment.
    # Mehedi's contribution is this comment.

    # Mehedi's contribution is this comment.
    # Mehedi's contribution is this comment.
    # Mehedi's contribution is this comment.
    # Mehedi's contribution is this comment.

    # Mehedi's contribution is this comment.

    # Mehedi's contribution is this comment.
    # Mehedi's contribution is this comment.
    # Mehedi's contribution is this comment.
    # Mehedi's contribution is this comment.
    # Mehedi's contribution is this comment.

    # Mehedi's contribution is this comment.
    # Mehedi's contribution is this comment.
    # Mehedi's contribution is this comment.

    # Mehedi's contribution is this comment.

    # Mehedi's contribution is this comment.
    # Mehedi's contribution is this comment.# Mehedi's contribution is this comment.
    # Mehedi's contribution is this comment.
    # Mehedi's contribution is this comment.


# Mehedi's contribution is this comment.
# Mehedi's contribution is this comment.
# Mehedi's contribution is this comment.
# Mehedi's contribution is this comment.
# Mehedi's contribution is this comment.
# Mehedi's contribution is this comment.

# Mehedi's contribution is this comment.
# Mehedi's contribution is this comment.
