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
            samesite='Strict',
            max_age=60 * 60  # 1 hora
        )

        response.set_cookie(
            key='refresh_token',
            value=refresh_token,
            httponly=True,
            secure=False,  # ⚠️ pon True si usas HTTPS
            samesite='Strict',
            max_age=24 * 60 * 60  # 24 horas
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
                secure=True,
                samesite='Strict',
                max_age=3600  # 1 hora access token
            )
            
            response.set_cookie(
                'refresh_token',
                refresh_token,
                httponly=True,
                secure=True,
                samesite='Strict',
                max_age=24 * 3600  # 24 horas refresh token
            )
            
            return response
            
        except Exception as e:
            return Response({
                'status': 'error',
                'message': 'Error al registrar el usuario',
                'detail': str(e)
            }, status=status.HTTP_400_BAD_REQUEST)
    
    return Response({
        'status': 'error',
        'message': 'Error en el registro',
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

    response.delete_cookie('access_token', samesite='Strict')
    response.delete_cookie('refresh_token', samesite='Strict')
    response.delete_cookie('csrftoken')

    # Intentamos invalidar el token si existe
    if refresh_token:
        try:
            token = RefreshToken(refresh_token)
            token.blacklist()
        except Exception as e:
            print(f"Token ya inválido o expirado: {e}")

    return response




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
