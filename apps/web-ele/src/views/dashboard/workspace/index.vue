<script lang="ts" setup>
import type {
  WorkbenchProjectItem,
  WorkbenchQuickNavItem,
  WorkbenchTodoItem,
  WorkbenchTrendItem,
} from '@vben/common-ui';

import { ref } from 'vue';
import { useRouter } from 'vue-router';

import {
  AnalysisChartCard,
  WorkbenchHeader,
  WorkbenchProject,
  WorkbenchQuickNav,
  WorkbenchTodo,
  WorkbenchTrends,
} from '@vben/common-ui';
import { preferences } from '@vben/preferences';
import { useUserStore } from '@vben/stores';
import { openWindow } from '@vben/utils';
import { $t } from '@vben/locales';

import AnalyticsVisitsSource from '../analytics/analytics-visits-source.vue';

const userStore = useUserStore();

// Estos son datos de ejemplo, en un proyecto real necesitan ajustarse según la situación actual
// La url también puede ser una ruta interna, procesada en el método navTo para navegación interna
// Ejemplo: url: /dashboard/workspace
const projectItems: WorkbenchProjectItem[] = [
  {
    color: '',
    content: $t('workspace.projectMottos.opportunity'),
    date: '2021-04-01',
    group: $t('workspace.groups.opensource'),
    icon: 'carbon:logo-github',
    title: 'Github',
    url: 'https://github.com',
  },
  {
    color: '#3fb27f',
    content: $t('workspace.projectMottos.future'),
    date: '2021-04-01',
    group: $t('workspace.groups.algorithm'),
    icon: 'ion:logo-vue',
    title: 'Vue',
    url: 'https://vuejs.org',
  },
  {
    color: '#e18525',
    content: $t('workspace.projectMottos.effort'),
    date: '2021-04-01',
    group: $t('workspace.groups.workSlacking'),
    icon: 'ion:logo-html5',
    title: 'Html5',
    url: 'https://developer.mozilla.org/zh-CN/docs/Web/HTML',
  },
  {
    color: '#bf0c2c',
    content: $t('workspace.projectMottos.passion'),
    date: '2021-04-01',
    group: $t('workspace.groups.ui'),
    icon: 'ion:logo-angular',
    title: 'Angular',
    url: 'https://angular.io',
  },
  {
    color: '#00d8ff',
    content: $t('workspace.projectMottos.health'),
    date: '2021-04-01',
    group: $t('workspace.groups.techGuru'),
    icon: 'bx:bxl-react',
    title: 'React',
    url: 'https://reactjs.org',
  },
  {
    color: '#EBD94E',
    content: $t('workspace.projectMottos.action'),
    date: '2021-04-01',
    group: $t('workspace.groups.architecture'),
    icon: 'ion:logo-javascript',
    title: 'Js',
    url: 'https://developer.mozilla.org/zh-CN/docs/Web/JavaScript',
  },
];

// De manera similar, aquí la url también puede usar enlaces externos que comiencen con http
const quickNavItems: WorkbenchQuickNavItem[] = [
  {
    color: '#1fdaca',
    icon: 'ion:home-outline',
    title: $t('workspace.navigation.home'),
    url: '/',
  },
  {
    color: '#bf0c2c',
    icon: 'ion:grid-outline',
    title: $t('workspace.navigation.dashboard'),
    url: '/dashboard',
  },
  {
    color: '#e18525',
    icon: 'ion:layers-outline',
    title: $t('workspace.navigation.components'),
    url: '/demos/features/icons',
  },
  {
    color: '#3fb27f',
    icon: 'ion:settings-outline',
    title: $t('workspace.navigation.systemManagement'),
    url: '/demos/features/login-expired', // Esta URL es un ejemplo, en un proyecto real necesita ajustarse según la situación actual
  },
  {
    color: '#4daf1bc9',
    icon: 'ion:key-outline',
    title: $t('workspace.navigation.permissionManagement'),
    url: '/demos/access/page-control',
  },
  {
    color: '#00d8ff',
    icon: 'ion:bar-chart-outline',
    title: $t('workspace.navigation.charts'),
    url: '/analytics',
  },
];

