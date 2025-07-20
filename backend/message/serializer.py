from rest_framework import serializers
from .models import Message

class MessageSerializer(serializers.ModelSerializer):
    sender_username = serializers.SerializerMethodField()

    class Meta:
        model = Message
        fields = ['id', 'sender', 'recipient', 'content', 'timestamp', 'sender_username']
        read_only_fields = ['id', 'timestamp', 'sender', 'sender_username']

    def get_sender_username(self, obj):
        
        return obj.sender.username

    def create(self, validated_data):
        request = self.context.get('request')
        if request and hasattr(request, 'user'):
            validated_data['sender'] = request.user
        return super().create(validated_data)
