from rest_framework import serializers
from django.contrib.auth import get_user_model
from django.contrib.auth.hashers import make_password

User = get_user_model()

class UserSerializer(serializers.ModelSerializer):
    full_name = serializers.SerializerMethodField()
    role_display = serializers.SerializerMethodField()
    
    class Meta:
        model = User
        fields = [
            'id', 'username', 'email', 'first_name', 'last_name', 'full_name',
            'role', 'role_display', 'phone', 'department', 'profile_picture',
            'employee_id', 'is_active', 'date_joined', 'last_login', 
            'date_joined_ssgi', 'is_super_admin', 'can_manage_users'
        ]
        read_only_fields = ['id', 'date_joined', 'last_login', 'is_super_admin', 'can_manage_users']
    
    def get_full_name(self, obj):
        return obj.get_full_name() or obj.username
    
    def get_role_display(self, obj):
        return obj.get_role_display()
    
    def create(self, validated_data):
        password = validated_data.pop('password', None)
        user = User(**validated_data)
        if password:
            user.set_password(password)
        user.save()
        return user
    
    def update(self, instance, validated_data):
        password = validated_data.pop('password', None)
        for attr, value in validated_data.items():
            setattr(instance, attr, value)
        if password:
            instance.set_password(password)
        instance.save()
        return instance


class UserCreateSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True, required=True, min_length=8)
    confirm_password = serializers.CharField(write_only=True, required=True)
    
    class Meta:
        model = User
        fields = [
            'username', 'email', 'password', 'confirm_password', 'first_name',
            'last_name', 'role', 'phone', 'department', 'employee_id'
        ]
    
    def validate(self, data):
        if data['password'] != data['confirm_password']:
            raise serializers.ValidationError({"confirm_password": "Passwords do not match"})
        return data
    
    def create(self, validated_data):
        validated_data.pop('confirm_password')
        validated_data['password'] = make_password(validated_data['password'])
        return super().create(validated_data)


class UserLoginSerializer(serializers.Serializer):
    username = serializers.CharField(required=True)
    password = serializers.CharField(required=True, write_only=True)


class ChangePasswordSerializer(serializers.Serializer):
    old_password = serializers.CharField(required=True)
    new_password = serializers.CharField(required=True, min_length=8)
    confirm_password = serializers.CharField(required=True)
    
    def validate(self, data):
        if data['new_password'] != data['confirm_password']:
            raise serializers.ValidationError({"confirm_password": "New passwords do not match"})
        return data