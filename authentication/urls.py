from django.urls import path
from authentication import views
from .views import LoginView  # Importa directamente la clase

urlpatterns = [
    # Autenticación
    path('login/', LoginView.as_view(), name='login'),
    path('logout/', views.logout, name='logout'),
    path('register/', views.register, name='register'),
    path('refresh/', views.refresh_token, name='refresh'),
    
    # Usuarios
    path('info/', views.get_user_info, name='user-info'),
    path('users/', views.get_user_list, name='user-list'),
    path('users/create/', views.create_user_complete, name='user-create-complete'),
    path('users/<int:user_id>/', views.get_user_detail, name='user-detail'),
    path('users/<int:user_id>/update/', views.update_user, name='user-update'),
    path('users/<int:user_id>/delete/', views.delete_user, name='user-delete'),
    path('users/<int:user_id>/change-password/', views.change_user_password, name='user-change-password'),
    
    # Mantener compatibilidad con rutas anteriores
    path('list/', views.get_user_list, name='user-list-legacy'),
    path('create/', views.create_user, name='user-create-legacy'),
    
    # Roles
    path('roles/', views.role_list, name='role-list'),
    path('roles/create/', views.create_role, name='role-create'),
    path('roles/user/', views.get_user_roles, name='user-roles'),
    path('assign-role/', views.assign_role, name='role-assign'),
]
