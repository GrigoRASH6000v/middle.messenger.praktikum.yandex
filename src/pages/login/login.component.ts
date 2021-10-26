import { Block } from '@/framework/core/block.ts';
import { store } from '@/store/index.ts';
import router from '@/router/routes.ts';
import fetchHTTP from '@/framework/core/fetch.ts';
import { Validation } from '../../framework/core/validation.ts';
import { loginTemplate } from './login.template.js';

interface Properties {
  components?: Block[];
  selector?: string;
  template: string;
  data?: { [key: string]: unknown };
  methods?: { [key: string]: () => unknown };
}

class LoginPage extends Block {
  constructor(properties: Properties) {
    super(properties);
  }
  mounted() {
    const login = {
      domElement: document.querySelector('#login'),
      type: 'login',
      classError: 'no-valid',
      classDone: 'valid',
      events: ['blur', 'focus'],
    };
    const password = {
      domElement: document.querySelector('#password'),
      type: 'password',
      classError: 'no-valid',
      classDone: 'valid',
      events: ['blur', 'focus'],
    };
    const validation = new Validation([login, password]);
    validation.on();
  }
}

export const loginPage = new LoginPage({
  selector: 'login',
  template: loginTemplate,
  data: {
    login: '',
    password: '',
  },
  methods: {
    submitForm(): void {
      const form = {
        login: this.data.login,
        password: this.data.password,
      };
      fetchHTTP
        .post(`${store.state.baseUrl}/api/v2/auth/signin`, {
          body: form,
        })
        .then((res) => {
          if (res.data === 'OK') {
            fetchHTTP
              .get(`${store.state.baseUrl}/api/v2/auth/user`)
              .then((res) => {
                if (res.status === 200) {
                  store.state.authenticated = true;
                  router.navigation('/messenger');
                }
              });
          }
        });
    },
  },
});
