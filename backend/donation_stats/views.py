from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from donations.models import Donation  

class UserDonationStatsView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        user = request.user
        donations = Donation.objects.filter(user=user)
        total_amount = sum(d.amount for d in donations)
        count = donations.count()
        return Response({
            'total_amount': total_amount,
            'donation_count': count,
            'ocean_points': total_amount * 2,
            'donations': [
                {
                    'id': d.id,
                    'scheme': dict(Donation.SCHEME_CHOICES).get(d.scheme, d.scheme),
                    'amount': d.amount,
                    'date': d.date,
                    'status': d.status,
                    'description': d.description,
                    'impact': d.impact,
                } for d in donations
            ]
        })