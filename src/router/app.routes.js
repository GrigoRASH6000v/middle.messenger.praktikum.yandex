import login from '../pages/login/index.ts';
import registration from '../pages/registration/index.ts';
import home from '../pages/home/index.ts';
import personalAccount from '../pages/personal_account/index.ts';
import page505 from '../pages/505/index.ts';
import page404 from '../pages/404/index.ts';
// import { testPageComponent } from '../pages/test/test-page.component';
// import { tabPageComponent } from '../pages/tab-page/tab-page.component';
// import { notFoundPageComponent } from '../pages/404/notFound.component';

export const appRoutes = [
  //   {
  //     path: '',
  //     component: testPageComponent,
  //   },
  //   {
  //     path: 'tabs',
  //     component: tabPageComponent,
  //   },
  //   {
  //     path: '404',
  //     component: notFoundPageComponent,
  //   },
  {
    path: '/',
    component: home,
  },
  {
    path: '/login',
    component: login,
  },
  {
    path: '/registration',
    component: registration,
  },
  {
    path: '/personal-account',
    component: personalAccount,
  },
  {
    path: '/505',
    component: page505,
  },
  {
    path: '/404',
    component: page404,
  },
];
