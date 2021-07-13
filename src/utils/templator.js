import get from "../utils/modules/get";

export default class Templator {
  constructor(data) {
    this._template = data.template;
    this._ctx = data.data;
    this._methods = data._methods;
    this._data = data;
  }
  static TEMPLATE_REGEXP = /\{\{(.*?)\}\}/gi;
  static COMPONENTS_REGEXP = /\<(.*?) ?\/\>/gi;
  compile() {
    return this._compileTemplate();
  }
  _compileTemplate() {
    let tmpl = this._template;
    let key = null;
    const regExpData = Templator.TEMPLATE_REGEXP;
    while ((key = regExpData.exec(tmpl))) {
      if (key[1]) {
        const tmplValue = key[1].trim();
        const data = get(this._ctx, tmplValue);
        if (typeof data === "function") {
          window[tmplValue] = data;
          tmpl = tmpl.replace(
            new RegExp(key[0], "gi"),
            `window.${key[1].trim()}()`
          );
          continue;
        }
        tmpl = tmpl.replace(new RegExp(key[0], "gi"), data);
      }
    }
    if (this._data.components !== undefined) {
      for (let cKey in this._data.components) {
        let tmplComponent = new Templator(this._data.components[cKey]);
        let renderTemplate = tmplComponent.compile();
        tmpl = tmpl.replace(new RegExp(`\\<${cKey}\\/>`, "gi"), renderTemplate);
      }
    }
    return tmpl;
  }
}
