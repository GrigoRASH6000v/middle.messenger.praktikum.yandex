import Templator from "./utils/templator/index";
import test from "./test2"
import "normalize.css";
import routerModule from "./router/index";
import app from "./app/index.js";
import utils from "./utils/index";


const entrySelector = "#app";
const router = new routerModule("#main")

declare global {
  interface Window { utils: object; }
}
window.utils = utils || {}

const initApp = (point:string):void => {
  const tmpl = new Templator(app);
  const renderTemplate = tmpl.compile();
  document.querySelector(point).innerHTML = renderTemplate;
  router.init()
};


initApp(entrySelector);

