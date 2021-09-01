import { Block } from '../../framework/core/block.ts';
import { registrationPageTemplate } from './registration.template';
import { Validation } from '../../framework/core/validation.ts';

interface Properties {
  components?: Block[];
  selector: string;
  template: string;
  data?: { [key: string]: string };
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
    const passwordRepeat = {
      domElement: document.querySelector('#password-repeat'),
      type: 'password',
      classError: 'no-valid',
      classDone: 'valid',
      events: ['blur', 'focus'],
    };
    new Validation([
      mail,
      phone,
      login,
      name,
      surname,
      password,
      passwordRepeat,
    ]).on();
  }
}

export const registrationPage = new RegistrationPage({
  selector: 'registration',
  template: registrationPageTemplate,
  data: {
    email: '',
    login: '',
    name: '',
    surname: '',
    phone: '',
    password: '',
    passwordRepeat: '',
  },
  methods: {
    submitForm() {
      const form = {
        email: this.data.email,
        login: this.data.login,
        name: this.data.name,
        surname: this.data.surname,
        phone: this.data.phone,
        password: this.data.password,
        passwordRepeat: this.data.passwordRepeat,
      };
      console.log(form);
    },
  },
});
