# Import Django REST Framework viewsets, mixins, and status codes
from rest_framework import viewsets, mixins, status

# Import permission classes
from rest_framework.permissions import AllowAny, IsAuthenticated

# Import decorator for custom actions inside ViewSets
from rest_framework.decorators import action

# Import Response object for sending API responses
from rest_framework.response import Response

# Import APIView for creating custom API views
from rest_framework.views import APIView

# Import AthleteProfile model
from .models import AthleteProfile

# Import serializers for AthleteProfile and User
from .serializers import AthleteProfileSerializer, UserSerializer

# Import Django built-in User model
from django.contrib.auth.models import User


# API View for user registration
class RegisterView(APIView):

    # Allow any user to access this endpoint without authentication
    permission_classes = [AllowAny]

    # Handles POST request for user registration
    def post(self, request):

        # Get user data from request body
        username = request.data.get('username')
        password = request.data.get('password')
        email = request.data.get('email', '')
        first_name = request.data.get('first_name', '')
        last_name = request.data.get('last_name', '')

        # Check if username or password is missing
        if not username or not password:
            return Response(
                {'error': 'Username and password are required.'},
                status=status.HTTP_400_BAD_REQUEST
            )

        # Check if username already exists in database
        if User.objects.filter(username=username).exists():
            return Response(
                {'error': 'Username already exists.'},
                status=status.HTTP_400_BAD_REQUEST
            )

        # Create a new user account
        user = User.objects.create_user(
            username=username,
            password=password,
            email=email,
            first_name=first_name,
            last_name=last_name
        )

        # Automatically create an athlete profile for the new user
        AthleteProfile.objects.create(user=user)

        # Return created user data with HTTP 201 status
        return Response(
            UserSerializer(user).data,
            status=status.HTTP_201_CREATED
        )


# ViewSet for AthleteProfile model
# Provides CRUD operations automatically
class AthleteProfileViewSet(viewsets.ModelViewSet):

    # Get all athlete profiles and optimize query using select_related
    queryset = AthleteProfile.objects.all().select_related('user')

    # Serializer used for AthleteProfile model
    serializer_class = AthleteProfileSerializer

    # Allow public access to this API
    permission_classes = [AllowAny]

    # Custom endpoint: /me/
    # Returns currently logged-in user's profile
    @action(detail=False, methods=['get'], permission_classes=[IsAuthenticated])
    def me(self, request):

        try:
            # Find profile linked to logged-in user
            profile = AthleteProfile.objects.get(user=request.user)

            # Serialize profile data
            serializer = self.get_serializer(profile)

            # Return profile data
            return Response(serializer.data)

        except AthleteProfile.DoesNotExist:

            # Return error if profile does not exist
            return Response(
                {'detail': 'Profile not found.'},
                status=status.HTTP_404_NOT_FOUND
            )


# ViewSet for Django User model
# Supports retrieving single user and listing users
class UserViewSet(
    viewsets.GenericViewSet,
    mixins.RetrieveModelMixin,
    mixins.ListModelMixin
):

    # Fetch all users from database
    queryset = User.objects.all()

    # Serializer used for User model
    serializer_class = UserSerializer

    # Allow public access
    permission_classes = [AllowAny]

    # Custom endpoint: /me/
    # Returns currently logged-in user data
    @action(detail=False, methods=['get'])
    def me(self, request):

        # Check if user is authenticated
        if not request.user.is_authenticated:
            return Response(
                {"detail": "Not logged in"},
                status=401
            )

        # Serialize logged-in user data
        serializer = self.get_serializer(request.user)

        # Return serialized user data
        return Response(serializer.data)