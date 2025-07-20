from rest_framework import viewsets, permissions
from .models import Message
from .serializer import MessageSerializer
from django.db.models import Q

class MessageViewSet(viewsets.ModelViewSet):
    serializer_class = MessageSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        """
        Return messages between the current user and the friend (by friend_id query param).
        """
        user = self.request.user
        friend_id = self.request.query_params.get('friend_id')

        if not friend_id:
            return Message.objects.none()

        return Message.objects.filter(
            Q(sender=user, recipient_id=friend_id) |
            Q(sender_id=friend_id, recipient=user)
        ).order_by('timestamp')

    def get_serializer_context(self):
        """
        Pass request to serializer so we can access the current user.
        """
        return {'request': self.request}
