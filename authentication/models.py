from django.db import models
from django.contrib.auth.models import User

class Role(models.Model):
    """
    Modelo para gestionar los diferentes roles de usuario en el sistema.
    Ejemplos típicos: 'Administrador', 'Supervisor', 'Usuario Regular', etc.
    """
    name = models.CharField(max_length=100, unique=True)
    description = models.TextField(null=True, blank=True)
    is_active = models.BooleanField(default=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.name

    class Meta:
        verbose_name = 'Rol'
        verbose_name_plural = 'Roles'


class UserRole(models.Model):
    """
    Modelo puente que relaciona usuarios con roles (relación muchos-a-muchos).
    Registra qué rol(es) tiene asignado cada usuario y quién se los asignó.
    """
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='user_roles')
    role = models.ForeignKey(Role, on_delete=models.CASCADE, related_name='user_roles')
    assigned_at = models.DateTimeField(auto_now_add=True)
    assigned_by = models.ForeignKey(User, on_delete=models.SET_NULL, null=True, related_name='role_assignments')

    class Meta:
        unique_together = ('user', 'role')
        verbose_name = 'Rol de Usuario'
        verbose_name_plural = 'Roles de Usuario'

    def __str__(self):
        return f"{self.user.username} - {self.role.name}"
