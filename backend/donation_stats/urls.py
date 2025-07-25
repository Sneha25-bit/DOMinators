from django.urls import path
from .views import UserDonationStatsView

urlpatterns = [
    path('stats/', UserDonationStatsView.as_view(), name='user-donation-stats'),
]