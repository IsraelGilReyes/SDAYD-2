from rest_framework import serializers
from .models import Rol, Usuario, Ciudadano, TipoIncidente, Ubicacion, Incidente

class RolSerializer(serializers.ModelSerializer):
    class Meta:
        model = Rol
        fields = '__all__'

class UsuarioSerializer(serializers.ModelSerializer):
    rol_nombre = serializers.ReadOnlyField(source='rol.rol')

    class Meta:
        model = Usuario
        fields = ['id_usuario', 'usuario', 'rol', 'rol_nombre', 'email']
        read_only_fields = ['rol_nombre']

class CiudadanoSerializer(serializers.ModelSerializer):
    class Meta:
        model = Ciudadano
        fields = '__all__'

class TipoIncidenteSerializer(serializers.ModelSerializer):
    class Meta:
        model = TipoIncidente
        fields = '__all__'

class UbicacionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Ubicacion
        fields = '__all__'

class IncidenteSerializer(serializers.ModelSerializer):
    id_ciudadano = CiudadanoSerializer(read_only=True)
    id_usuario = UsuarioSerializer(read_only=True)
    id_tipoincidente = TipoIncidenteSerializer(read_only=True)
    id_ubicacion = UbicacionSerializer(read_only=True)

    ciudadano_id = serializers.PrimaryKeyRelatedField(queryset=Ciudadano.objects.all(), source='id_ciudadano', write_only=True)
    usuario_id = serializers.PrimaryKeyRelatedField(queryset=Usuario.objects.all(), source='id_usuario', write_only=True, allow_null=True)
    tipoincidente_id = serializers.PrimaryKeyRelatedField(queryset=TipoIncidente.objects.all(), source='id_tipoincidente', write_only=True)
    ubicacion_id = serializers.PrimaryKeyRelatedField(queryset=Ubicacion.objects.all(), source='id_ubicacion', write_only=True)

    class Meta:
        model = Incidente
        fields = [
            'id_incidente',
            'id_ciudadano', 'ciudadano_id',
            'id_usuario', 'usuario_id',
            'id_tipoincidente', 'tipoincidente_id',
            'id_ubicacion', 'ubicacion_id',
            'prioridad',
            'descripcion',
            'fecha_hora_registro',
        ]
        read_only_fields = ['fecha_hora_registro']
