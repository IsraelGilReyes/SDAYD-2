from rest_framework import serializers
from .models import Incidente, Ciudadano, TipoIncidente, Ubicacion
from django.contrib.auth.models import User
from django.utils import timezone
from datetime import datetime
import logging

logger = logging.getLogger(__name__)

class CreateIncidentSerializer(serializers.Serializer):
    """
    Serializer para crear incidentes desde el frontend.
    Recibe los datos del formulario y los valida.
    """
    # Campos obligatorios
    type = serializers.CharField(max_length=100, help_text="Tipo de incidente")
    briefDescription = serializers.CharField(max_length=500, help_text="Descripción breve del incidente")
    name = serializers.CharField(max_length=100, help_text="Nombre de la persona que reporta")
    phone = serializers.CharField(max_length=20, help_text="Teléfono de contacto")
    personType = serializers.ChoiceField(
        choices=[
            ('testigo', 'Testigo'),
            ('victima', 'Víctima'),
            ('familiar', 'Familiar'),
        ],
        help_text="Tipo de persona que reporta"
    )
    date = serializers.DateField(help_text="Fecha del incidente")
    time = serializers.CharField(max_length=20, help_text="Hora del incidente (formato 12 horas con AM/PM)")
    priority = serializers.ChoiceField(
        choices=[
            ('alta', 'Alta'),
            ('media', 'Media'),
            ('baja', 'Baja'),
        ],
        default='media',
        help_text="Prioridad del incidente"
    )
    
    # Campos opcionales
    otherType = serializers.CharField(max_length=100, required=False, allow_blank=True, help_text="Tipo personalizado de incidente")
    calle = serializers.CharField(max_length=100, required=False, allow_blank=True, help_text="Calle")
    numero = serializers.CharField(max_length=10, required=False, allow_blank=True, help_text="Número")
    colonia = serializers.CharField(max_length=100, required=False, allow_blank=True, help_text="Colonia")
    codigo_postal = serializers.CharField(max_length=10, required=False, allow_blank=True, help_text="Código postal")
    ciudad = serializers.CharField(max_length=100, required=False, allow_blank=True, help_text="Ciudad")
    pais = serializers.CharField(max_length=100, required=False, allow_blank=True, help_text="País")
    referencias = serializers.CharField(max_length=200, required=False, allow_blank=True, help_text="Referencias de ubicación")
    
    # Campos del operador
    operatorName = serializers.CharField(max_length=100, required=False, allow_blank=True, help_text="Nombre del operador")
    operatorRole = serializers.CharField(max_length=50, required=False, allow_blank=True, help_text="Rol del operador")
    operatorId = serializers.CharField(max_length=50, required=False, allow_blank=True, help_text="ID del operador")
    submittedAt = serializers.DateTimeField(required=False, help_text="Timestamp de envío")

    def validate_type(self, value):
        """Validar que cuando se selecciona 'Otro', se proporcione otherType"""
        if value == 'Otro':
            other_type = self.initial_data.get('otherType')
            if not other_type or other_type.strip() == '':
                raise serializers.ValidationError("Debe especificar el tipo de incidente cuando selecciona 'Otro'")
        return value.strip() if value else value

    def validate_phone(self, value):
        """Validar formato básico del teléfono"""
        import re
        # Remover espacios y caracteres especiales
        phone_clean = re.sub(r'[^\d]', '', value)
        
        if len(phone_clean) < 10:
            raise serializers.ValidationError("El teléfono debe tener al menos 10 dígitos")
        
        if len(phone_clean) > 15:
            raise serializers.ValidationError("El teléfono no puede tener más de 15 dígitos")
        
        return value

    def validate_codigo_postal(self, value):
        """Validar formato del código postal si se proporciona"""
        if value and value.strip():
            if not value.strip().isdigit():
                raise serializers.ValidationError("El código postal debe contener solo números")
            if len(value.strip()) not in [4, 5]:
                raise serializers.ValidationError("El código postal debe tener 4 o 5 dígitos")
        return value

    def validate(self, data):
        """Validaciones adicionales a nivel de objeto"""
        # Si se selecciona 'Otro', usar otherType como tipo principal
        if data.get('type') == 'Otro':
            if not data.get('otherType') or not data.get('otherType').strip():
                raise serializers.ValidationError("Debe especificar el tipo de incidente cuando selecciona 'Otro'")
            data['type'] = data['otherType'].strip()
        
        # Validar que la fecha no sea futura
        if data.get('date'):
            from datetime import date
            if data['date'] > date.today():
                raise serializers.ValidationError("La fecha del incidente no puede ser futura")
        
        return data

    def _get_or_create_ciudadano(self, validated_data):
        """Método auxiliar para obtener o crear ciudadano"""
        try:
            ciudadano = Ciudadano.objects.get(
                nombre=validated_data['name'],
                no_telefono=validated_data['phone']
            )
            logger.info(f"Ciudadano encontrado: {ciudadano}")
            return ciudadano
        except Ciudadano.DoesNotExist:
            ciudadano = Ciudadano(
                nombre=validated_data['name'],
                no_telefono=validated_data['phone'],
                tipo_persona=validated_data['personType']
            )
            ciudadano.save()
            logger.info(f"Ciudadano creado: {ciudadano}")
            return ciudadano

    def _get_or_create_tipo_incidente(self, tipo_nombre):
        """Método auxiliar para obtener o crear tipo de incidente"""
        try:
            tipo_incidente = TipoIncidente.objects.get(nombre=tipo_nombre)
            logger.info(f"Tipo de incidente encontrado: {tipo_incidente}")
            return tipo_incidente
        except TipoIncidente.DoesNotExist:
            tipo_incidente = TipoIncidente(nombre=tipo_nombre)
            tipo_incidente.save()
            logger.info(f"Tipo de incidente creado: {tipo_incidente}")
            return tipo_incidente

    def _create_ubicacion(self, validated_data):
        """Método auxiliar para crear ubicación"""
        ubicacion_data = {
            'calle': validated_data.get('calle', '') or 'Sin especificar',
            'numero': validated_data.get('numero', '') or '',
            'colonia': validated_data.get('colonia', '') or '',
            'ciudad': validated_data.get('ciudad', '') or 'Sin especificar',
            'pais': validated_data.get('pais', '') or 'Sin especificar',
            'referencias': validated_data.get('referencias', '') or ''
        }
        
        # Manejar código postal
        codigo_postal = validated_data.get('codigo_postal', '')
        if codigo_postal and codigo_postal.strip() and codigo_postal.strip().isdigit():
            ubicacion_data['codigo_postal'] = int(codigo_postal.strip())
        else:
            ubicacion_data['codigo_postal'] = None
        
        ubicacion = Ubicacion(**ubicacion_data)
        ubicacion.save()
        logger.info(f"Ubicación creada: {ubicacion}")
        return ubicacion

    def create(self, validated_data):
        """Crear un nuevo incidente en la base de datos"""
        try:
            logger.info(f"Creando incidente con datos: {validated_data}")
            
            # 1. Crear o obtener el ciudadano
            ciudadano = self._get_or_create_ciudadano(validated_data)
            
            # 2. Crear o obtener el tipo de incidente
            tipo_incidente = self._get_or_create_tipo_incidente(validated_data['type'])
            
            # 3. Crear la ubicación
            ubicacion = self._create_ubicacion(validated_data)

            # 4. El usuario operador será asignado en la vista, no aquí
            usuario = None
            # if validated_data.get('operatorId'):
            #     try:
            #         usuario = User.objects.get(id=validated_data['operatorId'])
            #         logger.info(f"Usuario operador encontrado: {usuario}")
            #     except User.DoesNotExist:
            #         logger.warning(f"Usuario operador no encontrado: {validated_data['operatorId']}")

            # 5. Crear el incidente
            incidente = Incidente(
                id_ciudadano=ciudadano,
                id_usuario=usuario,  # Será sobreescrito en la vista
                id_tipoincidente=tipo_incidente,
                id_ubicacion=ubicacion,
                prioridad=validated_data.get('priority', 'media'),
                descripcion=validated_data['briefDescription']
            )
            
            incidente.save()
            logger.info(f"Incidente creado exitosamente: {incidente}")
            return incidente

        except Exception as e:
            logger.error(f"Error en create(): {str(e)}")
            logger.error(f"Tipo de error: {type(e).__name__}")
            import traceback
            logger.error(f"Traceback: {traceback.format_exc()}")
            raise serializers.ValidationError(f"Error al crear el incidente: {str(e)}")

    def to_representation(self, instance):
        """Personalizar la representación del incidente creado"""
        return {
            'id': instance.id_incidente,
            'type': instance.id_tipoincidente.nombre if instance.id_tipoincidente else None,
            'description': instance.descripcion,
            'citizen': {
                'name': instance.id_ciudadano.nombre,
                'phone': instance.id_ciudadano.no_telefono,
                'type': instance.id_ciudadano.tipo_persona
            },
            'priority': instance.prioridad,
            'location': {
                'street': instance.id_ubicacion.calle,
                'number': instance.id_ubicacion.numero,
                'neighborhood': instance.id_ubicacion.colonia,
                'city': instance.id_ubicacion.ciudad,
                'country': instance.id_ubicacion.pais,
                'postalCode': instance.id_ubicacion.codigo_postal,
                'references': instance.id_ubicacion.referencias
            },
            'operator': {
                'name': instance.id_usuario.username if instance.id_usuario else None,
                'role': 'admin' if instance.id_usuario and instance.id_usuario.is_staff else 'user' if instance.id_usuario else None
            },
            'createdAt': instance.fecha_hora_registro.isoformat(),
            'status': 'created'
        }

