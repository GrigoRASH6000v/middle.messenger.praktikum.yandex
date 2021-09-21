interface Route {
  path: string;
  component: unknown;
  redirect?: string | undefined;
}

class Router {
  public routes: Route[];
  public selector: string;
  public pathNotFound: string;
  public entryPoint: HTMLElement | null;
  public currentPath: string | null;
  constructor(params: { routes: Route[] }) {
    this.routes = params.routes;

    this.selector = 'router-view';

    this.pathNotFound = '*';

    this.entryPoint = null;

    this.currentPath = null;
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
    if (this.currentPath !== path) {
      const content = this.entryPoint.firstChild;
      if (content) content.remove();
      this.currentPath = path;
      const currentComponent = this.find(this.currentPath);
      const recource = this.createResources(
        currentComponent.component.selector
      );
      this.entryPoint.append(recource);
      currentComponent.component.init();
      this.setLocation(path);
    }
  }

  createResources(tag: string): HTMLElement {
    return document.createElement(tag);
  }

  init(): void {
    this.entryPoint = document.querySelector(this.selector);
    this.mountComponent(window.location.pathname);
    this.initListeners();
  }

  initListeners(): void {
    const callback = (event: any): void => {
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

  public setLocation(path: string): void {
    window.history.pushState(null, null, path);
  }
}

export default Router;
