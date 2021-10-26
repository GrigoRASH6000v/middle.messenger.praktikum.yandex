// import 'normalize.css';
import { app } from '@/app/app.component.ts';
import '@/assets/style/style.scss';
import router from '@/router/routes.ts';
import { store } from './store/index.ts';
import fetchHTTP from './framework/core/fetch.ts';

store.state.baseUrl = 'https://ya-praktikum.tech';

async function getUser() {
  return fetchHTTP
    .get(`${store.state.baseUrl}/api/v2/auth/user`)
    .then((res) => {
      if (res.status === 200) {
        store.state.authenticated = true;
        store.state.userData = res.data;
      }
    });
}

getUser().then(() => {
  app.init();
  router.init();
});
