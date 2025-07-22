import type { RouteRecordRaw } from 'vue-router';

import { BasicLayout } from '#/layouts';

const routes: RouteRecordRaw[] = [
  {
    component: BasicLayout,
    meta: {
      icon: 'lucide:shield-check',
      order: 100,
      title: 'Administración',
      authority: ['administrador'],
    },
    name: 'Admin',
    path: '/admin',
    redirect: '/admin/users',
    children: [
      {
        name: 'AdminUsers',
        path: '/admin/users',
        component: () => import('../../../views/admin/users/index.vue'),
        meta: {
          icon: 'lucide:user',
          title: 'Gestión de Usuarios',
          authority: ['administrador'],
        },
      },
      {
        name: 'AdminRoles',
        path: '/admin/roles',
        component: () => import('../../../views/admin/roles/index.vue'),
        meta: {
          icon: 'lucide:shield',
          title: 'Gestión de Roles',
          authority: ['administrador'],
        },
      },
      {
        name: 'AdminSettings',
        path: '/admin/settings',
        component: () => import('../../../views/admin/settings/index.vue'),
        meta: {
          icon: 'lucide:settings',
          title: 'Configuración del Sistema',
          authority: ['administrador'],
        },
      },
    ],
  },
];

export default routes;
