from rest_framework import viewsets
from rest_framework.permissions import IsAuthenticatedOrReadOnly
from .models import Booking
from .serializers import BookingSerializer


class BookingViewSet(viewsets.ModelViewSet):
    serializer_class = BookingSerializer
    permission_classes = [IsAuthenticatedOrReadOnly]

    def get_queryset(self):
        if self.request.user.is_authenticated:
            return Booking.objects.filter(user=self.request.user).select_related('turf', 'turf__venue')
        return Booking.objects.none()

    def perform_create(self, serializer):
        # The serializer maps 'turf_id' input to 'turf' in validated_data
        turf = serializer.validated_data.get('turf')
        user = self.request.user if self.request.user.is_authenticated else None
        hours = 1  # default to 1 hour if not specified
        serializer.save(user=user, total_amount=turf.hourly_rate * hours)
