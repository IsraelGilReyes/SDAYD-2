#!/usr/bin/env python3
"""
Script simple para crear usuario administrador
"""
import os
import sys
import django

# Configurar Django
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'backend.settings')
django.setup()

from django.contrib.auth.models import User
from authentication.models import Role, UserRole

def main():
    print("🚀 Creando usuario administrador...")
    
    # 1. Crear roles básicos
    print("📋 Creando roles...")
    user_role, created = Role.objects.get_or_create(
        name='usuario',
        defaults={'description': 'Usuario normal', 'is_active': True}
    )
    if created:
        print("✅ Rol 'usuario' creado")
    else:
        print("ℹ️  Rol 'usuario' ya existe")

    admin_role, created = Role.objects.get_or_create(
        name='administrador', 
        defaults={'description': 'Administrador del sistema', 'is_active': True}
    )
    if created:
        print("✅ Rol 'administrador' creado")
    else:
        print("ℹ️  Rol 'administrador' ya existe")

    # 2. Crear usuario admin
    print("\n👤 Creando usuario administrador...")
    try:
        admin_user = User.objects.get(username='admin')
        print("ℹ️  Usuario 'admin' ya existe")
    except User.DoesNotExist:
        admin_user = User.objects.create_user(
            username='admin',
            email='admin@example.com',
            password='admin123',
            is_staff=True,
            is_superuser=True
        )
        print("✅ Usuario 'admin' creado exitosamente")

    # 3. Asignar rol de administrador
    print("🔑 Asignando rol de administrador...")
    user_role_obj, created = UserRole.objects.get_or_create(
        user=admin_user,
        role=admin_role
    )
    if created:
        print("✅ Rol 'administrador' asignado al usuario 'admin'")
    else:
        print("ℹ️  Usuario 'admin' ya tiene rol de administrador")

    print("\n🎉 ¡Usuario administrador configurado!")
    print("📝 Credenciales:")
    print("   Username: admin")
    print("   Password: admin123")
    print("   Rol: administrador")

if __name__ == "__main__":
    main()
