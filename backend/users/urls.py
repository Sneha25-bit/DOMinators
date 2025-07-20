from django.urls import path
from .views import RegisterView, UserProfileView, UpdateUserPointsView,UserDashboardView,AddUserActivityView

urlpatterns = [
    path('register/', RegisterView.as_view(), name='register'),
    path('me/', UserProfileView.as_view(), name='user-profile'),
    path('add-points/',UpdateUserPointsView.as_view(), name='add-points'),
     path('dashboard/',UserDashboardView.as_view(), name='user-dashboard'),
     path('dashboard/activity/', AddUserActivityView.as_view(), name='add-activity'),
]
