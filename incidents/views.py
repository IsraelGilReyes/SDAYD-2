
from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from rest_framework import status
from .models import Incidente
from .serializers import IncidenteSerializer
from rest_framework.permissions import IsAuthenticated

# Obtener todos los incidentes (GET)
@api_view(['GET'])
def get_incidentes(request):
    incidentes = Incidente.objects.all()
    serializer = IncidenteSerializer(incidentes, many=True)
    return Response(serializer.data)

# Crear un nuevo incidente (POST)
@api_view(['POST'])
@permission_classes([IsAuthenticated])  # Permitir acceso sin autenticación
def create_incidente(request):
    serializer = IncidenteSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

# Obtener un incidente por ID (GET)
@api_view(['GET'])
def get_incidente_by_id(request, id_incidente):
    try:
        incidente = Incidente.objects.get(pk=id_incidente)
    except Incidente.DoesNotExist:
        return Response({'error': 'Incidente no encontrado'}, status=status.HTTP_404_NOT_FOUND)
    serializer = IncidenteSerializer(incidente)
    return Response(serializer.data)
