from django.urls import path
from .views import UserDonationListView, CreatePaymentIntentView

urlpatterns = [
    path('create/', UserDonationListView.as_view(), name='create-donation'),  
    path('create-payment/', CreatePaymentIntentView.as_view(), name='create-payment'),
]