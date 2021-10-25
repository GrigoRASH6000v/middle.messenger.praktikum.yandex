import { Block } from '@/framework/core/block.ts';
import { personalAccountPageTemplate } from './personal-account.template.js';
import { Validation } from '@/framework/core/validation.ts';
import { store } from '@/store/index.ts';
import router from '@/router/routes.ts';
import fetchHTTP from '@/framework/core/fetch.ts';

interface Properties {
  components?: Block[];
  selector: string;
  template: string;
  data?: { [key: string]: string };
  methods?: { [key: string]: () => unknown };
}

class PersonalAccount extends Block {
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
      target: document.querySelector('#email-wrp'),
    };
    const phone = {
      domElement: document.querySelector('#phone'),
      type: 'phone',
      classError: 'no-valid',
      classDone: 'valid',
      events: ['blur', 'focus'],
      target: document.querySelector('#phone-wrp'),
    };
    const login = {
      domElement: document.querySelector('#login'),
      type: 'login',
      classError: 'no-valid',
      classDone: 'valid',
      events: ['blur', 'focus'],
      target: document.querySelector('#login-wrp'),
    };
    const name = {
      domElement: document.querySelector('#name'),
      type: 'name',
      classError: 'no-valid',
      classDone: 'valid',
      events: ['blur', 'focus'],
      target: document.querySelector('#name-wrp'),
    };
    const surname = {
      domElement: document.querySelector('#surname'),
      type: 'name',
      classError: 'no-valid',
      classDone: 'valid',
      events: ['blur', 'focus'],
      target: document.querySelector('#surname-wrp'),
    };
    const nameInChat = {
      domElement: document.querySelector('#name_in_chat'),
      type: 'login',
      classError: 'no-valid',
      classDone: 'valid',
      events: ['blur', 'focus'],
      target: document.querySelector('#name_in_chat-wrp'),
    };
    new Validation([mail, phone, login, name, surname, nameInChat]).on();
    this.methods.setValues();
  }
}

export const personalAccount = new PersonalAccount({
  selector: 'personal-account',
  template: personalAccountPageTemplate,
  data: {
    form: {
      email: '',
      login: '',
      first_name: '',
      second_name: '',
      display_name: '',
      phone: '',
    },
  },
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
    setValues() {
      this.data.form.first_name = store.state.userData.first_name;
      this.data.form.second_name = store.state.userData.second_name;
      this.data.form.display_name = store.state.userData.display_name;
      this.data.form.login = store.state.userData.login;
      this.data.form.email = store.state.userData.email;
      this.data.form.phone = store.state.userData.phone;
      this._update();
    },
    submitForm(): void {
      const body = {
        first_name: this.data.form.first_name,
        second_name: this.data.form.second_name,
        display_name: this.data.form.display_name,
        login: this.data.form.login,
        email: this.data.form.email,
        phone: this.data.form.phone,
      };
      fetchHTTP
        .put(store.state.baseUrl + '/api/v2/user/profile', { body })
        .then((res) => (store.state.userData = res.data));
    },
  },
});
