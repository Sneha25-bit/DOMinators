import stripe
from rest_framework import generics, permissions
from .models import Donation
from .serializers import DonationSerializer
from django.conf import settings
from rest_framework.views import APIView
from rest_framework.response import Response
from django.contrib.auth import get_user_model
from rest_framework.response import Response
from rest_framework import status
from users.models import Activity

stripe.api_key = settings.STRIPE_SECRET_KEY


User = get_user_model()
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



class ConfirmDonationView(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def post(self, request):
        user = request.user
        data = request.data
        scheme = data.get('scheme')
        amount = data.get('amount')
        payment_method = data.get('payment_method')
        payment_intent_id = data.get('payment_intent_id')

        if not all([scheme, amount, payment_method, payment_intent_id]):
            return Response({'error': 'Missing fields'}, status=400)

        try:
            # Create donation
            donation = Donation.objects.create(
                user=user,
                scheme=scheme,
                amount=amount,
                payment_method=payment_method,
                status='completed',
                description=f"Stripe PaymentIntent: {payment_intent_id}"
            )

            added_points = int(float(amount))
            user.points += added_points
            user.save()

            # Log activity
            Activity.objects.create(
                user=user,
                type='donation',
                description=f"Donated ${amount} to {scheme}.",
                points = added_points
            )

            return Response({
                'message': 'Donation recorded successfully.',
                'new_points': user.points
            }, status.HTTP_201_CREATED)

        except Exception as e:
            return Response({'error': str(e)}, status.HTTP_500_INTERNAL_SERVER_ERROR)
