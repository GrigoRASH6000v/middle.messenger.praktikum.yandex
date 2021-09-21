import { Block } from '../../framework/core/block.ts';
import { homeTemplate } from './home.template';
import { chatField } from './chatField/chat-field.component';
import { chatList } from './chatList/chat-list.component';

interface Properties {
  components?: Block[];
  selector: string;
  template: string;
  data?: { [key: string]: string };
  methods?: { [key: string]: () => unknown };
}

class Home extends Block {
  constructor(properties: Properties) {
    super(properties);
  }
}

export const home = new Home({
  selector: 'home',
  template: homeTemplate,
  components: [chatField, chatList],
});
