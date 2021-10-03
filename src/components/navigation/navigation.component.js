import { navigationTemplate } from './navigation.template.js';
import { Block } from '../../framework/core/block';
import { store } from '../../store/index';
import router from '../../router/routes';

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
      fetch(store.state.baseUrl + '/api/v2/auth/logout', {
        method: 'POST',
        credentials: 'include',
        mode: 'cors',
      }).then((res) => {
        if (res.ok) {
          store.state.authenticated = false;
          router.navigation('/login');
        }
      });
    },
  },
});
