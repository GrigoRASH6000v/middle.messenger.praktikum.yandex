import get from '../modules/get.ts';

class Templator {
  _template:string

  _ctx:object

  _methods: object

  _data: {
    components: object,
    data: object,
    methods: object
  }

  constructor(data) {
    this._template = data.template;
    this._ctx = data.data;
    this._methods = data._methods;
    this._data = data;
  }

  static TEMPLATE_REGEXP = /\{\{(.*?)\}\}/gi;

  public compile():string {
    return this._compileTemplate();
  }

  private _compileTemplate():string {
    let tmpl = this._template;
    let key = null;
    const regExpData = Templator.TEMPLATE_REGEXP;
    while ((key = regExpData.exec(tmpl))) {
      if (key[1]) {
        const tmplValue = key[1].trim();
        const data = get(this._ctx, tmplValue);
        if (typeof data === 'function') {
          window[tmplValue] = data;
          tmpl = tmpl.replace(
            new RegExp(key[0], 'gi'),
            `window.${key[1].trim()}()`,
          );
          continue;
        }
        tmpl = tmpl.replace(new RegExp(key[0], 'gi'), data);
      }
    }
    if (this._data.components !== undefined) {
      for (const cKey in this._data.components) {
        const tmplComponent = new Templator(this._data.components[cKey]);
        const renderTemplate = tmplComponent.compile();
        tmpl = tmpl.replace(new RegExp(`\\<${cKey}\\/>`, 'gi'), renderTemplate);
      }
    }
    return tmpl;
  }
}

export default Templator;
