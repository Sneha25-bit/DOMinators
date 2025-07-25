from rest_framework import generics, views, status
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework.response import Response
from .models import CustomUser
from .serializers import RegisterSerializer, CustomUserSerializer, UserDashboardSerializer, CreateActivitySerializer,LeaderboardUserSerializer
from rest_framework.views import APIView

class RegisterView(generics.CreateAPIView):
    queryset = CustomUser.objects.all()
    permission_classes = [AllowAny]
    serializer_class = RegisterSerializer

class UserProfileView(generics.RetrieveAPIView):
    serializer_class = CustomUserSerializer
    permission_classes = [IsAuthenticated]

    def get_object(self):
        return self.request.user
    
class UpdateUserPointsView(views.APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request):
        points_to_add = request.data.get('points', 0)
        user = request.user
        user.points += int(points_to_add)
        user.save()
        return Response({'points': user.points}, status=status.HTTP_200_OK)

class UserDashboardView(views.APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        serializer = UserDashboardSerializer(request.user)
        return Response(serializer.data)
    
class AddUserActivityView(views.APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request):
        serializer = CreateActivitySerializer(data=request.data, context={'request': request})
        if serializer.is_valid():
            activity = serializer.save()
            return Response({
                'message': 'Activity logged successfully.',
                'new_points': request.user.points
            }, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    

class LeaderboardView(APIView):
    permission_classes = [AllowAny]

    def get(self, request):
        users = CustomUser.objects.order_by('-points')[:10]
        serializer = LeaderboardUserSerializer(users, many=True)
        return Response(serializer.data)     