# Generated by Django 5.2.2 on 2025-06-08 05:27

import django.db.models.deletion
from django.conf import settings
from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
        migrations.CreateModel(
            name='Permission',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=100, unique=True)),
                ('codename', models.CharField(max_length=100, unique=True)),
                ('description', models.TextField(blank=True, null=True)),
                ('created_at', models.DateTimeField(auto_now_add=True)),
            ],
            options={
                'verbose_name': 'Permiso',
                'verbose_name_plural': 'Permisos',
            },
        ),
        migrations.CreateModel(
            name='Role',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=100, unique=True)),
                ('description', models.TextField(blank=True, null=True)),
                ('is_active', models.BooleanField(default=True)),
                ('created_at', models.DateTimeField(auto_now_add=True)),
                ('updated_at', models.DateTimeField(auto_now=True)),
            ],
            options={
                'verbose_name': 'Rol',
                'verbose_name_plural': 'Roles',
            },
        ),
        migrations.CreateModel(
            name='Menu',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=100)),
                ('path', models.CharField(max_length=200)),
                ('component', models.CharField(max_length=200)),
                ('icon', models.CharField(blank=True, max_length=50, null=True)),
                ('sort_order', models.IntegerField(default=0)),
                ('is_active', models.BooleanField(default=True)),
                ('created_at', models.DateTimeField(auto_now_add=True)),
                ('updated_at', models.DateTimeField(auto_now=True)),
                ('parent', models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, related_name='children', to='authentication.menu')),
                ('roles', models.ManyToManyField(related_name='menus', to='authentication.role')),
            ],
            options={
                'verbose_name': 'Menú',
                'verbose_name_plural': 'Menús',
                'ordering': ['sort_order', 'name'],
            },
        ),
        migrations.CreateModel(
            name='RolePermission',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('assigned_at', models.DateTimeField(auto_now_add=True)),
                ('permission', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='role_permissions', to='authentication.permission')),
                ('role', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='role_permissions', to='authentication.role')),
            ],
            options={
                'verbose_name': 'Permiso de Rol',
                'verbose_name_plural': 'Permisos de Roles',
                'unique_together': {('role', 'permission')},
            },
        ),
        migrations.CreateModel(
            name='UserRole',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('assigned_at', models.DateTimeField(auto_now_add=True)),
                ('assigned_by', models.ForeignKey(null=True, on_delete=django.db.models.deletion.SET_NULL, related_name='role_assignments', to=settings.AUTH_USER_MODEL)),
                ('role', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='user_roles', to='authentication.role')),
                ('user', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='user_roles', to=settings.AUTH_USER_MODEL)),
            ],
            options={
                'verbose_name': 'Rol de Usuario',
                'verbose_name_plural': 'Roles de Usuario',
                'unique_together': {('user', 'role')},
            },
        ),
    ]
