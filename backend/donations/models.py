from django.db import models
from django.conf import settings
# Create your models here.

class Donation(models.Model):
    SCHEME_CHOICES = [
    ('coral-reef', 'Coral Reef Protection'),
    ('sea-turtle', 'Sea Turtle Conservation'),
    ('ocean-cleanup', 'Ocean Cleanup Initiative'),
    ('marine-research', 'Marine Research Fund'),
]

    PAYMENT_CHOICES = [
        ('card', 'Credit/Debit Card'),
        ('paypal', 'PayPal'),
        ('apple', 'Apple Pay'),
        ('google', 'Google Pay'),
    ]

    user= models.ForeignKey(settings.AUTH_USER_MODEL,on_delete=models.CASCADE)
    scheme=models.CharField(max_length=100,choices=SCHEME_CHOICES)
    amount=models.DecimalField(max_digits=10,decimal_places=2)
    payment_method = models.CharField(max_length=20, choices=PAYMENT_CHOICES)
    date=models.DateField(auto_now_add=True)
    status=models.CharField(max_length=50,default='completed')
    description=models.TextField(blank=True)
    impact=models.TextField(blank=True)

    def __str__(self):
        return f"{self.user.username} - {self.scheme} - ${self.amount}"