from rest_framework import viewsets, serializers
from rest_framework.permissions import IsAuthenticatedOrReadOnly
from .models import Booking
from .serializers import BookingSerializer
from turfs.models import Turf


class BookingViewSet(viewsets.ModelViewSet):
    serializer_class = BookingSerializer
    permission_classes = [IsAuthenticatedOrReadOnly]

    def get_queryset(self):
        if self.request.user.is_authenticated:
            return Booking.objects.filter(user=self.request.user).select_related('turf', 'turf__venue')
        return Booking.objects.none()

    def perform_create(self, serializer):
        # Retrieve the turf_id from validated data
        turf_id = serializer.validated_data.get('turf_id')
        try:
            turf = Turf.objects.get(id=turf_id)
        except Turf.DoesNotExist:
            raise serializers.ValidationError({"turf_id": "Invalid turf ID."})

        user = self.request.user if self.request.user.is_authenticated else None
        
        # Calculate hours or use default
        start_time = serializer.validated_data.get('start_time')
        end_time = serializer.validated_data.get('end_time')
        if start_time and end_time:
            hours = (end_time - start_time).total_seconds() / 3600.0
            if hours <= 0:
                raise serializers.ValidationError({"end_time": "End time must be after start time."})
        else:
            hours = 1  # default to 1 hour if not specified
            
        serializer.save(user=user, total_amount=float(turf.hourly_rate) * hours, turf=turf)
