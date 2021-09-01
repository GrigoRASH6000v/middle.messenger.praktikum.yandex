import { navigationTemplate } from './navigation.template.js';
import { Block } from '../../framework/core/block';

class Navigation extends Block {
  constructor(properties) {
    super(properties);
  }
}

export const navigation = new Navigation({
  selector: 'navigation',
  template: navigationTemplate,
});
