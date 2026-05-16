from rest_framework import viewsets, mixins
from rest_framework.permissions import IsAuthenticated
from rest_framework.decorators import action
from rest_framework.response import Response
from .models import AthleteProfile
from .serializers import AthleteProfileSerializer, UserSerializer
from django.contrib.auth.models import User

class AthleteProfileViewSet(viewsets.ModelViewSet):
    queryset = AthleteProfile.objects.all()
    serializer_class = AthleteProfileSerializer

class UserViewSet(viewsets.GenericViewSet, mixins.RetrieveModelMixin):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = [IsAuthenticated]
    
    @action(detail=False, methods=['get'])
    def me(self, request):
        serializer = self.get_serializer(request.user)
        return Response(serializer.data)
