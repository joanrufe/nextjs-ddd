import { EventTypes } from "./EventTypes";

// Create EventBus
export class EventBus {
  private handlers: Map<EventTypes, Array<(data: any) => void>>;

  constructor() {
    this.handlers = new Map<EventTypes, Array<(data: any) => void>>();
  }

  subscribe(event: EventTypes, handler: (data: any) => void) {
    if (!this.handlers.has(event)) {
      this.handlers.set(event, []);
    }
    const handlers = this.handlers.get(event);
    if (handlers && !handlers.includes(handler)) {
      handlers.push(handler);
    }
  }

  publish(event: EventTypes, data: any) {
    const handlers = this.handlers.get(event);
    if (handlers) {
      handlers.forEach((handler) => handler(data));
    }
  }
  unsubscribe(event: EventTypes, handler: (data: any) => void) {
    const handlers = this.handlers.get(event);
    if (handlers) {
      const index = handlers.indexOf(handler);
      if (index !== -1) {
        handlers.splice(index, 1);
      }
    }
  }
}
