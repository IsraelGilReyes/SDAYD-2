from django.db import models

class Rol(models.Model):
    id_rol = models.CharField(max_length=50, primary_key=True, help_text=" 'id_administrador', 'id_operador'")

    def __str__(self):
        return self.id_rol

class Usuario(models.Model):
    id_usuario = models.CharField(max_length=100, primary_key=True) 
    usuario = models.CharField(max_length=100, unique=True)
    rol = models.ForeignKey(Rol, on_delete=models.SET_NULL, null=True, blank=True) 
    email = models.EmailField(unique=True)

    def __str__(self):
        return self.usuario

class Ciudadano(models.Model):
    id_ciudadano = models.CharField(max_length=100, primary_key=True) 
    nombre = models.CharField(max_length=100)
    apellidos = models.CharField(max_length=100)
    no_telefono = models.CharField(max_length=20, blank=True, null=True) #

    def __str__(self):
        return f"{self.nombre} {self.apellidos}"

class Tipo_de_incidente(models.Model):
    id_tipo_incidente = models.CharField(max_length=100, primary_key=True) 
    nombre = models.CharField(max_length=100, unique=True)

    def __str__(self):
        return self.nombre

class Ubicacion(models.Model):
    id_ubicacion = models.CharField(max_length=100, primary_key=True) 
    calle = models.CharField(max_length=200)
    numero = models.CharField(max_length=50, blank=True, null=True)
    colonia = models.CharField(max_length=100, blank=True, null=True)
    codigo_postal = models.CharField(max_length=10, blank=True, null=True)#entero
    ciudad = models.CharField(max_length=100)
    pais = models.CharField(max_length=100)
    referencias = models.TextField(blank=True, null=True)#string largo

    def __str__(self):
        return f"{self.calle}, {self.ciudad}"

class Incidente(models.Model):
    id_incidente = models.CharField(max_length=100, primary_key=True) 
    id_ciudadano = models.ForeignKey(Ciudadano, on_delete=models.CASCADE)
    id_usuario = models.ForeignKey(Usuario, on_delete=models.SET_NULL, null=True, blank=True) 
    id_tipo_incidente = models.ForeignKey(Tipo_de_incidente, on_delete=models.CASCADE)
    id_ubicacion = models.ForeignKey(Ubicacion, on_delete=models.CASCADE)

    prioridad = models.CharField(max_length=50, choices=[
        ('baja', 'Baja'),
        ('media', 'Media'),
        ('alta', 'Alta'),
    ]) 
    descripcion = models.TextField() #string
    fecha_hora_registro = models.DateTimeField(auto_now_add=True) 

    def __str__(self):
        return f"Incidente {self.id_incidente} - {self.id_tipo_incidente.nombre}"
