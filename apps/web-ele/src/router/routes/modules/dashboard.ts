import type { RouteRecordRaw } from 'vue-router';

import { BasicLayout } from '#/layouts';
import { $t } from '#/locales';

const routes: RouteRecordRaw[] = [
  {
    component: BasicLayout,
    meta: {
      icon: 'lucide:layout-dashboard',
      order: -1,
      title: 'Registro de incidentes',
      // Accesible para ambos roles
      authority: ['usuario', 'administrador'],
    },
    name: 'Dashboard',
    path: '/dashboard',
    redirect: '/dashboard/incidents', // Redirigir por defecto a incidentes
    children: [
      {
        name: 'DashboardIncidents',
        path: '/dashboard/incidents',
        component: () => import('../../../views/dashboard/index.vue'),
        meta: {
          affixTab: true,
          icon: 'lucide:alert-triangle',
          title: $t('page.dashboard.title'),
          // Accesible para ambos roles
          authority: ['usuario', 'administrador'],
        },
      },
      {
        name: 'Analytics',
        path: '/dashboard/analytics',
        component: () => import('../../../views/dashboard/analytics/index.vue'),
        meta: {
          icon: 'lucide:area-chart',
          title: $t('page.dashboard.analytics'),
          // Accesible para ambos roles
          authority: ['usuario', 'administrador'],
        },
      },
      {
        name: 'Workspace',
        path: '/dashboard/workspace',
        component: () => import('../../../views/dashboard/workspace/index.vue'),
        meta: {
          icon: 'carbon:workspace',
          title: $t('page.dashboard.workspace'),
          // Accesible para ambos roles
          authority: ['usuario', 'administrador'],
        },
      },
      {
        name: 'Test',
        path: '/dashboard/test',
        component: () => import('../../../views/dashboard/test.vue'),
        meta: {
          icon: 'lucide:test-tube',
          title: 'Test Page',
          authority: ['administrador'],
        },
      },
      {
        name: 'ListaIncidentes',
        path: '/dashboard/lista-incidentes',
        component: () => import('../../../views/_core/incident/IncidentTable.vue'),
        meta: {
          icon: 'lucide:list',
          title: 'Lista de Incidentes',
          authority: ['usuario', 'administrador'],
        },
      },
    ],
  },
];

export default routes;
