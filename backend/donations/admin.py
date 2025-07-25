
from django.contrib import admin
from .models import Donation

# Register your models here.
@admin.register(Donation)
class DonationAdmin(admin.ModelAdmin):
    list_display = ('user', 'scheme', 'amount', 'payment_method', 'date', 'status')
    list_filter = ('scheme', 'payment_method', 'status', 'date')
    search_fields = ('user__username', 'scheme')