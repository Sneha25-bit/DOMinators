from rest_framework import serializers
from .models import Discussion, Comment
from django.contrib.auth import get_user_model

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = get_user_model()
        fields = ['username', 'full_name','marine_character', 'points', 'status']
        
class DiscussionSerializer(serializers.ModelSerializer):
    author = UserSerializer(read_only=True)
    liked_by_user = serializers.SerializerMethodField()
    replies = serializers.SerializerMethodField()
    
    class Meta:
        model = Discussion
        fields = '__all__'
    
    def get_liked_by_user(self, obj):
        request = self.context.get('request')
        if request and request.user.is_authenticated:
            return obj.liked_by.filter(user=request.user).exists()
        return False
    
    def get_replies(self, obj):
        return obj.comments.count()
        
class CommentSerializer(serializers.ModelSerializer):
    user = UserSerializer(read_only = True)

    class Meta:
        model = Comment
        fields = ['id', 'user', 'content', 'created_at']
