import 'normalize.css';
import { app } from './app/app.component.ts';
import './assets/style/style.scss';
import Router from './framework/core/router.ts';
import routes from './router/routes.ts';

const router = new Router({
  routes,
});

app.init();
router.init();
