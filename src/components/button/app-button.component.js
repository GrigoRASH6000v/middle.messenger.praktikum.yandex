import { Block } from '../../framework/core/block';
import { buttonTemplate } from './app-button.template';

class Button extends Block {
  constructor(properties) {
    super(properties);
  }
}

export const button = new Button({
  selector: 'app-button',
  template: buttonTemplate,
});
