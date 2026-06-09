from django.contrib import admin
from django.contrib.auth.admin import UserAdmin
from .models import User


@admin.register(User)
class CustomUserAdmin(UserAdmin):
    list_display = ('username', 'email', 'first_name', 'last_name', 'role', 'department', 'is_active')
    list_filter = ('role', 'department', 'is_active', 'is_staff')
    search_fields = ('username', 'email', 'first_name', 'last_name', 'employee_id')
    
    fieldsets = UserAdmin.fieldsets + (
        ('SSGI Information', {
            'fields': ('role', 'phone', 'department', 'employee_id', 'date_joined_ssgi', 'last_login_ip')
        }),
    )
    
    add_fieldsets = UserAdmin.add_fieldsets + (
        ('SSGI Information', {
            'fields': ('role', 'phone', 'department', 'employee_id')
        }),
    )