from django.db import models

# Modelo: Rol
class Rol(models.Model):
    ROL_CHOICES = [
        ('admin', 'Administrador'),
        ('user','User'),
    ]
    id_rol = models.AutoField(primary_key=True)
    rol = models.CharField(max_length=50, unique=True)

    def __str__(self):
        return self.rol

# Modelo: Usuario
class Usuario(models.Model):
    id_usuario = models.AutoField(primary_key=True)
    usuario = models.CharField(max_length=100, unique=True)
    rol = models.ForeignKey(Rol, on_delete=models.SET_NULL, null=True)
    email = models.EmailField(unique=True)

    def __str__(self):
        return self.usuario

# Modelo: Ciudadano
class Ciudadano(models.Model):
    TIPO_PERSONA_CHOICES = [
        ('victima', 'Víctima'),
        ('testigo', 'Testigo'),
        ('familiar', 'Familiar'),
    ]

    id_ciudadano = models.AutoField(primary_key=True)
    nombre = models.CharField(max_length=100)
    no_telefono = models.CharField(max_length=20, blank=True, null=True)
    tipo_persona = models.CharField(
        max_length=10, 
        choices=TIPO_PERSONA_CHOICES
    )

    def __str__(self):
        return f"{self.nombre} ({self.tipo_persona})"

# Modelo: Tipo de Incidente
class TipoIncidente(models.Model):
    id_tipoincidente = models.AutoField(primary_key=True)
    nombre = models.CharField(max_length=100, unique=True)

    def __str__(self):
        return self.nombre

# Modelo: Ubicación
class Ubicacion(models.Model):
    id_ubicacion = models.AutoField(primary_key=True)
    calle = models.CharField(max_length=200)
    numero = models.CharField(max_length=10, blank=True, null=True)
    colonia = models.CharField(max_length=100, blank=True, null=True)
    codigo_postal = models.IntegerField(blank=True, null=True)
    ciudad = models.CharField(max_length=100)
    pais = models.CharField(max_length=100)
    referencias = models.TextField(blank=True, null=True)

    def __str__(self):
        return f"{self.calle} {self.numero}, {self.colonia}, {self.ciudad}"

# Modelo: Incidente
class Incidente(models.Model):
    PRIORIDADES = [
        ('alta', 'Alta'),
        ('media', 'Media'),
        ('baja', 'Baja'),
    ]

    id_incidente = models.AutoField(primary_key=True)
    id_ciudadano = models.ForeignKey(Ciudadano, on_delete=models.CASCADE)
    id_usuario = models.ForeignKey(Usuario, on_delete=models.SET_NULL, null=True, blank=True)
    id_tipoincidente = models.ForeignKey(TipoIncidente, on_delete=models.CASCADE)
    id_ubicacion = models.ForeignKey(Ubicacion, on_delete=models.CASCADE)
    prioridad = models.CharField(max_length=10, choices=PRIORIDADES)
    descripcion = models.TextField()
    fecha_hora_registro = models.DateTimeField(auto_now_add=True)

    def __str__(self):
      return f"Incidente {self.id_incidente} - {self.id_tipoincidente.nombre if self.id_tipoincidente else 'Sin tipo'}"
