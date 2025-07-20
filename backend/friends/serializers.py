from rest_framework import serializers
from .models import Friend, FriendRequest

class FriendSerializer(serializers.ModelSerializer):
    friend_user_id = serializers.IntegerField(source='user.id', read_only=True)
    class Meta:
        model = Friend
        fields = '__all__'

class FriendRequestSerializer(serializers.ModelSerializer):
    from_user = serializers.ReadOnlyField(source='from_user.username')
    to_user = serializers.ReadOnlyField(source='to_user.username')

    class Meta:
        model = FriendRequest
        fields = ['id', 'from_user', 'to_user', 'status', 'timestamp']
