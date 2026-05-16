from rest_framework import viewsets, mixins, status
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework.views import APIView
from .models import AthleteProfile
from .serializers import AthleteProfileSerializer, UserSerializer
from django.contrib.auth.models import User


class RegisterView(APIView):
    permission_classes = [AllowAny]

    def post(self, request):
        username = request.data.get('username')
        password = request.data.get('password')
        email = request.data.get('email', '')
        first_name = request.data.get('first_name', '')
        last_name = request.data.get('last_name', '')

        if not username or not password:
            return Response({'error': 'Username and password are required.'}, status=status.HTTP_400_BAD_REQUEST)

        if User.objects.filter(username=username).exists():
            return Response({'error': 'Username already exists.'}, status=status.HTTP_400_BAD_REQUEST)

        user = User.objects.create_user(
            username=username, password=password, email=email,
            first_name=first_name, last_name=last_name
        )
        # Create athlete profile automatically
        AthleteProfile.objects.create(user=user)
        return Response(UserSerializer(user).data, status=status.HTTP_201_CREATED)


class AthleteProfileViewSet(viewsets.ModelViewSet):
    queryset = AthleteProfile.objects.all().select_related('user')
    serializer_class = AthleteProfileSerializer
    permission_classes = [AllowAny]

    @action(detail=False, methods=['get'], permission_classes=[IsAuthenticated])
    def me(self, request):
        try:
            profile = AthleteProfile.objects.get(user=request.user)
            serializer = self.get_serializer(profile)
            return Response(serializer.data)
        except AthleteProfile.DoesNotExist:
            return Response({'detail': 'Profile not found.'}, status=status.HTTP_404_NOT_FOUND)


class UserViewSet(viewsets.GenericViewSet, mixins.RetrieveModelMixin, mixins.ListModelMixin):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = [AllowAny]

    @action(detail=False, methods=['get'])
    def me(self, request):
        if not request.user.is_authenticated:
            return Response({"detail": "Not logged in"}, status=401)
        serializer = self.get_serializer(request.user)
        return Response(serializer.data)

