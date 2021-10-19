import { navigationTemplate } from './navigation.template.js';
import { Block } from '@/framework/core/block.ts';
import { store } from '@/store/index.ts';
import router from '@/router/routes.ts';
import fetchHTTP from '@/framework/core/fetch.ts';

class Navigation extends Block {
  constructor(properties) {
    super(properties);
  }
}

export const navigation = new Navigation({
  selector: 'navigation',
  template: navigationTemplate,
  methods: {
    logout() {
      fetchHTTP
        .post(store.state.baseUrl + '/api/v2/auth/logout')
        .then((res) => {
          if (res.status === 200) {
            store.state.authenticated = false;
            router.navigation('/login');
          }
        });
    },
  },
});
