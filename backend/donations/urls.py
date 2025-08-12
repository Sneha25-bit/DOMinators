from django.urls import path
from .views import UserDonationListView

urlpatterns = [
    path('create/', UserDonationListView.as_view(), name='create-donation'),  
]