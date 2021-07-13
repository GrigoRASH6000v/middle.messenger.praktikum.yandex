import routes from "./routes";
import Templator from "../utils/templator";

export default class router {
  constructor(selector) {
    (this.selector = selector),
      (this.routes = routes),
      (this.page404 = this.find("/404"));
  }
  initListeners() {
    let callback = event => {
      event.preventDefault();
      event = window.e || event;
      if (event.target.tagName === "A") {
        return this.mountComponent(event.target.pathname);
      }
      if (event.target.parentNode.tagName === "A") {
        return this.mountComponent(event.target.parentNode.pathname);
      }
    };
    if (document.addEventListener) {
      document.addEventListener("click", callback, false);
    } else document.attachEvent("onclick", callback);
  }
  find(path) {
    let result = this.routes.find(el => el.path === path);
    return result ? result : this.notFound();
  }
  init() {
    this.mountComponent(new URL(window.location).pathname)
    return this.initListeners();
  }
  mountComponent(path) {
    const tmpl = new Templator(this.find(path).component);
    let container = document.querySelector(this.selector);
    this.setLocation(path);
    return (container.innerHTML = tmpl.compile());
  }
  notFound() {
    return this.page404;
  }
  setLocation(path) {
    try {
      history.pushState(null, null, path);
      return;
    } catch (e) {}
    location.hash = "#" + path;
  }
}
