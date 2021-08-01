import { WFMComponent } from '../../framework';
import { tmpl } from './app.tmpl';

class TabPageComponent extends WFMComponent {
  constructor(config) {
    super(config);
  }
}

export const tabPageComponent = new TabPageComponent({
  selector: 'app-tab-page',
  template: tmpl,
});
