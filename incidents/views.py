from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from rest_framework import status
from .models import Incidente
from .serializers import CreateIncidentSerializer, IncidenteSerializer, UpdateIncidentSerializer
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
        return Response({
            'success': False,
            'message': 'Incidente no encontrado'
        }, status=status.HTTP_404_NOT_FOUND)
    
    # Mapear los campos del frontend a los del backend
    mapped_data = {}
    
    # Mapear campos directos
    if 'prioridad' in request.data:
        mapped_data['prioridad'] = request.data['prioridad']
    if 'descripcion' in request.data:
        mapped_data['descripcion'] = request.data['descripcion']
    
    # Mapear campos del ciudadano
    if 'ciudadano_nombre' in request.data:
        mapped_data['ciudadano_nombre'] = request.data['ciudadano_nombre']
    if 'no_telefono' in request.data:
        mapped_data['no_telefono'] = request.data['no_telefono']
    if 'tipo_persona' in request.data:
        mapped_data['tipo_persona'] = request.data['tipo_persona']
    
    # Mapear tipo de incidente
    if 'tipo_incidente' in request.data:
        mapped_data['tipo_incidente'] = request.data['tipo_incidente']
    
    # Mapear campos de ubicación
    location_fields = ['calle', 'numero', 'colonia', 'codigo_postal', 'ciudad', 'pais', 'referencias']
    for field in location_fields:
        if field in request.data:
            mapped_data[field] = request.data[field]
    
    logger.info(f"Datos mapeados para actualización: {mapped_data}")
    
    serializer = UpdateIncidentSerializer(incidente, data=mapped_data, partial=True)
    if serializer.is_valid():
        try:
            updated_incidente = serializer.save()
            
            # Respuesta exitosa
            response_data = {
                'success': True,
                'message': 'Incidente actualizado correctamente',
                'incident': {
                    'id_incidente': updated_incidente.id_incidente,
                    'prioridad': updated_incidente.prioridad,
                    'descripcion': updated_incidente.descripcion,
                    'ciudadano_nombre': updated_incidente.id_ciudadano.nombre,
                    'no_telefono': updated_incidente.id_ciudadano.no_telefono,
                    'tipo_persona': updated_incidente.id_ciudadano.tipo_persona,
                    'tipo_incidente': updated_incidente.id_tipoincidente.nombre if updated_incidente.id_tipoincidente else None,
                    'calle': updated_incidente.id_ubicacion.calle,
                    'numero': updated_incidente.id_ubicacion.numero,
                    'colonia': updated_incidente.id_ubicacion.colonia,
                    'codigo_postal': updated_incidente.id_ubicacion.codigo_postal,
                    'ciudad': updated_incidente.id_ubicacion.ciudad,
                    'pais': updated_incidente.id_ubicacion.pais,
                    'referencias': updated_incidente.id_ubicacion.referencias,
                    'fecha_hora_registro': updated_incidente.fecha_hora_registro.isoformat(),
                }
            }
            
            return Response(response_data, status=status.HTTP_200_OK)
            
        except Exception as e:
            logger.error(f"Error al actualizar incidente: {str(e)}")
            return Response({
                'success': False,
                'message': f'Error interno del servidor: {str(e)}'
            }, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
    else:
        logger.warning(f"Errores de validación: {serializer.errors}")
        return Response({
            'success': False,
            'message': 'Error de validación en los datos enviados',
            'errors': serializer.errors
        }, status=status.HTTP_400_BAD_REQUEST)


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

