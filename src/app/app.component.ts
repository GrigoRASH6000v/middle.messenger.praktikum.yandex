import { Block } from '../framework/core/block.ts';
import { appTemplate } from './app.template';
import { navigation } from '../components/navigation/navigation.component';

export class App extends Block {
  constructor(props: unknown) {
    super(props);
  }
}

export const app = new App({
  selector: 'app',
  template: appTemplate,
  components: [navigation],
});
