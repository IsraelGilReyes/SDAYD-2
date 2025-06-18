# authentication/middleware.py
from django.http import JsonResponse
from rest_framework_simplejwt.tokens import AccessToken
from django.urls import resolve
from django.conf import settings

class JWTAuthenticationMiddleware:
    """
    Middleware personalizado para autenticación JWT.
    Verifica la presencia y validez de un token JWT en las cookies para rutas protegidas.
    """
    
    def __init__(self, get_response):
        """
        Inicializa el middleware.
        
        Args:
            get_response (callable): La función que obtiene la respuesta del siguiente middleware o vista.
        """
        self.get_response = get_response
        # Lista de URLs públicas que no requieren autenticación
        self.public_urls = [
            '/api/auth/login/',       # Endpoint de inicio de sesión
            '/api/auth/register/',    # Endpoint de registro de usuarios
            '/api/auth/token/refresh/', # Endpoint para refrescar tokens
            '/admin/',               # Panel de administración de Django
            '/static/',               # Archivos estáticos
        ]

    def __call__(self, request):
        """
        Método principal que se ejecuta en cada solicitud.
        
        Args:
            request (HttpRequest): El objeto de solicitud HTTP.
            
        Returns:
            HttpResponse: La respuesta HTTP.
        """
        # Verificar si la solicitud es para una URL pública
        if any(request.path.startswith(url) for url in self.public_urls):
            # Si es una URL pública, continuar sin verificar autenticación
            return self.get_response(request)

        # Obtener el token de acceso de las cookies
        access_token = request.COOKIES.get('access_token')
        
        # Si no hay token, devolver error 401 (No autorizado)
        if not access_token:
            return JsonResponse({
                'status': 'error',
                'message': 'No autorizado - Token no encontrado'
            }, status=401)

        try:
            # Intentar validar el token usando SimpleJWT
            AccessToken(access_token)
            # Si el token es válido, continuar con la solicitud
            return self.get_response(request)
        except Exception:
            # Si hay cualquier error con el token, devolver error 401
            return JsonResponse({
                'status': 'error',
                'message': 'No autorizado - Token inválido'
            }, status=401)


class DisableCSRFForAPI:
    """
    Middleware para deshabilitar la protección CSRF en rutas específicas de la API.
    Útil cuando la API es consumida por clientes que no pueden manejar CSRF (como aplicaciones móviles).
    """
    
    def __init__(self, get_response):
        """
        Inicializa el middleware.
        
        Args:
            get_response (callable): La función que obtiene la respuesta del siguiente middleware o vista.
        """
        self.get_response = get_response

    def __call__(self, request):
        """
        Método principal que se ejecuta en cada solicitud.
        
        Args:
            request (HttpRequest): El objeto de solicitud HTTP.
            
        Returns:
            HttpResponse: La respuesta HTTP.
        """
        # Deshabilitar CSRF para rutas que comienzan con '/auth/'
        if request.path.startswith('/auth/'):
            # Establece un atributo especial que Django reconoce para saltar la verificación CSRF
            setattr(request, '_dont_enforce_csrf_checks', True)
        # Continuar con el procesamiento normal de la solicitud
        return self.get_response(request)
