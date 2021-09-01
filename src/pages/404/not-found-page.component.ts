import { Block } from '../../framework/core/block.ts';
import { notFoundPageTemplate } from './not-found-page.template';

interface Properties {
  components?: Block[];
  selector: string;
  template: string;
  data?: { [key: string]: unknown };
  methods?: { [key: string]: () => unknown };
}

class NotFoundPage extends Block {
  constructor(properties: Properties) {
    super(properties);
  }
}

export const notFoundPage = new NotFoundPage({
  selector: 'not-found',
  template: notFoundPageTemplate,
});
