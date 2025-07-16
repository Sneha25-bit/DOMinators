from django.urls import path
from ocean_ai.views.sea_level_views import sea_level_api

urlpatterns = [
    path('predict/', sea_level_api),
]
