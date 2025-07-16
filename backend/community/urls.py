from django.urls import path
from .views import DiscussionListCreateView



urlpatterns = [
    path('discussions/', DiscussionListCreateView.as_view(), name='discussion-list-create'),
]