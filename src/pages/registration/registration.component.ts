import { Block } from '../../framework/core/block.ts';
import { registrationPageTemplate } from './registration.template';
import { Validation } from '../../framework/core/validation.ts';
import router from '../../router/routes';
import { store } from '../../store/index';

interface Properties {
  components?: Block[];
  selector: string;
  template: string;
  data?: { [key: string]: unknown };
  methods?: { [key: string]: () => unknown };
}

class RegistrationPage extends Block {
  constructor(properties: Properties) {
    super(properties);
  }
  mounted() {
    const mail = {
      domElement: document.querySelector('#email'),
      type: 'email',
      classError: 'no-valid',
      classDone: 'valid',
      events: ['blur', 'focus'],
    };
    const phone = {
      domElement: document.querySelector('#phone'),
      type: 'phone',
      classError: 'no-valid',
      classDone: 'valid',
      events: ['blur', 'focus'],
    };
    const login = {
      domElement: document.querySelector('#login'),
      type: 'login',
      classError: 'no-valid',
      classDone: 'valid',
      events: ['blur', 'focus'],
    };
    const name = {
      domElement: document.querySelector('#name'),
      type: 'name',
      classError: 'no-valid',
      classDone: 'valid',
      events: ['blur', 'focus'],
    };
    const surname = {
      domElement: document.querySelector('#surname'),
      type: 'name',
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
    const validation = new Validation([
      mail,
      phone,
      login,
      name,
      surname,
      password,
    ]);
    validation.on();
  }
}

export const registrationPage = new RegistrationPage({
  selector: 'registration',
  template: registrationPageTemplate,
  data: {
    email: '',
    login: '',
    first_name: '',
    second_name: '',
    phone: '',
    password: '',
  },
  methods: {
    submitForm() {
      const form = {
        email: { value: this.data.email, type: 'email' },
        login: { value: this.data.login, type: 'login' },
        first_name: { value: this.data.first_name, type: 'name' },
        second_name: { value: this.data.second_name, type: 'name' },
        phone: { value: this.data.phone, type: 'phone' },
        password: { value: this.data.password, type: 'password' },
      };
      const validation = new Validation().getValidStatus(form);
      if (validation) {
        fetch(store.state.baseUrl + '/api/v2/auth/signup', {
          method: 'POST',
          headers: {
            'content-type': 'application/json',
          },
          credentials: 'include',
          mode: 'cors',
          body: JSON.stringify(this.data),
        }).then((res) => {
          if (res.ok) {
            fetch(store.state.baseUrl + '/api/v2/auth/user', {
              method: 'GET',
              mode: 'cors',
              credentials: 'include',
            }).then((response) => {
              if (response.ok) {
                store.state.authenticated = true;
                router.navigation('/messenger');
              }
            });
          }
        });
      }
    },
  },
});
