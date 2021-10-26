import { store } from '@/store/index.ts';

interface Route {
  path: string;
  component: unknown;
  redirect?: string | undefined;
}

class Router {
  private pageLinks: HTMLElement[];
  public currentComponent: {
    path: string;
    redirect?: string;
    component?: unknown;
  } | null;
  public history: { [key: string]: unknown };
  public linkClass;
  public routes;
  public selector: string;
  public pathNotFound: string;
  public entryPoint: HTMLElement | null;
  public currentPath: string | null;
  constructor(params: { routes: Route[]; linkClass: string }) {
    this.history = window.history;
    this.pageLinks = [];
    this.routes = params.routes;
    this.linkClass = params.linkClass;
    this.selector = 'router-view';

    this.pathNotFound = '*';

    this.entryPoint = null;

    this.currentPath = null;

    this.currentComponent = null;
  }

  find(path: string): Route {
    const result = this.routes.find((element) => element.path === path);
    if (result) {
      return result.redirect ? this.find(result.redirect) : result;
    }
    const notFound = this.find(this.pathNotFound);
    return notFound.redirect ? this.find(notFound.redirect) : notFound;
  }

  mountComponent(path: string): void {
    if (!store.state.authenticated && path !== '/sign-up') {
      path = '/login';
    }
    if (this.currentPath !== path) {
      const content = this.entryPoint.firstChild;
      if (content) content.remove();
      this.currentPath = path;
      this.currentComponent = this.find(this.currentPath);

      const recource = this.createResources(
        this.currentComponent.component.selector,
      );
      this.entryPoint.append(recource);
      this.currentComponent.component.init();
      this.setLocation(this.currentComponent.path);
      this.initListeners();
    }
  }

  createResources(tag: string): HTMLElement {
    return document.createElement(tag);
  }

  init(): void {
    this.entryPoint = document.querySelector(this.selector);
    this.mountComponent(window.location.pathname);
    this.initListeners();
    this.subscribeWindowChange();
  }
  subscribeWindowChange() {
    window.onpopstate = ((event) => {
      console.log('onpopstate');
      this.mountComponent(event.currentTarget.location.pathname);
    });
  }
  initListeners(): void {
    this.pageLinks = document.querySelectorAll(`.${this.linkClass}`);
    const callback = (event: any): void => {
      event.preventDefault();
      event.stopPropagation();
      this.mountComponent(event.currentTarget.pathname);
    };
    this.pageLinks.forEach((link) => link.addEventListener('click', callback, false));
  }
  back() {
    this.history.back();
  }

  forward() {
    this.history.forward();
  }
  navigation(path) {
    this.mountComponent(path);
  }
  public setLocation(path: string): void {
    window.history.pushState(null, null, path);
  }
}

export default Router;
