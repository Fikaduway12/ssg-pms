# backend/apps/users/models.py

from django.contrib.auth.models import AbstractUser
from django.db import models


class User(AbstractUser):
    ROLE_CHOICES = (
        ("SUPERADMIN", "Super Admin"),
        ("DG", "Director General"),
        ("DDG", "Deputy Director General"),
        ("LEO", "Legal Officer"),
        ("STAFF", "Staff"),
    )

    role = models.CharField(max_length=20, choices=ROLE_CHOICES, default="STAFF")
    phone = models.CharField(max_length=20, blank=True, null=True)

    def __str__(self):
        return f"{self.username} - {self.role}"