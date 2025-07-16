from rest_framework import generics
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticatedOrReadOnly
from rest_framework.decorators import action
from .models import Discussion
from .serializers import DiscussionSerializer

class DiscussionListCreateView(generics.ListCreateAPIView):
    queryset = Discussion.objects.all().order_by('-timestamp')
    serializer_class = DiscussionSerializer
    permission_classes = [IsAuthenticatedOrReadOnly]

    def perform_create(self, serializer):
        serializer.save(author=self.request.user)