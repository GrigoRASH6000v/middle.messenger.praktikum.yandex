import { Block } from '../../../framework/core/block';
import { chatFieldTemplate } from './chat-field.template';

class ChatField extends Block {
  constructor(props) {
    super(props);
  }
}

export const chatField = new ChatField({
  selector: 'chatfield',
  template: chatFieldTemplate,
});
