class Component<TState extends object = {}> {
  // Состояние компонента, здесь будем держать дескрипторы
  state: TState = {};

  // Имя компонента для поиска шаблона и тега
  name: string;

  // Конкретный тег в разметке страницы, на месте которого должен появиться компонент
  targetElement: HTMLElement;

  // Здесь будем хранить элемент компонента
  private node: HTMLElement;

  // Для хранения всех ya-model
  private models: Array<string>;

  constructor(name: string, targetElement: HTMLElement) {
    this.name = name;
    this.targetElement = targetElement;

    // Описанные шаги
    this.prepareTemplate();
    this.prepareVariables();
    this.bindVariables();
    this.bindActions();
    this.render();
  }

  prepareTemplate(): void {
    const template = document.getElementById(this.name);
    if (!template) {
      throw new Error("No such template");
    }
    this.node = template.cloneNode(true).content.children[0];
  }

  prepareVariables(): void {
    // Соберём все упоминания ya-model и извлечём названия
    const rawModels: Array<string> = Array.from(
      this.node.querySelectorAll("[ya-model]")
    ).map(element => element.getAttribute("ya-model"));
    // Отфильтруем повторения
    this.models = [...new Set(rawModels)];
  }

  bindVariables(): void {
    // Пройдёмся по всем найденным моделям в шаблоне компонента
    this.models.forEach((modelName: string) => {
      // Найдём все элементы, которые надо привязать к модели
      const elements = [
        ...this.node.querySelectorAll(`[ya-model="${modelName}"]`),
      ];
      // Замкнём переменную, в которой будем держать значение
      let value = "";

      Object.defineProperty(this.state, modelName, {
        get() {
          return value;
        },
        set(newValue: string) {
          value = newValue;
          // Когда значение будет меняться —
          // подставим его либо в value инпутов, либо в textContent элементов
          elements.forEach(element => {
            if (element.tagName === "INPUT") {
              element.value = newValue;
            } else {
              element.textContent = value;
            }
          });
        },
      });

      // всем инпутам дадим обработчик на keyup
      this.node
        .querySelector(`input[ya-model="${modelName}"]`)
        .addEventListener("keyup", e => {
          this.state[modelName] = e.target.value;
        });
    });
  }

  bindActions(): void {
    // нашли все элемента
    this.node.querySelectorAll("[ya-click]").forEach((element) => {
      // взяли значение атрибута
        const fnName = element.getAttribute("ya-click");
        element.addEventListener("click", () => {
          // вызвали и не забыли сохранить контекст
          this[fnName].call(this);
        });
      });
    }

    render(): void {
        this.targetElement.parentNode.replaceChild(this.node, this.targetElement);
    }
}
