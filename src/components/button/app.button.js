import { WFMComponent } from '../../framework';

class AppButton extends WFMComponent {
  constructor(config) {
    super(config);
  }
}

export const appButton = new AppButton({
  selector: 'app-button',
  template: `
        <button>App button</button>
    `,
});
