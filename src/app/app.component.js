import { Block } from '../framework/core/block';
import { appTemplate } from './app.template';
import { navigation } from '../components/navigation/navigation.component';
import { home } from '../pages/home/home.component';
class App extends Block {
  constructor(props) {
    super(props);
  }
}

export const app = new App({
  selector: 'app',
  template: appTemplate,
  components: [navigation, home],
});
