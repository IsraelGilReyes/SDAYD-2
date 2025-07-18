from django.urls import path
from . import views

urlpatterns = [
    path('url/', views.get_incidentes, name='get_incidentes'),
    path('create/', views.create_incidente, name='create_incidente'),
    path('<int:id_incidente>/', views.get_incidente_by_id, name='get_incidente_by_id'),
    path('<int:id_incidente>/update/', views.update_incidente, name='update_incidente'),
    path('<int:id_incidente>/delete/', views.delete_incidente, name='delete_incidente'),
]
