import { Block } from '../../framework/core/block.ts';
import { loginTemplate } from './login.template';
import { Validation } from '../../framework/core/validation.ts';
import { store } from '../../store/index'
import router from '../../router/routes'

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
      fetch(store.state.baseUrl+ '/api/v2/auth/signin', {
        method: 'POST',
        mode: 'cors',
        credentials: 'include',
        body: JSON.stringify(form),
        headers: {
          'content-type': 'application/json', // Данные отправляем в формате JSON
        },
      }).then((res) => {
        if (res.ok) {
          fetch(store.state.baseUrl+'/api/v2/auth/user', {
            method: 'GET',
            credentials: 'include'
            mode: 'cors'
          }).then(res=>{
            if(res.ok){
              store.state.authenticated = true
              router.navigation('/messenger')
            }
          })
          ;
        }
      });
    },
  },
});
