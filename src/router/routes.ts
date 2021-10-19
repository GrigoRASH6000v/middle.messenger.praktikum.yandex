import { loginPage } from '@/pages/login/login.component.ts';
import { registrationPage } from '@/pages/registration/registration.component.ts';
import { home } from '@/pages/home/home.component';
import { personalAccount } from '@/pages/personal_account/personal-account.component.ts';
import { errorPage } from '@/pages/505/error-page.component.ts';
import { notFoundPage } from '@/pages/404/not-found-page.component.ts';
import Router from '@/framework/core/router.ts';

const routes: { path: string; redirect?: string; component?: unknown }[] = [
  {
    path: '*',
    redirect: '/404',
  },
  {
    path: '/',
    redirect: '/messenger',
  },
  {
    path: '/messenger',
    component: home,
  },
  {
    path: '/login',
    component: loginPage,
  },
  {
    path: '/sign-up',
    component: registrationPage,
  },
  {
    path: '/settings',
    component: personalAccount,
  },
  {
    path: '/505',
    component: errorPage,
  },
  {
    path: '/404',
    component: notFoundPage,
  },
];

const router = new Router({
  routes,
  linkClass: 'router-link',
});

export default router;
