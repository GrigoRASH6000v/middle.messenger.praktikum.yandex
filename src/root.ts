import { Block } from './framework/core/block';
import Router from './framework/core/router.ts';
import routes from './router/routes.ts';

const router = new Router({
  routes,
});

export class Root extends Block {
  constructor(props: unknown) {
    super(props);
    this.$router = router;
  }
}
