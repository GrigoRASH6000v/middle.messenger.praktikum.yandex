export class EventBus {
  public listeners: { [key: string]: ((...arguments_: []) => void)[] };

  constructor() {
    this.listeners = {};
  }

  on(event: string, callback: (...arguments_: []) => void): void {
    if (!this.listeners[event]) {
      this.listeners[event] = [];
    }

    this.listeners[event].push(callback);
  }

  off(event: string, callback: (...arguments_: []) => void): void {
    if (!this.listeners[event]) {
      throw new Error(`Нет события: ${event}`);
    }

    this.listeners[event] = this.listeners[event].filter(
      (listener) => listener !== callback
    );
  }

  emit(event: string, ...arguments_: []): void {
    if (!this.listeners[event]) {
      throw new Error(`Нет события: ${event}`);
    }

    for (const listener of this.listeners[event]) {
      listener(...arguments_);
    }
  }
}