class UpdateIncidentSerializer(serializers.ModelSerializer):
    """
    Serializer para actualizar incidentes.
    Permite actualizar campos específicos del incidente.
    """
    # Campos que se pueden actualizar directamente
    prioridad = serializers.ChoiceField(
        choices=[
            ('alta', 'Alta'),
            ('media', 'Media'),
            ('baja', 'Baja'),
        ],
        required=False
    )
    descripcion = serializers.CharField(max_length=500, required=False)
    
    # Campos relacionados con ciudadano
    ciudadano_nombre = serializers.CharField(required=False)
    no_telefono = serializers.CharField(max_length=20, required=False)
    tipo_persona = serializers.ChoiceField(
        choices=[
            ('testigo', 'Testigo'),
            ('victima', 'Víctima'),
            ('familiar', 'Familiar'),
        ],
        required=False
    )
    
    # Campos relacionados con tipo de incidente
    tipo_incidente = serializers.CharField(required=False)
    
    # Campos relacionados con ubicación
    calle = serializers.CharField(max_length=200, required=False)
    numero = serializers.CharField(max_length=10, required=False, allow_blank=True)
    colonia = serializers.CharField(max_length=100, required=False, allow_blank=True)
    codigo_postal = serializers.CharField(max_length=10, required=False, allow_blank=True)
    ciudad = serializers.CharField(max_length=100, required=False)
    pais = serializers.CharField(max_length=100, required=False)
    referencias = serializers.CharField(max_length=200, required=False, allow_blank=True)
    
    class Meta:
        model = Incidente
        fields = [
            'prioridad', 'descripcion', 'ciudadano_nombre', 'no_telefono', 'tipo_persona',
            'tipo_incidente', 'calle', 'numero', 'colonia', 'codigo_postal', 'ciudad', 'pais', 'referencias'
        ]

    def update(self, instance, validated_data):
        """Actualizar incidente con datos validados"""
        try:
            # Actualizar campos directos del incidente
            instance.prioridad = validated_data.get('prioridad', instance.prioridad)
            instance.descripcion = validated_data.get('descripcion', instance.descripcion)
            
            # Actualizar campos del ciudadano
            if any(field in validated_data for field in ['ciudadano_nombre', 'no_telefono', 'tipo_persona']):
                ciudadano = instance.id_ciudadano
                ciudadano.nombre = validated_data.get('ciudadano_nombre', ciudadano.nombre)
                ciudadano.no_telefono = validated_data.get('no_telefono', ciudadano.no_telefono)
                ciudadano.tipo_persona = validated_data.get('tipo_persona', ciudadano.tipo_persona)
                ciudadano.save()
            
            # Actualizar tipo de incidente
            if 'tipo_incidente' in validated_data:
                tipo_nombre = validated_data['tipo_incidente']
                try:
                    tipo_incidente = TipoIncidente.objects.get(nombre=tipo_nombre)
                except TipoIncidente.DoesNotExist:
                    tipo_incidente = TipoIncidente.objects.create(nombre=tipo_nombre)
                instance.id_tipoincidente = tipo_incidente
            
            # Actualizar campos de ubicación
            if any(field in validated_data for field in ['calle', 'numero', 'colonia', 'codigo_postal', 'ciudad', 'pais', 'referencias']):
                ubicacion = instance.id_ubicacion
                ubicacion.calle = validated_data.get('calle', ubicacion.calle)
                ubicacion.numero = validated_data.get('numero', ubicacion.numero)
                ubicacion.colonia = validated_data.get('colonia', ubicacion.colonia)
                ubicacion.ciudad = validated_data.get('ciudad', ubicacion.ciudad)
                ubicacion.pais = validated_data.get('pais', ubicacion.pais)
                ubicacion.referencias = validated_data.get('referencias', ubicacion.referencias)
                
                # Manejar código postal
                codigo_postal = validated_data.get('codigo_postal')
                if codigo_postal and codigo_postal.strip() and codigo_postal.strip().isdigit():
                    ubicacion.codigo_postal = int(codigo_postal.strip())
                elif codigo_postal == '':
                    ubicacion.codigo_postal = None
                    
                ubicacion.save()
            
            instance.save()
            return instance
            
        except Exception as e:
            logger.error(f"Error actualizando incidente: {str(e)}")
            raise serializers.ValidationError(f"Error al actualizar incidente: {str(e)}")

