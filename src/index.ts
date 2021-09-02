import 'normalize.css';
import { app } from './app/app.component.ts';
import './assets/style/style.scss';
import Router from './framework/core/router.ts';
import routes from './router/routes.ts';
import { fetchHTTP } from './framework/core/fetch';

fetchHTTP
  .get('https://jsonplaceholder.typicode.com/todos/1')
  .then((res) => console.log(res.response));

const router = new Router({
  routes,
});

app.init();
router.init();
