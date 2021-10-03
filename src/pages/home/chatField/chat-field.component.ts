import { Block } from '../../../framework/core/block.ts';
import { chatFieldTemplate } from './chat-field.template';
import { store } from '../../../store/index';

interface Properties {
  components?: Block[];
  selector?: string;
  template: string;
  data?: { [key: string]: unknown };
  methods?: { [key: string]: () => unknown };
}

class ChatField extends Block {
  constructor(properties: Properties) {
    super(properties);
  }
}

export const chatField = new ChatField({
  data: {
    showAside: false,
  },
  selector: 'chatfield',
  template: chatFieldTemplate,
  methods: {
    addUser() {
      fetch(store.state.baseUrl + '/api/v2/chats/user', {
        method: 'POST',
        headers: {
          'content-type': 'application/json',
        },
        credentials: 'include',
        mode: 'cors',
        body: JSON.stringify({ title: this.data.title }),
      });
    },
  },
});
