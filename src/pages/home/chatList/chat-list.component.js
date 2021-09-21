import { Block } from '../../../framework/core/block.ts';
import { chatListTemplate } from './chat-list.template';

class ChatList extends Block {
  constructor(properties) {
    super(properties);
  }
}

export const chatList = new ChatList({
  selector: 'chatlist',
  template: chatListTemplate,
});
