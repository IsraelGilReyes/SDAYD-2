from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from rest_framework import status
from .models import Incidente
from .serializers import CreateIncidentSerializer, IncidenteSerializer
from rest_framework.permissions import IsAuthenticated
import logging

# Configurar logging para ver errores detallados
logger = logging.getLogger(__name__)

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
    logger.info(f"Datos recibidos: {request.data}")
    
    serializer = CreateIncidentSerializer(data=request.data)
    if serializer.is_valid():
        try:
            logger.info("Datos validados correctamente, creando incidente...")
            # PASO CLAVE: Asignar el usuario autenticado como operador
            incidente = serializer.save(operatorId=None)  # No usar operatorId del frontend
            incidente.id_usuario = request.user
            incidente.save()
            logger.info(f"Incidente creado exitosamente con ID: {incidente.id_incidente}")
            
            # Respuesta que coincide con el tipo TypeScript del frontend
            response_data = {
                'success': True,
                'message': 'Incidente creado exitosamente',
                'incident': {
                    'id': incidente.id_incidente,
                    'type': incidente.id_tipoincidente.nombre if incidente.id_tipoincidente else 'Sin tipo',
                    'briefDescription': incidente.descripcion,
                    'name': incidente.id_ciudadano.nombre,
                    'phone': incidente.id_ciudadano.no_telefono,
                    'personType': incidente.id_ciudadano.tipo_persona,
                    'priority': incidente.prioridad,
                    'date': incidente.fecha_hora_registro.date().isoformat(),
                    'time': incidente.fecha_hora_registro.time().strftime('%I:%M %p'),
                    'operatorName': incidente.id_usuario.username if incidente.id_usuario else 'Sin operador',
                    'operatorRole': 'admin' if incidente.id_usuario and incidente.id_usuario.is_staff else 'user' if incidente.id_usuario else 'Sin rol',
                    'submittedAt': incidente.fecha_hora_registro.isoformat()
                }
            }
            
            logger.info(f"Enviando respuesta exitosa: {response_data}")
            return Response(response_data, status=status.HTTP_201_CREATED)
        except Exception as e:
            logger.error(f"Error al crear el incidente: {str(e)}")
            logger.error(f"Tipo de error: {type(e).__name__}")
            import traceback
            logger.error(f"Traceback: {traceback.format_exc()}")
            
            error_response = {
                'success': False,
                'message': f'Error interno del servidor: {str(e)}',
                'errors': {'general': [str(e)]}
            }
            logger.error(f"Enviando respuesta de error: {error_response}")
            return Response(error_response, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
    else:
        logger.warning(f"Error de validación: {serializer.errors}")
        error_response = {
            'success': False,
            'message': 'Error de validación en los datos enviados',
            'errors': serializer.errors
        }
        logger.warning(f"Enviando respuesta de validación: {error_response}")
        return Response(error_response, status=status.HTTP_400_BAD_REQUEST)


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

