from django.db import models
from django.contrib.auth.models import AbstractUser

# Create your models here.
class CustomUser(AbstractUser):
    full_name = models.CharField(max_length=100)
    phone = models.CharField(max_length=20)
    marine_character = models.CharField(max_length=50, default='dolphin')
    join_date = models.DateTimeField(auto_now_add=True)
    points = models.IntegerField(default=0)

    ONLINE = 'online'
    RECENTLY = 'recently'
    OFFLINE = 'offline'
    STATUS_CHOICES = [
        (ONLINE, 'Online'),
        (RECENTLY, 'Recently'),
        (OFFLINE, 'Offline'),
    ]
    status = models.CharField(max_length=10, choices=STATUS_CHOICES, default=ONLINE)

    def __str__(self):
        return self.username