import { navigationTemplate } from './navigation.template.js';
import { Block } from '../../framework/core/block';

class Navigation extends Block {
  constructor(props) {
    super(props);
  }
}

export const navigation = new Navigation({
  selector: 'navigation',
  template: navigationTemplate,
});
