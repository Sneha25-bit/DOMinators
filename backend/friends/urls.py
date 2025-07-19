from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import FriendViewSet, FriendRequestViewSet

router = DefaultRouter()
router.register(r'friends', FriendViewSet, basename='friends')
router.register(r'friend-requests', FriendRequestViewSet, basename='friend-requests')

urlpatterns = [
    path('', include(router.urls)),
]
