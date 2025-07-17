from rest_framework import generics, permissions,status
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticatedOrReadOnly
from rest_framework.decorators import action
from .models import Discussion, DiscussionLike
from .serializers import DiscussionSerializer

class DiscussionListCreateView(generics.ListCreateAPIView):
    queryset = Discussion.objects.all().order_by('-timestamp')
    serializer_class = DiscussionSerializer
    permission_classes = [IsAuthenticatedOrReadOnly]

    def perform_create(self, serializer):
        serializer.save(author=self.request.user)
        
    def get_serializer_context(self):
        context = super().get_serializer_context()
        context['super'] = self.request
        return context
    
        

class LikeDiscussionView(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def post(self, request, discussion_id):
        user = request.user
        try:
            discussion = Discussion.objects.get(id=discussion_id)
        except Discussion.DoesNotExist:
            return Response({'error': 'Discussion not found'}, status=status.HTTP_404_NOT_FOUND)

        like, created = DiscussionLike.objects.get_or_create(user=user, discussion=discussion)

        if not created:
            # Already liked → remove like
            like.delete()
            discussion.likes = max(discussion.likes - 1, 0)
            discussion.save()
            return Response({'liked': False, 'likes': discussion.likes}, status=200)

        # New like
        discussion.likes += 1
        discussion.save()
        return Response({'liked': True, 'likes': discussion.likes}, status=200)
    