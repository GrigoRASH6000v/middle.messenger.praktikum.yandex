import { WFMComponent } from '../../framework';
import { tmpl } from './app.tmpl';

class AppHeader extends WFMComponent {
  constructor(config) {
    super(config);
  }
}

export const appHeader = new AppHeader({
  selector: 'app-header',
  template: tmpl,
});
