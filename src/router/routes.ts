import { loginPage } from '../pages/login/login.component';
import { registrationPage } from '../pages/registration/registration.component';
import { home } from '../pages/home/home.component';
import { personalAccount } from '../pages/personal_account/personal-account.component';
import { errorPage } from '../pages/505/error-page.component';
import { notFoundPage } from '../pages/404/not-found-page.component';

const routes: { path: string; redirect?: string; component?: unknown }[] = [
  {
    path: '*',
    redirect: '/404',
  },
  {
    path: '/',
    component: home,
  },
  {
    path: '/login',
    component: loginPage,
  },
  {
    path: '/registration',
    component: registrationPage,
  },
  {
    path: '/personal-account',
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

export default routes;
