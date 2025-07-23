from rest_framework import viewsets, permissions, status, serializers
from rest_framework.response import Response
from rest_framework.decorators import action
from .models import Friend, FriendRequest
from .serializers import FriendSerializer, FriendRequestSerializer
from django.contrib.auth import get_user_model

User = get_user_model()


class FriendViewSet(viewsets.ModelViewSet):
    serializer_class = FriendSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        return Friend.objects.filter(user=self.request.user)

    def perform_create(self, serializer):
        # Optional: allow adding a friend manually (not usually used)
        serializer.save(user=self.request.user)


class FriendRequestViewSet(viewsets.ModelViewSet):
    serializer_class = FriendRequestSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        return FriendRequest.objects.filter(to_user=self.request.user)

    def perform_create(self, serializer):
        to_username = self.request.data.get('to_username')

        if not to_username:
            raise serializers.ValidationError("Username is required.")

        try:
            to_user = User.objects.get(username=to_username)
        except User.DoesNotExist:
            raise serializers.ValidationError("User not found.")

        if FriendRequest.objects.filter(from_user=self.request.user, to_user=to_user).exists():
            raise serializers.ValidationError("Friend request already sent.")

        if self.request.user == to_user:
            raise serializers.ValidationError("You cannot send a request to yourself.")

        serializer.save(from_user=self.request.user, to_user=to_user)

    @action(detail=True, methods=['post'], permission_classes=[permissions.IsAuthenticated])
    def accept(self, request, pk=None):
        friend_request = self.get_object()

        if friend_request.to_user != request.user:
            return Response({"detail": "Not allowed."}, status=status.HTTP_403_FORBIDDEN)

        # Update request status
        friend_request.status = 'accepted'
        friend_request.save()

        # Create Friend entries for both users
        Friend.objects.create(
            user=friend_request.from_user,
            username=friend_request.to_user.username,
            full_name=friend_request.to_user.full_name,
            marine_character=friend_request.to_user.marine_character,
            points=friend_request.to_user.points,
            status='online'
        )

        Friend.objects.create(
            user=friend_request.to_user,
            username=friend_request.from_user.username,
            full_name=friend_request.from_user.full_name,
            marine_character=friend_request.from_user.marine_character,
            points=friend_request.from_user.points,
            status='online'
        )

        return Response({'status': 'Friend request accepted'})

    @action(detail=True, methods=['post'], permission_classes=[permissions.IsAuthenticated])
    def reject(self, request, pk=None):
        friend_request = self.get_object()

        if friend_request.to_user != request.user:
            return Response({"detail": "Not allowed."}, status=status.HTTP_403_FORBIDDEN)

        friend_request.status = 'rejected'
        friend_request.save()
        return Response({'status': 'Friend request rejected'})