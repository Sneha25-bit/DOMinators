from django.shortcuts import render
from rest_framework import generics, permissions
from .models import Donation
from .serializers import DonationSerializer
# Create your views here.


class UserDonationListView(generics.ListCreateAPIView):
    serializer_class = DonationSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        return Donation.objects.filter(user=self.request.user)

    def perform_create(self, serializer):
        serializer.save(
            user=self.request.user,
            description="Thank you for your generous contribution!",
            impact="Your donation will directly support marine conservation efforts."
        )