import { EventBus } from './ebent-bus';

interface Properties {
  selector: string;
  template: string;
  data?: { [key: string]: string };
  methods?: { [key: string]: () => unknown };
}

export class Store {
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
  public store: unknown;
  private el: HTMLElement | null;

  private readonly template: string;

  public readonly selector: string;

  private data: { [key: string]: unknown };

  private methods: { [key: string]: () => unknown };

  readonly eventBus: EventBus = new EventBus();

  public components: Block[];

  constructor(properties: Properties) {
    this.mutations = properties.mutations;
    this.actions = properties.actions;
    this.state = properties.state;
    this.methods = properties.methods;
    this.data = properties.data ? this._makePropsProxy(properties.data) : null;
    this._registerEvents(this.eventBus);
  }

  init(): void {
    this.eventBus.emit(Store.EVENTS.FLOW_CDC);
  }

  _registerEvents(eventBus: EventBus): void {
    eventBus.on(Store.EVENTS.FLOW_CDC, this._created.bind(this));
    eventBus.on(Store.EVENTS.FLOW_CDM, this._mounted.bind(this));
    eventBus.on(Store.EVENTS.FLOW_CDU, this._update.bind(this));
  }

  _created(): void {
    this._binding(this.actions);
    this._binding(this.mutations);
    // if (this.template) {
    //   const compiled = templator.compile(this.template, this.data);
    //   this._createResources(compiled);
    //   this.eventBus.emit(Block.EVENTS.FLOW_CDM);
    // }
  }
  _binding(obj) {
    for (let key in obj) {
      obj[key].bind();
    }
  }
  commit(key, value) {
    this.mutations[key](value);
  }
  _update(): void {
    this.update();
  }

  _mounted(): void {
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
}
