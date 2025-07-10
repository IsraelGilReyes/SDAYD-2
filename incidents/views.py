
from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from rest_framework import status
from .models import Incidente
from .serializers import IncidenteSerializer
from rest_framework.permissions import IsAuthenticated

# todos los incidentes (GET)
@api_view(['GET'])
@permission_classes([IsAuthenticated])
def get_incidentes(request):
    incidentes = Incidente.objects.all()
    serializer = IncidenteSerializer(incidentes, many=True)
    return Response(serializer.data)


# Crear (POST)
@api_view(['POST'])
@permission_classes([IsAuthenticated])
def create_incidente(request):
    serializer = IncidenteSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


# Actualizar (PUT)
@api_view(['PUT'])
@permission_classes([IsAuthenticated])
def update_incidente(request, id_incidente):
    try:
        incidente = Incidente.objects.get(pk=id_incidente)
    except Incidente.DoesNotExist:
        return Response({'error': 'Incidente no encontrado'}, status=status.HTTP_404_NOT_FOUND)
    serializer = IncidenteSerializer(incidente, data=request.data, partial=True)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


# Eliminar (DELETE)
@api_view(['DELETE'])
@permission_classes([IsAuthenticated])
def delete_incidente(request, id_incidente):
    try:
        incidente = Incidente.objects.get(pk=id_incidente)
    except Incidente.DoesNotExist:
        return Response({'error': 'Incidente no encontrado'}, status=status.HTTP_404_NOT_FOUND)
    incidente.delete()
    return Response({'message': 'Incidente eliminado correctamente'}, status=status.HTTP_204_NO_CONTENT)


# Obtener un incidente por ID (GET)
@api_view(['GET'])
@permission_classes([IsAuthenticated])
def get_incidente_by_id(request, id_incidente):
    try:
        incidente = Incidente.objects.get(pk=id_incidente)
    except Incidente.DoesNotExist:
        return Response({'error': 'Incidente no encontrado'}, status=status.HTTP_404_NOT_FOUND)
    serializer = IncidenteSerializer(incidente)
    return Response(serializer.data)

