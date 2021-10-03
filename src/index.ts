import 'normalize.css';
import { app } from './app/app.component.ts';
import './assets/style/style.scss';
import router from './router/routes.ts';
import { store } from './store/index';

store.state.baseUrl = 'https://ya-praktikum.tech';

async function getUser() {
  return await fetch(store.state.baseUrl + '/api/v2/auth/user', {
    method: 'GET',
    credentials: 'include',
    mode: 'cors',
  }).then((res) => {
    if (res.ok) {
      store.state.authenticated = true;
    }
  });
}

getUser().then(() => {
  app.init();
  router.init();
});
