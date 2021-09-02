import { EventBus } from './ebent-bus.ts';
import isEmpty from '../../utils/modules/isEmpty';

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

  private readonly template: string;

  public readonly selector: string;

  private data: { [key: string]: unknown };

  private methods: { [key: string]: () => unknown };

  readonly eventBus: EventBus = new EventBus();

  public components: Block[];

  constructor(properties: Properties) {
    this.parent = null;
    this.el = null;
    this.components = properties.components;
    this.methods = properties.methods;
    this.template = properties.template;
    this.selector = properties.selector;
    this.data = properties.data ? this._makePropsProxy(properties.data) : null;
    this._registerEvents(this.eventBus);
  }

  init(): void {
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

  _update(): void {
    this.update();
  }

  _mounted(): void {
    if (this.selector) {
      const target = this._getTarget(this.selector);
      this.parent = this._getParent(target);
      target.replaceWith(this.getNode());
      if (this.components) for (const c of this.components) c.init();
    }

    this.mounted();
  }

  update(): void {}

  created(): void {}

  mounted(): void {}

  _makePropsProxy(data: object) {
    return new Proxy(data, {
      get(target: any, property: string) {
        if (property.startsWith('_')) {
          throw new Error('Нет прав');
        } else {
          const value = target[property];
          return typeof value === 'function' ? value.bind(target) : value;
        }
      },
      set: (target: any, property: string, value) => {
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

  _getTarget(selector: string): HTMLElement {
    return document.querySelector(selector);
  }
  _getParent(target: HTMLElement) {
    return target.parentNode;
  }
  _createResources(compiled: any) {
    this.el = this._createDocumentElement(compiled.ast);
  }

  _createDocumentElement(object: {
    [key: string]: unknown;
  }): HTMLElement | undefined {
    if (!object.children) return;
    const { children } = object;
    const nodeElement = document.createElement(object.tag);
    if (!isEmpty(object.attrsMap)) {
      const attrs = object.attrsMap;
      for (const key in attrs) {
        if (key === '@click') {
          nodeElement.addEventListener(
            'click',
            this.methods[attrs[key]].bind(this)
          );
        } else if (key === 'v-model') {
          if (nodeElement.tagName === 'INPUT') {
            nodeElement.addEventListener('input', () => {
              this.setProps(attrs[key], nodeElement.value);
            });
          }
        } else {
          this._setAttrs(nodeElement, key, attrs[key]);
        }
      }
    }

    if (children) {
      children.forEach((child: { [key: string]: unknown }) => {
        child.type === Block.BIND_TYPES.IS_TEXT
          ? (nodeElement.textContent = child.text)
          : null;
        if (child.type === Block.BIND_TYPES.IS_METHOD) {
          nodeElement.textContent = child.tokens
            .map((t: unknown) => this.data[t['@binding']])
            .join(' ');
        }
      });
    }
    for (const key in children) {
      const child = this._createDocumentElement(children[key]);
      if (child) {
        nodeElement.append(child);
      }
    }
    return nodeElement;
  }
  _setAttrs(element: HTMLElement, key: unknown, value: unknown): void {
    element.setAttribute(key, value);
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
