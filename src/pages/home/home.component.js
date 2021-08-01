import { Block } from '../../framework/core/block';
import { homeTemplate } from '../home/home.template';
import { chatField } from './chatField/chat-field.component';
import { chatList } from './chatList/chat-list.component';

class Home extends Block {
  constructor(props) {
    super(props);
  }
}

export const home = new Home({
  selector: 'home',
  template: homeTemplate,
  components: [chatField, chatList],
});
