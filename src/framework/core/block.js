import { EventBus } from './ebent-bus';
import isEmpty from '../../utils/modules/isEmpty';
const templator = require('vue-template-compiler');
export class Block {
  static EVENTS = {
    FLOW_CDC: 'flow:component-did-created',
    FLOW_CDM: 'flow:component-did-mount',
    FLOW_CDU: 'flow:component-did-update',
  };

  /** JSDoc
   * @param {Object} props
   *
   * @returns {void}
   */
  constructor(props = {}) {
    this.el = null;
    const eventBus = new EventBus();
    this.props = props;
    this.components = props.components;
    this.template = props.template;
    this.selector = props.selector;
    this.data = props.data ? this._makePropsProxy(props.data) : null;
    this.eventBus = () => eventBus;
    this._registerEvents(eventBus);
  }
  init() {
    this.eventBus().emit(Block.EVENTS.FLOW_CDC);
  }
  _registerEvents(eventBus) {
    eventBus.on(Block.EVENTS.FLOW_CDC, this._created.bind(this));
    eventBus.on(Block.EVENTS.FLOW_CDM, this._mounted.bind(this));
    eventBus.on(Block.EVENTS.FLOW_CDU, this._update.bind(this));
  }
  _created() {
    if (this.template) {
      const compiled = templator.compile(this.template, this.data);
      this._createResources(compiled);
      this.eventBus().emit(Block.EVENTS.FLOW_CDM);
    }
  }

  _update() {
    this.eventBus().emit(Block.EVENTS.FLOW_CDC);
    this.update();
  }

  _mounted() {
    if (this.selector) {
      this._getTarget(this.selector).replaceWith(this.getNode());
      if (this.components) this.components.forEach((c) => c.init());
    }

    this.mounted();
  }
  update() {}
  created() {}
  mounted() {}
  _makePropsProxy(data) {
    const self = this;
    return new Proxy(data, {
      get(target, prop) {
        if (prop.startsWith('_')) {
          throw new Error('Нет прав');
        } else {
          let value = target[prop];
          return typeof value === 'function' ? value.bind(target) : value;
        }
      },
      set(target, prop, val) {
        const oldValue = target[prop];
        const newValue = val;
        if (prop.startsWith('_')) {
          throw new Error('Нет прав');
        } else {
          target[prop] = val;
          self.eventBus().emit(Block.EVENTS.FLOW_UPDATE, oldValue, newValue);
          return true;
        }
      },
      deleteProperty() {
        throw new Error('нет доступа');
      },
    });
  }
  _getTarget(selector) {
    return document.querySelector(selector);
  }
  _createResources(compiled) {
    this.el = this._createDocumentElement(compiled.ast);
  }
  _createDocumentElement(obj) {
    if (!obj.children) return;
    let children = obj.children;
    let nodeElement = document.createElement(obj.tag);
    if (!isEmpty(obj.attrsMap)) this._setAttrs(nodeElement, obj.attrsMap);
    if (children)
      children.forEach((child) => {
        child.type === 3 ? (nodeElement.textContent = child.text) : null;
        if (child.type === 2) {
          nodeElement.textContent = child.tokens
            .map((t) => this.data[t['@binding']])
            .join(' ');
        }
      });
    for (let key in children) {
      let child = this._createDocumentElement(children[key]);
      if (child) {
        nodeElement.append(child);
      }
    }
    return nodeElement;
  }
  _setAttrs(element, attrs) {
    for (let key in attrs) {
      element.setAttribute(key, attrs[key]);
    }
    return element;
  }
  getNode() {
    return this.el;
  }
}
