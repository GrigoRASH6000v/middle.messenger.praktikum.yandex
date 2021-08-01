import { appButton } from '../components/button/app.button';
import { appHeader } from '../components/header/app.header';
import { WFMModule } from '../framework';
import { appComponent } from './app.component';
import { appRoutes } from '../router/app.routes';

class TabPageModule extends WFMModule {
  constructor(config) {
    super(config);
  }
}
export const tabPageModule = new TabPageModule({
  components: [appButton],
});
