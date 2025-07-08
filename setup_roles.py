#!/usr/bin/env python3
"""
Script para configurar los dos roles básicos del sistema.
Ejecutar desde la raíz del proyecto Django: python setup_roles.py
"""

import os
import sys
import django

# Configurar Django
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'backend.settings')
django.setup()

from authentication.models import Role, UserRole
from django.contrib.auth.models import User

def create_basic_roles():
    """Crear los dos roles básicos del sistema"""
    
    print("🚀 Configurando sistema de roles...")
    print("=" * 50)
    
    # 1. Rol de Usuario normal
    user_role, created = Role.objects.get_or_create(
        name='usuario',
        defaults={
            'description': 'Usuario normal del sistema con permisos básicos',
            'is_active': True
        }
    )
    if created:
        print("✅ Rol 'usuario' creado exitosamente")
    else:
        print("ℹ️  Rol 'usuario' ya existe")

    # 2. Rol de Administrador
    admin_role, created = Role.objects.get_or_create(
        name='administrador',
        defaults={
            'description': 'Administrador del sistema con permisos completos',
            'is_active': True
        }
    )
    if created:
        print("✅ Rol 'administrador' creado exitosamente")
    else:
        print("ℹ️  Rol 'administrador' ya existe")

    return user_role, admin_role

def assign_default_roles():
    """Asignar rol de usuario a todos los usuarios sin rol"""
    
    try:
        user_role = Role.objects.get(name='usuario')
        users_without_role = User.objects.filter(user_roles__isnull=True)
        
        count = 0
        for user in users_without_role:
            UserRole.objects.get_or_create(
                user=user,
                role=user_role,
                defaults={'assigned_by': None}
            )
            count += 1
        
        if count > 0:
            print(f"✅ Asignado rol 'usuario' a {count} usuarios")
        else:
            print("ℹ️  Todos los usuarios ya tienen roles asignados")
            
    except Role.DoesNotExist:
        print("❌ Error: Rol 'usuario' no encontrado")

def create_admin_user():
    """Crear un usuario administrador si no existe"""
    
    admin_username = 'admin'
    admin_email = 'admin@example.com'
    admin_password = 'admin123'
    
    # Verificar si ya existe un usuario admin
    if User.objects.filter(username=admin_username).exists():
        print("ℹ️  Usuario administrador ya existe")
        admin_user = User.objects.get(username=admin_username)
    else:
        # Crear usuario administrador
        admin_user = User.objects.create_user(
            username=admin_username,
            email=admin_email,
            password=admin_password,
            is_staff=True,
            is_superuser=True
        )
        print(f"✅ Usuario administrador creado: {admin_username}")
        print(f"   Contraseña: {admin_password}")
    
    # Asignar rol de administrador
    try:
        admin_role = Role.objects.get(name='administrador')
        user_role, created = UserRole.objects.get_or_create(
            user=admin_user,
            role=admin_role,
            defaults={'assigned_by': None}
        )
        if created:
            print("✅ Rol 'administrador' asignado al usuario admin")
        else:
            print("ℹ️  Usuario admin ya tiene rol de administrador")
            
    except Role.DoesNotExist:
        print("❌ Error: Rol 'administrador' no encontrado")

def show_summary():
    """Mostrar resumen de la configuración"""
    
    print("\n" + "="*50)
    print("📋 RESUMEN DE CONFIGURACIÓN")
    print("="*50)
    
    # Contar roles
    total_roles = Role.objects.filter(is_active=True).count()
    print(f"🔑 Roles activos: {total_roles}")
    
    for role in Role.objects.filter(is_active=True):
        user_count = role.user_roles.count()
        print(f"   - {role.name}: {user_count} usuarios")
    
    # Contar usuarios
    total_users = User.objects.count()
    users_with_roles = User.objects.filter(user_roles__isnull=False).distinct().count()
    users_without_roles = total_users - users_with_roles
    
    print(f"\n👥 Usuarios:")
    print(f"   - Total: {total_users}")
    print(f"   - Con roles: {users_with_roles}")
    print(f"   - Sin roles: {users_without_roles}")
    
    print("\n✨ Sistema de roles configurado correctamente!")
    print("\n📝 Credenciales de administrador:")
    print("   Username: admin")
    print("   Password: admin123")

def main():
    """Función principal para configurar el sistema"""
    
    # Crear roles básicos
    user_role, admin_role = create_basic_roles()
    print()
    
    # Asignar roles por defecto a usuarios existentes
    assign_default_roles()
    print()
    
    # Crear usuario administrador
    create_admin_user()
    print()
    
    # Mostrar resumen
    show_summary()

if __name__ == "__main__":
    main()
