import { Block } from '../../framework/core/block.ts';
import { personalAccountPageTemplate } from './personal-account.template';
import { Validation } from '../../framework/core/validation.ts';

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
  }
}

export const personalAccount = new PersonalAccount({
  selector: 'personal-account',
  template: personalAccountPageTemplate,
  data: {
    email: '',
    login: '',
    name: '',
    surname: '',
    nameInChat: '',
    phone: '',
  },
  methods: {
    submitForm(): void {
      const form = {
        email: this.data.email,
        login: this.data.login,
        name: this.data.name,
        surname: this.data.surname,
        phone: this.data.nameInChat,
        password: this.data.phone,
      };
      console.log(form);
    },
  },
});
