import { Block } from '../../../framework/core/block.ts';
import { chatFieldTemplate } from './chat-field.template';

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
    chatList: [
      {
        body: 'quia et suscipit\nsuscipit recusandae consequuntur expedita et cum\nreprehenderit molestiae ut ut quas totam\nnostrum rerum est autem sunt rem eveniet architecto',
        id: 1,
        title:
          'sunt aut facere repellat provident occaecati excepturi optio reprehenderit',
        userId: 1,
      },
      {
        body: 'est rerum tempore vitae\nsequi sint nihil reprehenderit dolor beatae ea dolores neque\nfugiat blanditiis voluptate porro vel nihil molestiae ut reiciendis\nqui aperiam non debitis possimus qui neque nisi nulla',
        id: 2,
        title: 'qui est esse',
        userId: 1,
      },
    ],
  },
  selector: 'chatfield',
  template: chatFieldTemplate,
});
