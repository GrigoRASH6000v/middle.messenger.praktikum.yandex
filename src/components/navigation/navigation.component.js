import { navigationTemplate } from './navigation.template.js';
import { Block } from '../../framework/core/block';
import { store } from '../../store/index';
import router from '../../router/routes';
import fetchHTTP from '../../framework/core/fetch';

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
