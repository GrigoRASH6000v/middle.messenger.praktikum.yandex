import Templator from "./utils/templator";
import "normalize.css";
import router from "./router/index";
import app from "./app/index.js";
import utils from "./utils";

window.utils = utils;

let entrySelector = "#app";

let entryPoint = selector => {
  return document.querySelector(selector);
};

const initApp = () => {
  const tmpl = new Templator(app);
  const renderTemplate = tmpl.compile();
  entryPoint(entrySelector).innerHTML = renderTemplate;
  entrySelector = app.entrySelector;
};

const initComponent = (path = "/") => {
  let currentComponent = router.find(route => route.path === path);
  currentComponent
    ? (currentComponent = currentComponent.component)
    : (currentComponent = router.find(
        route => route.path === "/404"
      ).component);
  const tmpl = new Templator(currentComponent);
  const renderTemplate = tmpl.compile();
  entryPoint(entrySelector).innerHTML = renderTemplate;
};

const initListenerLinks = () => {
  let links = [...document.querySelectorAll(".router-link")];
  links.forEach(link => {
    link.addEventListener("click", e => {
      e.preventDefault();
      let result = [...e.path].find(el => el.nodeName === "A");
      initComponent(result.pathname);
      setLocation(result.pathname);
    });
  });
};
function setLocation(path) {
  try {
    history.pushState(null, null, path);
    return;
  } catch (e) {}
  location.hash = "#" + path;
}

const getCurrentRoute = () => {
  return new URL(window.location).pathname;
};

initApp();
initComponent(getCurrentRoute());
initListenerLinks();
