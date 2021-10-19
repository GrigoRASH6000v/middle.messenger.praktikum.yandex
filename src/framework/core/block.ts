import { EventBus } from './ebent-bus.ts';
import { utils } from '@/utils/index.ts';

const templator = require('vue-template-compiler');

interface Properties {
  components?: Block[];
  selector: string;
  template: string;
  data?: { [key: string]: string };
  methods?: { [key: string]: () => unknown };
}

export abstract class Block {
  static BIND_TYPES = {
    IS_BLOCK: 1,
    IS_TEXT: 3,
    IS_METHOD: 2,
  };
  static EVENTS = {
    FLOW_CDC: 'flow:component-did-created',
    FLOW_CDM: 'flow:component-did-mount',
    FLOW_CDU: 'flow:component-did-update',
  };
  private parent: HTMLElement | null;

  private el: HTMLElement | null;

  private target: HTMLElement | null;

  private mount: boolean;

  private readonly template: string;

  public readonly selector: string;

  private data: { [key: string]: unknown };

  private methods: { [key: string]: () => unknown };

  readonly eventBus: EventBus = new EventBus();

  public components: Block[];

  constructor(properties: Properties) {
    this.mount = false;
    this.parent = null;
    this.el = null;
    this.components = properties.components;
    this.methods = properties.methods;
    this.template = properties.template;
    this.target = null;
    this.selector = properties.selector;
    this.data = properties.data ? this._makeDeepProxy(properties.data) : null;
    this._registerEvents(this.eventBus);
  }

  init(): void {
    this._binding();
    this.eventBus.emit(Block.EVENTS.FLOW_CDC);
  }

  _registerEvents(eventBus: EventBus): void {
    eventBus.on(Block.EVENTS.FLOW_CDC, this._created.bind(this));
    eventBus.on(Block.EVENTS.FLOW_CDM, this._mounted.bind(this));
    eventBus.on(Block.EVENTS.FLOW_CDU, this._update.bind(this));
  }

  _created(): void {
    if (this.template) {
      const compiled = templator.compile(this.template, this.data);
      this._createResources(compiled);
      this.eventBus.emit(Block.EVENTS.FLOW_CDM);
    }
  }
  _binding() {
    for (let key in this.methods) {
      this.methods[key] = this.methods[key].bind(this);
    }
  }
  _makeDeepProxy(obj) {
    obj = this._makePropsProxy(obj);
    for (let key in obj) {
      if (utils.isObject(obj[key])) {
        obj[key] = this._makeDeepProxy(obj[key]);
      }
    }
    return obj;
  }
  _makePropsProxy(data) {
    return new Proxy(data, {
      get(target, property) {
        if (property.startsWith('_')) {
          throw new Error('Нет прав');
        } else {
          const value = target[property];
          return typeof value === 'function' ? value.bind(target) : value;
        }
      },
      set: (target, property, value) => {
        if (property.startsWith('_')) {
          throw new Error('Нет прав');
        } else {
          target[property] = value;
          return true;
        }
      },
      deleteProperty() {
        throw new Error('нет доступа');
      },
    });
  }
  _update(): void {
    const compiled = templator.compile(this.template, this.data);
    this._createResources(compiled);
    this.target?.replaceWith(this.getNode());
    this.update();
  }

  _mounted(): void {
    if (this.selector) {
      this.target = this._getTarget(this.selector);
      this.parent = this._getParent(this.target);
      this.target.replaceWith(this.getNode());
      this.target = document.getElementById(this.getNode().id);
      if (this.components) for (const c of this.components) c.init();
      this.mount = true;
    }

    this.mounted();
  }

  update(): void {}

  created(): void {}

  mounted(): void {}
  _getTarget(selector: string): HTMLElement {
    return document.querySelector(selector);
  }
  _getParent(target: HTMLElement) {
    return target.parentNode;
  }
  _createResources(compiled: any) {
    this.el = this._createDocumentElement(compiled.ast);
  }

  _createDocumentElement(object, data = this.data) {
    if (!object.children) return;
    const nodeElement = document.createElement(object.tag);
    let vFor = false;
    let fragment = null;
    if (!utils.isEmpty(object.attrsMap)) {
      const attrs = object.attrsMap;
      for (const key in attrs) {
        if (key === '@click') {
          nodeElement.addEventListener(
            'click',
            this.methods[attrs[key]].bind(this)
          );
        } else if (key === 'v-model') {
          if (nodeElement.tagName === 'INPUT') {
            nodeElement.value = utils.get(data, attrs[key], '');
            nodeElement.addEventListener('input', () => {
              utils.set(data, attrs[key], nodeElement.value);
            });
          }
        } else if (key === 'v-for') {
          let item = attrs[key].split('of')[0].trim();
          let list = attrs[key].split('of')[1].trim();
          let dataList = this.data[list];
          vFor = dataList;
        } else {
          this._setAttrs(nodeElement, key, attrs[key]);
        }
      }
    }
    if (object.children) {
      object.children.forEach((child: { [key: string]: unknown }) => {
        child.type === Block.BIND_TYPES.IS_TEXT
          ? (nodeElement.textContent = child.text)
          : null;
        if (child.type === Block.BIND_TYPES.IS_METHOD) {
          nodeElement.textContent = child.tokens
            .map((t: unknown) => {
              return utils.get(data, t['@binding'], '');
            })
            .join(' ');
        }
      });
    }

    if (object.children) {
      if (object.type === Block.BIND_TYPES.IS_TEXT) {
        nodeElement.textContent = object.text;
      }
      object.children.forEach((el) => {
        let child = this._createDocumentElement(el);
        if (child) {
          nodeElement.appendChild(child);
        }
      });
    }
    if (vFor) {
      fragment = document.createDocumentFragment();
      vFor.forEach((element) => {
        let cloneNode = nodeElement.cloneNode(true);
        fragment.appendChild(cloneNode);
      });
      return fragment;
    }

    return nodeElement;
  }
  _setAttrs(element: HTMLElement, key: string, value: unknown): void {
    if (element.nodeName === '#document-fragment') {
      for (let i = 0; i < element.children.length; i++) {
        element.children[i].setAttribute(key, value);
      }
      return;
    }
    element.setAttribute(key, value);
    return;
  }

  getNode(): HTMLElement {
    return this.el;
  }
  setProps = (key: string, value: unknown): void => {
    if (!key) {
      return;
    }
    this.data[key] = value;
  };
}