const todoItems = ref<WorkbenchTodoItem[]>([
  {
    completed: false,
    content: $t('workspace.todoItems.codeReviewDesc'),
    date: '2024-07-30 11:00:00',
    title: $t('workspace.todoItems.codeReview'),
  },
  {
    completed: true,
    content: $t('workspace.todoItems.performanceOptDesc'),
    date: '2024-07-30 11:00:00',
    title: $t('workspace.todoItems.performanceOpt'),
  },
  {
    completed: false,
    content: $t('workspace.todoItems.securityCheckDesc'),
    date: '2024-07-30 11:00:00',
    title: $t('workspace.todoItems.securityCheck'),
  },
  {
    completed: false,
    content: $t('workspace.todoItems.updateDepsDesc'),
    date: '2024-07-30 11:00:00',
    title: $t('workspace.todoItems.updateDeps'),
  },
  {
    completed: false,
    content: $t('workspace.todoItems.fixUIIssuesDesc'),
    date: '2024-07-30 11:00:00',
    title: $t('workspace.todoItems.fixUIIssues'),
  },
]);
const trendItems: WorkbenchTrendItem[] = [
  {
    avatar: 'svg:avatar-1',
    content: `在 <a>开源组</a> 创建了项目 <a>Vue</a>`,
    date: '刚刚',
    title: '威廉',
  },
  {
    avatar: 'svg:avatar-2',
    content: `关注了 <a>威廉</a> `,
    date: '1个小时前',
    title: '艾文',
  },
  {
    avatar: 'svg:avatar-3',
    content: `发布了 <a>个人动态</a> `,
    date: '1天前',
    title: '克里斯',
  },
  {
    avatar: 'svg:avatar-4',
    content: `发表文章 <a>如何编写一个Vite插件</a> `,
    date: '2天前',
    title: 'Vben',
  },
  {
    avatar: 'svg:avatar-1',
    content: `回复了 <a>杰克</a> 的问题 <a>如何进行项目优化？</a>`,
    date: '3天前',
    title: '皮特',
  },
  {
    avatar: 'svg:avatar-2',
    content: `关闭了问题 <a>如何运行项目</a> `,
    date: '1周前',
    title: '杰克',
  },
  {
    avatar: 'svg:avatar-3',
    content: `发布了 <a>个人动态</a> `,
    date: '1周前',
    title: '威廉',
  },
  {
    avatar: 'svg:avatar-4',
    content: `推送了代码到 <a>Github</a>`,
    date: '2021-04-01 20:00',
    title: '威廉',
  },
  {
    avatar: 'svg:avatar-4',
    content: `发表文章 <a>如何编写使用 Admin Vben</a> `,
    date: '2021-03-01 20:00',
    title: 'Vben',
  },
];

const router = useRouter();

// Este es un método de ejemplo, en un proyecto real necesita ajustarse según los requisitos actuales
// Este es un método de ejemplo, ajustar según los requisitos reales del proyecto
function navTo(nav: WorkbenchProjectItem | WorkbenchQuickNavItem) {
  if (nav.url?.startsWith('http')) {
    openWindow(nav.url);
    return;
  }
  if (nav.url?.startsWith('/')) {
    router.push(nav.url).catch((error) => {
      console.error('Navigation failed:', error);
    });
  } else {
    console.warn(`Unknown URL for navigation item: ${nav.title} -> ${nav.url}`);
  }
}
</script>

<template>
  <div class="p-5">
    <WorkbenchHeader
      :avatar="userStore.userInfo?.avatar || preferences.app.defaultAvatar"
    >
      <template #title>
        {{ $t('workspace.greeting', [userStore.userInfo?.realName]) }}
      </template>
      <template #description> 
        {{ $t('workspace.weather') }}
      </template>
    </WorkbenchHeader>

    <div class="mt-5 flex flex-col lg:flex-row">
      <div class="mr-4 w-full lg:w-3/5">
        <WorkbenchProject :items="projectItems" :title="$t('workspace.projects')" @click="navTo" />
        <WorkbenchTrends :items="trendItems" class="mt-5" :title="$t('workspace.latestTrends')" />
      </div>
      <div class="w-full lg:w-2/5">
        <WorkbenchQuickNav
          :items="quickNavItems"
          class="mt-5 lg:mt-0"
          :title="$t('workspace.quickNav')"
          @click="navTo"
        />
        <WorkbenchTodo :items="todoItems" class="mt-5" :title="$t('workspace.todo')" />
        <AnalysisChartCard class="mt-5" :title="$t('workspace.visitSource')">
          <AnalyticsVisitsSource />
        </AnalysisChartCard>
      </div>
    </div>
  </div>
</template>
