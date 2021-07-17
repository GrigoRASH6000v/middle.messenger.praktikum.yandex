import routes from "./routes";
import Templator from "../utils/templator/index";

class router {
  selector: string;
  page404: object;
  constructor(selector: string) {
    this.selector = selector;
    this.page404 = this.find("/404");
  }
  private find(path: string): object {
    let result = routes.find(el => el.path === path);
    return result ? result : this.notFound();
  }
  public init(): void {
    this.mountComponent(window.location.pathname);
    this.initListeners();
  }
  private initListeners():void {
    let callback = event => {
      event.preventDefault();
      if (event.target.tagName === "A") {
        return this.mountComponent(event.target.pathname);
      }
      if (event.target.parentNode.tagName === "A") {
        return this.mountComponent(event.target.parentNode.pathname);
      }
    };
    document.addEventListener("click", callback, false);
  }
  private mountComponent(path: string): void {
    const currentComponent: object = this.find(path);
    const tmpl = new Templator(currentComponent.component);
    let container = document.querySelector(this.selector);
    this.setLocation(path);
    container.innerHTML = tmpl.compile();
    return;
  }
  private notFound():object {
    return this.page404;
  }
  private setLocation(path):void {
    try {
      history.pushState(null, null, path);
      return;
    } catch (e) {}
    location.hash = "#" + path;
  }
}
export default router;
