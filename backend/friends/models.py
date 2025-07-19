from django.db import models
from django.conf import settings

class Friend(models.Model):
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name='friends')
    username = models.CharField(max_length=150)
    full_name = models.CharField(max_length=150)
    marine_character = models.CharField(max_length=50)
    points = models.IntegerField(default=0)

    STATUS_CHOICES = [
        ('online', 'Online'),
        ('recently', 'Recently Active'),
        ('offline', 'Offline'),
    ]
    status = models.CharField(max_length=10, choices=STATUS_CHOICES, default='offline')
    last_seen = models.CharField(max_length=100, default="unknown")

    def __str__(self):
        return f"{self.full_name} ({self.username})"


class FriendRequest(models.Model):
    from_user = models.ForeignKey(settings.AUTH_USER_MODEL, related_name='sent_requests', on_delete=models.CASCADE)
    to_user = models.ForeignKey(settings.AUTH_USER_MODEL, related_name='received_requests', on_delete=models.CASCADE)
    status = models.CharField(max_length=10, choices=[('pending', 'Pending'), ('accepted', 'Accepted'), ('rejected', 'Rejected')], default='pending')
    timestamp = models.DateTimeField(auto_now_add=True)

    class Meta:
        unique_together = ('from_user', 'to_user')

    def __str__(self):
        return f"{self.from_user.username} → {self.to_user.username} ({self.status})"
