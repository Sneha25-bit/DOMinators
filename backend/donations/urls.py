from django.urls import path
from .views import UserDonationListView, ConfirmDonationView

urlpatterns = [
    path('create/', UserDonationListView.as_view(), name='create-donation'),
    path('create-payment/', ConfirmDonationView.as_view(), name='create-payment'),  
]