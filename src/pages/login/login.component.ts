import { Block } from '../../framework/core/block.ts';
import { loginTemplate } from './login.template';
import { Validation } from '../../framework/core/validation.ts';

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
    const mail = {
      domElement: document.querySelector('#email'),
      type: 'email',
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
    const validation = new Validation([mail, password]);
    validation.on();
  }
}

export const loginPage = new LoginPage({
  selector: 'login',
  template: loginTemplate,
  data: {
    email: '',
    password: '',
  },
  methods: {
    submitForm(): void {
      const form = {
        email: this.data.email,
        password: this.data.password,
      };
      console.log(form);
    },
  },
});
