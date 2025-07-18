from django.contrib import admin
from django.urls import path, include
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
)

urlpatterns = [
    path('admin/', admin.site.urls),

    # Users app URLs (including user registration, profile, etc.)
    path('api/users/', include('users.urls')),

    # JWT token endpoints - placed explicitly here (not inside users.urls)
    path('api/users/token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('api/users/token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),

    # Other apps
    path('api/ocean-ai/', include('ocean_ai.urls')),
    path('api/community/', include('community.urls')),

    # Donations app
    path('api/donations/', include('donations.urls')),

    # Donation stats API (better to keep under api/)
    path('api/donation-stats/', include('donation_stats.urls')),
]
