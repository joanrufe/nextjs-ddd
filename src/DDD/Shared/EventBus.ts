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
    this.handlers.get(event)?.push(handler);
  }

  publish(event: EventTypes, data: any) {
    const handlers = this.handlers.get(event);
    if (handlers) {
      handlers.forEach((handler) => handler(data));
    }
  }
}
