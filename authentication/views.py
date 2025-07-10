from rest_framework import status
from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework_simplejwt.tokens import RefreshToken
from django.contrib.auth import get_user_model
from .models import Role, UserRole
from .serializers import (
    CustomTokenObtainPairSerializer,
    UserSerializer,
    RoleSerializer,
    UserRoleSerializer,
    UserInfoSerializer,
    RegisterSerializer #sayuri
)
from rest_framework_simplejwt.views import TokenObtainPairView
from django.views.decorators.csrf import csrf_exempt
from django.utils.decorators import method_decorator
from datetime import datetime, timedelta
from rest_framework_simplejwt.tokens import RefreshToken, AccessToken
from rest_framework_simplejwt.tokens import OutstandingToken, BlacklistedToken, RefreshToken



User = get_user_model()

# Vista de Login
@method_decorator(csrf_exempt, name='dispatch')  # si no usas CSRF, o si estás en desarrollo
class LoginView(TokenObtainPairView):
    serializer_class = CustomTokenObtainPairSerializer

    def get(self, request, *args, **kwargs):
        return Response({
            'status': 'success',
            'message': 'Login endpoint is available'
        })

    def post(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)

        try:
            serializer.is_valid(raise_exception=True)
        except Exception as e:
            return Response({
                'status': 'error',
                'message': 'Credenciales inválidas',
                'detail': str(e)
            }, status=status.HTTP_401_UNAUTHORIZED)

        access_token = serializer.validated_data.get('access')
        refresh_token = serializer.validated_data.get('refresh')
        user_data = serializer.validated_data.get('user', {})

        response = Response({
            'status': 'success',
            'message': 'Login exitoso',
            'user': user_data
        }, status=status.HTTP_200_OK)

        # Crear cookies HttpOnly
        response.set_cookie(
            key='access_token',
            value=access_token,
            httponly=True,
            secure=False,  # ⚠️ pon True si usas HTTPS
            samesite='Lax',  # Cambiar a Lax para desarrollo
            max_age=60 * 60  # 1 hora - debe coincidir con ACCESS_TOKEN_LIFETIME
        )

        response.set_cookie(
            key='refresh_token',
            value=refresh_token,
            httponly=True,
            secure=False,  # ⚠️ pon True si usas HTTPS
            samesite='Lax',  # Cambiar a Lax para desarrollo
            max_age=24 * 60 * 60  # 24 horas - debe coincidir con REFRESH_TOKEN_LIFETIME
        )

        return response

