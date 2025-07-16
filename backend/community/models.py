from django.db import models
from django.contrib.auth import get_user_model

User = get_user_model()

# Create your models here.
class Discussion(models.Model):
    CATEGORY_CHOICES = [
        ('Experiences', 'Experiences'),
        ('Conservation', 'Conservation'),
        ('Photography', 'Photography'),
        ('Discussion', 'Discussion'),
    ]
    
    author = models.ForeignKey(User, on_delete=models.CASCADE)
    title = models.CharField(max_length=255)
    content = models.TextField()
    category = models.CharField(max_length=50, choices=CATEGORY_CHOICES, default='Discussion')
    likes = models.PositiveIntegerField(default=0)
    replies = models.PositiveIntegerField(default=0) 
    timestamp = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.title
    
