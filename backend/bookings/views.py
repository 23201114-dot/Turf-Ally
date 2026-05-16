from rest_framework import viewsets
from rest_framework.permissions import IsAuthenticated
from .models import Booking
from .serializers import BookingSerializer

class BookingViewSet(viewsets.ModelViewSet):
    serializer_class = BookingSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        return Booking.objects.filter(user=self.request.user)

    def perform_create(self, serializer):
        turf_id = serializer.validated_data.get('turf_id')
        from turfs.models import Turf
        turf = Turf.objects.get(id=turf_id)
        serializer.save(user=self.request.user, total_amount=turf.hourly_rate)
