# Módulo de Administración

Este módulo contiene todas las vistas administrativas del sistema SDAYD-2.

## Estructura

```
admin/
├── users/          # Gestión de usuarios
│   └── index.vue   # Panel principal de administración de usuarios
├── roles/          # Gestión de roles
│   └── index.vue   # Administración de roles y permisos
├── settings/       # Configuraciones del sistema
│   └── index.vue   # Configuraciones generales
└── README.md       # Esta documentación
```

## Funcionalidades

### 📁 users/index.vue
**Panel de Administración de Usuarios**

- ✅ **Vista completa y funcional** - Movida desde `dashboard/test.vue`
- 👥 **Gestión completa de usuarios** (CRUD)
- 📊 **Dashboard con estadísticas**
- 🔍 **Búsqueda y filtrado**
- 🎨 **Interfaz moderna** con soporte para tema claro/oscuro
- 🔐 **Control de acceso** (solo administradores)

**Características principales:**
- Dashboard con estadísticas de usuarios
- Tabla moderna con paginación
- Creación de nuevos usuarios
- Edición de usuarios existentes
- Cambio de contraseñas
- Eliminación de usuarios (con protecciones)
- Asignación de roles
- Control de estado (activo/inactivo)
- Búsqueda en tiempo real

### 📁 roles/index.vue
**Panel de Gestión de Roles** (En desarrollo)
- Administración de roles del sistema
- Asignación de permisos

### 📁 settings/index.vue
**Configuraciones del Sistema** (En desarrollo)
- Configuraciones generales del sistema
- Parámetros de aplicación

## Rutas

El módulo está integrado en el sistema de rutas:

```typescript
// dashboard.ts
{
  name: 'UserManagement',
  path: '/dashboard/user-management',
  component: () => import('../../../views/admin/users/index.vue'),
  meta: {
    icon: 'lucide:users-cog',
    title: 'Administración de Usuarios',
    authority: ['administrador'], // Solo administradores
  },
}
```

## Stores Utilizados

- `useUsersStore` - Gestión de usuarios y roles
- `useUserStore` - Información del usuario actual

## Tecnologías

- **Vue 3** con Composition API
- **Element Plus** para componentes UI
- **Pinia** para gestión de estado
- **TypeScript** para tipado
- **CSS3** con variables CSS para tema claro/oscuro

## Migración

El archivo `dashboard/test.vue` ha sido **reemplazado** por `admin/users/index.vue` con las siguientes mejoras:

1. ✅ **Mejor organización** - Ubicado en la carpeta admin correcta
2. ✅ **Misma funcionalidad** - Todas las características se mantienen
3. ✅ **Rutas actualizadas** - El routing apunta al nuevo archivo
4. ✅ **Estilos mejorados** - CSS optimizado y compatible con temas
5. ✅ **Mejor estructura** - Separación lógica de módulos administrativos

## Uso

Para acceder al panel de administración de usuarios:

1. **Iniciar sesión** como administrador
2. **Navegar** a "Administración de Usuarios" en el menú
3. **Gestionar** usuarios desde la interfaz moderna

## Próximos Pasos

- [ ] Completar desarrollo de `roles/index.vue`
- [ ] Completar desarrollo de `settings/index.vue`
- [ ] Agregar más funcionalidades administrativas
- [ ] Implementar auditoría de cambios
