from django.urls import path
from .views import OceanView

urlpatterns = [
    path('ocean/', OceanView.as_view(), name='ocean'),
]