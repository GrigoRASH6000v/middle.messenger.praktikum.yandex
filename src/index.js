import Templator from "./utils/templator";
import "normalize.css";
import routerModule from "./router";
import app from "./app/index.js";
import utils from "./utils";

const entrySelector = "#app";
const router = new routerModule("#main")

window.utils = utils;


const initApp = () => {
  const tmpl = new Templator(app);
  const renderTemplate = tmpl.compile();
  document.querySelector(entrySelector).innerHTML = renderTemplate;
  router.init()
};

initApp(entrySelector);

