# authentication/authentication.py
from rest_framework_simplejwt.authentication import JWTAuthentication
from rest_framework_simplejwt.exceptions import InvalidToken, TokenError
from rest_framework import exceptions
from django.contrib.auth import get_user_model

User = get_user_model()

class CookieJWTAuthentication(JWTAuthentication):
    """
    Autenticación JWT personalizada que lee el token desde las cookies
    en lugar del header Authorization.
    """
    
    def authenticate(self, request):
        """
        Intenta autenticar el request usando un token JWT almacenado en cookies.
        """
        # Primero intentar con el header Authorization (para compatibilidad)
        header_auth = super().authenticate(request)
        if header_auth is not None:
            return header_auth
        
        # Si no hay token en el header, buscar en las cookies
        raw_token = request.COOKIES.get('access_token')
        if raw_token is None:
            return None
        
        try:
            # Validar el token
            validated_token = self.get_validated_token(raw_token)
            
            # Obtener el usuario del token
            user = self.get_user(validated_token)
            
            return (user, validated_token)
        except Exception as e:
            # Log el error para debugging
            print(f"Error en CookieJWTAuthentication: {e}")
            return None
    
    def get_validated_token(self, raw_token):
        """
        Valida el token JWT.
        """
        try:
            return super().get_validated_token(raw_token)
        except TokenError as e:
            print(f"Token error: {e}")
            raise exceptions.AuthenticationFailed(
                'Token inválido o expirado',
                code='token_not_valid'
            )
