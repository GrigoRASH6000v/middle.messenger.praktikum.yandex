import { Block } from '../../framework/core/block.ts';
import { errorPageTemplate } from './error-page.template';

interface Properties {
  components?: Block[];
  selector?: string;
  template: string;
  data?: { [key: string]: unknown };
  methods?: { [key: string]: () => unknown };
}

class ErrorPage extends Block {
  constructor(properties: Properties) {
    super(properties);
  }
}

export const errorPage = new ErrorPage({
  template: errorPageTemplate,
});
