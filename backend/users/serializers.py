from rest_framework import serializers
from django.db.models import Sum
from .models import CustomUser,Activity,Achievement,UserAchievement
from django.contrib.auth.password_validation import validate_password
from donations.models import Donation
from community.models import Discussion
from friends.models import Friend

class RegisterSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True, required=True, validators=[validate_password])
    class Meta:
        model = CustomUser
        fields = ['id', 'username', 'email', 'password', 'full_name', 'phone', 'marine_character']

    def create(self, validated_data):
        user = CustomUser.objects.create_user(
            username=validated_data['username'],
            email=validated_data['email'],
            password=validated_data['password'],
            full_name=validated_data.get('full_name', ''),
            phone=validated_data.get('phone', ''),
            marine_character=validated_data.get('marine_character', 'dolphin'),
        )
        return user

class CustomUserSerializer(serializers.ModelSerializer):
    fullName = serializers.CharField(source='full_name')
    class Meta:
        model = CustomUser
        fields = [
            'id', 'username', 'email', 'phone', 'marine_character',
            'join_date', 'points', 'status', 'fullName'
        ]
        
class ActivitySerializer(serializers.ModelSerializer):
    time = serializers.SerializerMethodField()

    class Meta:
        model = Activity
        fields = ['id', 'type', 'description', 'points', 'time']

    def get_time(self, obj):
        from django.utils.timesince import timesince
        return timesince(obj.timestamp) + " ago"

class AchievementSerializer(serializers.ModelSerializer):
    earned = serializers.SerializerMethodField()

    class Meta:
        model = Achievement
        fields = ['name', 'description', 'earned']

    def get_earned(self, obj):
        user = self.context.get('user')
        return UserAchievement.objects.filter(user=user, achievement=obj, earned=True).exists()

class UserDashboardSerializer(serializers.ModelSerializer):
    recent_activities = serializers.SerializerMethodField()
    achievements = serializers.SerializerMethodField()
    games_won = serializers.SerializerMethodField()
    total_donated = serializers.SerializerMethodField()
    posts_made = serializers.SerializerMethodField()
    friends = serializers.SerializerMethodField()

    class Meta:
        model = CustomUser
        fields = [
            'full_name', 'username', 'marine_character', 'points',
            'recent_activities', 'achievements',
            'games_won', 'total_donated', 'posts_made', 'friends'
        ]

    def get_recent_activities(self, obj):
        activities = obj.activities.order_by('-timestamp')[:5]
        return ActivitySerializer(activities, many=True).data

    def get_achievements(self, obj):
        achievements = Achievement.objects.all()
        return AchievementSerializer(achievements, many=True, context={'user': obj}).data

    def get_games_won(self, obj):
        return obj.activities.filter(type='game').count()

    def get_total_donated(self, obj):
        return Donation.objects.filter(user=obj).aggregate(total=Sum('amount'))['total'] or 0

    def get_posts_made(self, obj):
        return Discussion.objects.filter(author=obj).count()

    def get_friends(self, obj):
        return Friend.objects.filter(user=obj).count()
    
class CreateActivitySerializer(serializers.ModelSerializer):
    class Meta:
        model = Activity
        fields = ['type', 'description', 'points']

    def create(self, validated_data):
        return Activity.objects.create(user=self.context['request'].user, **validated_data)
    

class LeaderboardUserSerializer(serializers.ModelSerializer):
    class Meta:
        model = CustomUser
        fields = ['username', 'marine_character', 'points']