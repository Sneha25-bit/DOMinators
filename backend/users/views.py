from rest_framework import generics, views, status
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework.response import Response
from rest_framework.views import APIView

from .models import CustomUser
from donations.models import Donation
from users.models import Activity

from .serializers import (
    RegisterSerializer,
    CustomUserSerializer,
    UserDashboardSerializer,
    CreateActivitySerializer,
    ActivitySerializer,
    LeaderboardUserSerializer
)


# User Registration View
class RegisterView(generics.CreateAPIView):
    queryset = CustomUser.objects.all()
    permission_classes = [AllowAny]
    serializer_class = RegisterSerializer


# Retrieve Logged-in User's Profile
class UserProfileView(generics.RetrieveAPIView):
    serializer_class = CustomUserSerializer
    permission_classes = [IsAuthenticated]

    def get_object(self):
        return self.request.user


# Add Points to a User
class UpdateUserPointsView(views.APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request):
        points_to_add = request.data.get('points', 0)
        user = request.user
        user.points += int(points_to_add)
        user.save()
        return Response({'points': user.points}, status=status.HTTP_200_OK)


# Dashboard View - Overview of Donations, Activities, and Friends
class UserDashboardView(views.APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        serializer = UserDashboardSerializer(request.user)
        return Response(serializer.data)

        # Donations
        donations = Donation.objects.filter(user=user)
        total_donated = sum(d.amount for d in donations)
        donation_count = donations.count()

        # Activities
        activities = Activity.objects.filter(user=user)

        # Friends (placeholder)
        friends_count = 0  # Replace with actual logic when ready

        return Response({
            'points': user.points,
            'status': user.status,
            'activities': ActivitySerializer(activities, many=True).data,
            'total_donated': total_donated,
            'donation_count': donation_count,
            'friends_count': friends_count,
            'ocean_points_from_donations': total_donated * 2,
        })


# Create Activity Entry and Update Points
class AddUserActivityView(views.APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request):
        serializer = CreateActivitySerializer(data=request.data, context={'request': request})
        if serializer.is_valid():
            serializer.save()
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
