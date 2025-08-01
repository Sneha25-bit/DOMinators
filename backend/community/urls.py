from django.urls import path
from .views import DiscussionListCreateView, LikeDiscussionView, CommentListCreateAPIView



urlpatterns = [
    path('discussions/', DiscussionListCreateView.as_view(), name='discussion-list-create'),
    path('discussions/<int:discussion_id>/like/', LikeDiscussionView.as_view(), name='like-discussion'),
    path('discussions/<int:discussion_id>/comments/', CommentListCreateAPIView.as_view(), name='comments'),
]