# Vista de Registro
@api_view(['POST'])
@permission_classes([AllowAny])
def register(request):
    serializer = RegisterSerializer(data=request.data) #toma los datos del usuario
    
    if serializer.is_valid():
        try:
            # Crear el usuario
            user = serializer.save()
            
            # Generar tokens JWT para login automático
            refresh = RefreshToken.for_user(user)
            access_token = str(refresh.access_token)
            refresh_token = str(refresh)
            
            # Preparar la respuesta
            response = Response({
                'status': 'success',
                'message': 'Usuario registrado exitosamente',
                'user': {
                    'id': user.id,
                    'username': user.username,
                    'email': user.email
                }
            }, status=status.HTTP_201_CREATED)
            
            # Configurar cookies HttpOnly
            response.set_cookie(
                'access_token',
                access_token,
                httponly=True,
                secure=False,  # False para desarrollo local
                samesite='Lax',  # Lax para desarrollo local
                max_age=3600  # 1 hora access token
            )
            
            response.set_cookie(
                'refresh_token',
                refresh_token,
                httponly=True,
                secure=False,  # False para desarrollo local
                samesite='Lax',  # Lax para desarrollo local
                max_age=24 * 3600  # 24 horas refresh token
            )
            
            return response
            
        except Exception as e:
            return Response({
                'status': 'error',
                'message': 'Error interno del servidor',
                'detail': str(e)
            }, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
    
    return Response({
        'status': 'error',
        'message': 'Datos inválidos',
        'errors': serializer.errors
    }, status=status.HTTP_400_BAD_REQUEST)


@api_view(['POST'])
@permission_classes([AllowAny])
def logout(request):
    refresh_token = request.COOKIES.get('refresh_token')

    # Siempre eliminamos las cookies
    response = Response({
        'status': 'success',
        'message': 'Logout exitoso'
    }, status=status.HTTP_200_OK)

    response.delete_cookie('access_token', samesite='Lax')
    response.delete_cookie('refresh_token', samesite='Lax')
    response.delete_cookie('csrftoken')

    # Intentamos invalidar el token si existe
    if refresh_token:
        try:
            token = RefreshToken(refresh_token)
            token.blacklist()
        except Exception as e:
            print(f"Token ya inválido o expirado: {e}")

    return response


@api_view(['POST'])
@permission_classes([AllowAny])
def refresh_token(request):
    """
    Vista para refrescar el token de acceso usando el refresh token.
    El refresh token debe estar en las cookies HttpOnly.
    """
    refresh_token_value = request.COOKIES.get('refresh_token')
    
    if not refresh_token_value:
        return Response({
            'status': 'error',
            'message': 'Refresh token no encontrado'
        }, status=status.HTTP_401_UNAUTHORIZED)
    
    try:
        # Validar y decodificar el refresh token
        refresh = RefreshToken(refresh_token_value)
        
        # Generar nuevo access token
        new_access_token = str(refresh.access_token)
        
        # Preparar respuesta
        response = Response({
            'status': 'success',
            'message': 'Token refrescado exitosamente'
        }, status=status.HTTP_200_OK)
        
        # Actualizar la cookie del access token
        response.set_cookie(
            key='access_token',
            value=new_access_token,
            httponly=True,
            secure=False,  # ⚠️ pon True si usas HTTPS
            samesite='Lax',  # Cambiar a Lax para desarrollo
            max_age=60 * 60  # 1 hora - debe coincidir con ACCESS_TOKEN_LIFETIME
        )
        
        return response
        
    except Exception as e:
        return Response({
            'status': 'error',
            'message': 'Refresh token inválido o expirado',
            'detail': str(e)
        }, status=status.HTTP_401_UNAUTHORIZED)


# Vista para listar roles en donde hay ACCESO RESTRINGIDO
@api_view(['GET'])
@permission_classes([IsAuthenticated])
def role_list(request):
    roles = Role.objects.filter(is_active=True)
    serializer = RoleSerializer(roles, many=True)
    return Response(serializer.data)

# Vista para crear roles
@api_view(['POST'])
@permission_classes([IsAuthenticated])
def create_role(request):
    serializer = RoleSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

# Vista para obtener roles del usuario
@api_view(['GET'])
@permission_classes([IsAuthenticated])
def get_user_roles(request):
    user_roles = UserRole.objects.filter(user=request.user, role__is_active=True)
    serializer = UserRoleSerializer(user_roles, many=True)
    return Response(serializer.data)

# Vista para asignar roles
@api_view(['POST'])
@permission_classes([IsAuthenticated])
def assign_role(request):
    data = {
        'user_id': request.data.get('user_id'),
        'role_id': request.data.get('role_id'),
        'assigned_by': request.user.id
    }
    serializer = UserRoleSerializer(data=data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

# Vista para información del usuario actual
@api_view(['GET'])
@permission_classes([IsAuthenticated])
def get_user_info(request):
    serializer = UserInfoSerializer(request.user)
    return Response({
        'status': 'success',
        'user': serializer.data
    })

# Vista para listar usuarios
@api_view(['GET'])
@permission_classes([IsAuthenticated])
def get_user_list(request):
    users = User.objects.all()
    serializer = UserSerializer(users, many=True)
    return Response(serializer.data)

# Vista para crear usuarios (admin)
@api_view(['POST'])
@permission_classes([IsAuthenticated])
def create_user(request):
    serializer = UserSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

# Vista para obtener información de un usuario específico
@api_view(['GET'])
@permission_classes([IsAuthenticated])
def get_user_detail(request, user_id):
    try:
        user = User.objects.get(id=user_id)
        serializer = UserSerializer(user)
        return Response({
            'status': 'success',
            'user': serializer.data
        })
    except User.DoesNotExist:
        return Response({
            'status': 'error',
            'message': 'Usuario no encontrado'
        }, status=status.HTTP_404_NOT_FOUND)

# Vista para actualizar un usuario
@api_view(['PUT'])
@permission_classes([IsAuthenticated])
def update_user(request, user_id):
    try:
        user = User.objects.get(id=user_id)
        serializer = UserSerializer(user, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            
            # Si se especifica un rol, asignarlo
            role_name = request.data.get('role_name')
            if role_name:
                try:
                    role = Role.objects.get(name=role_name)
                    # Eliminar roles existentes del usuario
                    UserRole.objects.filter(user=user).delete()
                    # Asignar nuevo rol
                    UserRole.objects.create(
                        user=user,
                        role=role,
                        assigned_by=request.user
                    )
                except Role.DoesNotExist:
                    pass
            
            return Response({
                'status': 'success',
                'message': 'Usuario actualizado exitosamente',
                'user': serializer.data
            })
        return Response({
            'status': 'error',
            'message': 'Datos inválidos',
            'errors': serializer.errors
        }, status=status.HTTP_400_BAD_REQUEST)
    except User.DoesNotExist:
        return Response({
            'status': 'error',
            'message': 'Usuario no encontrado'
        }, status=status.HTTP_404_NOT_FOUND)

# Vista para eliminar un usuario
@api_view(['DELETE'])
@permission_classes([IsAuthenticated])
def delete_user(request, user_id):
    try:
        user = User.objects.get(id=user_id)
        
        # Prevenir que el usuario se elimine a sí mismo
        if user.id == request.user.id:
            return Response({
                'status': 'error',
                'message': 'No puedes eliminar tu propio usuario'
            }, status=status.HTTP_400_BAD_REQUEST)
        
        # Eliminar relaciones de roles primero
        UserRole.objects.filter(user=user).delete()
        
        # Eliminar el usuario
        user.delete()
        
        return Response({
            'status': 'success',
            'message': 'Usuario eliminado exitosamente'
        })
    except User.DoesNotExist:
        return Response({
            'status': 'error',
            'message': 'Usuario no encontrado'
        }, status=status.HTTP_404_NOT_FOUND)

# Vista para cambiar la contraseña de un usuario
@api_view(['POST'])
@permission_classes([IsAuthenticated])
def change_user_password(request, user_id):
    try:
        user = User.objects.get(id=user_id)
        
        new_password = request.data.get('new_password')
        confirm_password = request.data.get('confirm_password')
        
        if not new_password or not confirm_password:
            return Response({
                'status': 'error',
                'message': 'Se requieren ambas contraseñas'
            }, status=status.HTTP_400_BAD_REQUEST)
        
        if new_password != confirm_password:
            return Response({
                'status': 'error',
                'message': 'Las contraseñas no coinciden'
            }, status=status.HTTP_400_BAD_REQUEST)
        
        if len(new_password) < 6:
            return Response({
                'status': 'error',
                'message': 'La contraseña debe tener al menos 6 caracteres'
            }, status=status.HTTP_400_BAD_REQUEST)
        
        # Cambiar la contraseña
        user.set_password(new_password)
        user.save()
        
        return Response({
            'status': 'success',
            'message': 'Contraseña cambiada exitosamente'
        })
    except User.DoesNotExist:
        return Response({
            'status': 'error',
            'message': 'Usuario no encontrado'
        }, status=status.HTTP_404_NOT_FOUND)

# Vista para crear un nuevo usuario completo (admin)
@api_view(['POST'])
@permission_classes([IsAuthenticated])
def create_user_complete(request):
    """
    Vista para crear un usuario completo con rol asignado
    """
    try:
        # Validar datos requeridos
        username = request.data.get('username')
        email = request.data.get('email')
        password = request.data.get('password')
        role_name = request.data.get('role_name', 'usuario')
        
        if not username or not email or not password:
            return Response({
                'status': 'error',
                'message': 'Se requieren username, email y password'
            }, status=status.HTTP_400_BAD_REQUEST)
        
        # Verificar si el usuario ya existe
        if User.objects.filter(username=username).exists():
            return Response({
                'status': 'error',
                'message': 'El nombre de usuario ya existe'
            }, status=status.HTTP_400_BAD_REQUEST)
        
        if User.objects.filter(email=email).exists():
            return Response({
                'status': 'error',
                'message': 'El email ya está registrado'
            }, status=status.HTTP_400_BAD_REQUEST)
        
        # Crear el usuario
        user = User.objects.create_user(
            username=username,
            email=email,
            password=password,
            first_name=request.data.get('first_name', ''),
            last_name=request.data.get('last_name', ''),
            is_active=request.data.get('is_active', True),
            is_staff=request.data.get('is_staff', False)
        )
        
        # Asignar rol
        try:
            role = Role.objects.get(name=role_name)
            UserRole.objects.create(
                user=user,
                role=role,
                assigned_by=request.user
            )
        except Role.DoesNotExist:
            # Si el rol no existe, asignar rol de usuario por defecto
            default_role = Role.objects.get(name='usuario')
            UserRole.objects.create(
                user=user,
                role=default_role,
                assigned_by=request.user
            )
        
        # Serializar y devolver el usuario creado
        serializer = UserSerializer(user)
        return Response({
            'status': 'success',
            'message': 'Usuario creado exitosamente',
            'user': serializer.data
        }, status=status.HTTP_201_CREATED)
        
    except Exception as e:
        return Response({
            'status': 'error',
            'message': 'Error interno del servidor',
            'detail': str(e)
        }, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

