import { appRoutes } from './app.routes.js';
import Templator from '../utils/templator/index.ts';

class router {
  selector: string;

  page404: object;

  constructor(selector: string) {
    this.selector = selector;
    this.page404 = this.find('/404');
  }

  private find(path: string): object {
    const result = appRoutes.find((element) => element.path === path);
    return result || this.notFound();
  }

  public init(): void {
    this.mountComponent(window.location.pathname);
    this.initListeners();
  }

  private initListeners(): void {
    const callback = (event) => {
      event.preventDefault();
      if (event.target.tagName === 'A') {
        return this.mountComponent(event.target.pathname);
      }
      if (event.target.parentNode.tagName === 'A') {
        return this.mountComponent(event.target.parentNode.pathname);
      }
    };
    document.addEventListener('click', callback, false);
  }

  private mountComponent(path: string): void {
    const currentComponent: object = this.find(path);
    const tmpl = new Templator(currentComponent.component);
    const container = document.querySelector(this.selector);
    this.setLocation(path);
    container.innerHTML = tmpl.compile();
  }

  private notFound(): object {
    return this.page404;
  }

  private setLocation(path): void {
    try {
      history.pushState(null, null, path);
      return;
    } catch {}
    location.hash = `#${path}`;
  }
}
export default router;

// export const router = {
//   getUrl() {
//     return window.location.hash.slice(1);
//   },
// };
