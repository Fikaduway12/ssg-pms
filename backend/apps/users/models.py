from django.contrib.auth.models import AbstractUser
from django.db import models
from django.utils import timezone


class User(AbstractUser):
    ROLE_CHOICES = (
        ("SUPERADMIN", "Super Admin"),
        ("DG", "Director General"),
        ("DDG", "Deputy Director General"),
        ("DIVISION_HEAD", "Division Head"),
        ("RESEARCH_SCIENTIST", "Research Scientist"),
        ("GIS_SPECIALIST", "GIS Specialist"),
        ("DATA_ANALYST", "Data Analyst"),
        ("LEGAL_OFFICER", "Legal Officer"),
        ("ADMIN_STAFF", "Admin Staff"),
        ("STAFF", "Staff"),
    )
    
    role = models.CharField(max_length=20, choices=ROLE_CHOICES, default="STAFF")
    phone = models.CharField(max_length=20, blank=True, null=True)
    department = models.CharField(max_length=100, blank=True, null=True)
    profile_picture = models.ImageField(upload_to='profile_pics/', blank=True, null=True)
    employee_id = models.CharField(max_length=50, unique=True, blank=True, null=True)
    date_joined_ssgi = models.DateField(default=timezone.now)
    is_active = models.BooleanField(default=True)
    last_login_ip = models.GenericIPAddressField(blank=True, null=True)
    
    class Meta:
        db_table = 'users'
        verbose_name = 'User'
        verbose_name_plural = 'Users'
        ordering = ['-date_joined']
    
    def __str__(self):
        return f"{self.get_full_name() or self.username} - {self.get_role_display()}"
    
    @property
    def is_super_admin(self):
        return self.role == "SUPERADMIN" or self.is_superuser
    
    @property
    def is_director(self):
        return self.role in ["DG", "DDG"]
    
    @property
    def can_manage_users(self):
        return self.role in ["SUPERADMIN", "DG", "DDG", "DIVISION_HEAD"]
    
    def get_role_display_name(self):
        return dict(self.ROLE_CHOICES).get(self.role, self.role)