class IncidenteSerializer(serializers.ModelSerializer):
    ciudadano_nombre = serializers.CharField(source='id_ciudadano.nombre', read_only=True)
    tipo_incidente = serializers.CharField(source='id_tipoincidente.nombre', read_only=True)
    calle = serializers.CharField(source='id_ubicacion.calle', read_only=True)
    numero = serializers.CharField(source='id_ubicacion.numero', read_only=True)
    colonia = serializers.CharField(source='id_ubicacion.colonia', read_only=True)
    codigo_postal = serializers.CharField(source='id_ubicacion.codigo_postal', read_only=True)
    ciudad = serializers.CharField(source='id_ubicacion.ciudad', read_only=True)
    pais = serializers.CharField(source='id_ubicacion.pais', read_only=True)
    referencias = serializers.CharField(source='id_ubicacion.referencias', read_only=True)
    # NUEVOS CAMPOS:
    no_telefono = serializers.CharField(source='id_ciudadano.no_telefono', read_only=True)
    tipo_persona = serializers.CharField(source='id_ciudadano.tipo_persona', read_only=True)
    operador_nombre = serializers.CharField(source='id_usuario.username', read_only=True)
    operador_rol = serializers.SerializerMethodField()

    def get_operador_rol(self, obj):
        if obj.id_usuario:
            if hasattr(obj.id_usuario, 'rol'):
                return obj.id_usuario.rol
            elif obj.id_usuario.is_superuser:
                return 'admin'
            elif obj.id_usuario.is_staff:
                return 'admin'
            else:
                return 'user'
        return None

    class Meta:
        model = Incidente
        fields = [
            'id_incidente', 'ciudadano_nombre', 'tipo_incidente', 'calle', 'numero', 'colonia',
            'codigo_postal', 'ciudad', 'pais', 'referencias', 'prioridad', 'descripcion', 'fecha_hora_registro',
            # Agrega los nuevos campos aquí:
            'no_telefono', 'tipo_persona', 'operador_nombre', 'operador_rol'
        ]
