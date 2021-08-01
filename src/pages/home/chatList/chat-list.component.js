import { Block } from '../../../framework/core/block';
import { chatListTemplate } from './chat-list.template';

class ChatList extends Block {
  constructor(props) {
    super(props);
  }
}

export const chatList = new ChatList({
  selector: 'chatlist',
  template: chatListTemplate,
});
