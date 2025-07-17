from django.urls import path
from .views import RegisterView, UserProfileView, UpdateUserPointsView

urlpatterns = [
    path('register/', RegisterView.as_view(), name='register'),
    path('me/', UserProfileView.as_view(), name='user-profile'),
    path('add-points/',UpdateUserPointsView.as_view(), name='add-points'),
]
