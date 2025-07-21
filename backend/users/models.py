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
    
class Activity(models.Model):
    TYPE_CHOICES = [
        ('game', 'Game'),
        ('donation', 'Donation'),
        ('community', 'Community'),
    ]
    user = models.ForeignKey(CustomUser, on_delete=models.CASCADE, related_name='activities')
    type = models.CharField(max_length=20, choices=TYPE_CHOICES)
    description = models.TextField()
    points = models.IntegerField()
    timestamp = models.DateTimeField(auto_now_add=True)

class Achievement(models.Model):
    name = models.CharField(max_length=100)
    description = models.CharField(max_length=255)

class UserAchievement(models.Model):
    user = models.ForeignKey(CustomUser, on_delete=models.CASCADE, related_name='user_achievements')
    achievement = models.ForeignKey(Achievement, on_delete=models.CASCADE)
    earned = models.BooleanField(default=False)