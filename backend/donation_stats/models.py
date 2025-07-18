from django.db import models

class Scheme(models.Model):
    slug = models.SlugField(unique=True)  # e.g., 'sea-turtle'
    name = models.CharField(max_length=100)  # e.g., 'Sea Turtle Conservation'
    description = models.TextField(blank=True)
    impact = models.TextField(blank=True)

    def __str__(self):
        return self.name
