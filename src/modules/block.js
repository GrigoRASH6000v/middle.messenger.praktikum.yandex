import Temlator from '../utils/templator/index.ts';
import EventBus from './eventBus';
import Handlebars from 'handlebars';

// Нельзя создавать экземпляр данного класса
class Block {
  static EVENTS = {
    INIT: 'init',
    FLOW_CDM: 'flow:component-did-mount',
    FLOW_RENDER: 'flow:render',
    FLOW_UPDATE: 'flow:component-did-update',
  };

  _element = null;
  _meta = null;
  /** JSDoc
   * @param {string} tagName
   * @param {Object} props
   *
   * @returns {void}
   */
  constructor(tagName = 'div', props = {}) {
    const eventBus = new EventBus();
    this._meta = {
      tagName,
      props,
    };

    this.props = this._makePropsProxy(props);

    this.eventBus = () => eventBus;

    this._registerEvents(eventBus);
    eventBus.emit(Block.EVENTS.INIT);
  }

  _registerEvents(eventBus) {
    eventBus.on(Block.EVENTS.INIT, this.init.bind(this));
    eventBus.on(Block.EVENTS.FLOW_CDM, this._componentDidMount.bind(this));
    eventBus.on(Block.EVENTS.FLOW_RENDER, this._render.bind(this));
    eventBus.on(Block.EVENTS.FLOW_UPDATE, this._componentDidUpdate.bind(this));
  }

  _createResources() {
    const { tagName } = this._meta;
    this._element = this._createDocumentElement(tagName);
    this.eventBus().emit(Block.EVENTS.FLOW_RENDER);
  }

  init() {
    this._createResources();
  }
  _componentDidMount() {
    this.componentDidMount();
  }

  // Может переопределять пользователь, необязательно трогать
  componentDidMount(oldProps) {}

  _componentDidUpdate(oldProps, newProps) {
    if (oldProps !== newProps) {
      const response = this.componentDidUpdate(oldProps, newProps);
      this.eventBus().emit(Block.EVENTS.FLOW_RENDER);
      return true;
    }
    return false;
  }

  // Может переопределять пользователь, необязательно трогать
  componentDidUpdate(oldProps, newProps) {
    return true;
  }

  setProps = (nextProps) => {
    if (!nextProps) {
      return;
    }
    Object.assign(this.props, nextProps);
  };

  get element() {
    return this._element;
  }
  _render() {
    // const block = this.render();
    // const template = Handlebars.compile('Handlebars <b>{{doesWhat}}</b>');
    // console.log(template({ doesWhat: 'rocks!' }));
    // // Этот небезопасный метод для упрощения логики
    // // Используйте шаблонизатор из npm или напишите свой безопасный
    // // Нужно не- в строку компилировать (или делать это правильно),
    // // либо сразу в DOM-элементы возвращать из compile DOM-ноду
    // console.log(block);
    // this._element.innerHTML = block;
  }

  // Может переопределять пользователь, необязательно трогать
  render() {}

  getContent() {
    this.eventBus().emit(Block.EVENTS.FLOW_CDM);
    return this.element;
  }

  _makePropsProxy(props) {
    const self = this;
    return new Proxy(props, {
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

  _createDocumentElement(tagName) {
    // Можно сделать метод, который через фрагменты в цикле создаёт сразу несколько блоков
    return document.createElement(tagName);
  }

  show() {
    this.element.style.display = 'block';
  }

  hide() {
    this.element.style.display = 'none';
  }
}

export default Block;
