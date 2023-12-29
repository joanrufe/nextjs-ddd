import { EventTypes } from "./interfaces/EventTypes";

// const debugEvents = process.env.DEBUG_EVENTS === "true";
// Create EventBus
export class EventBus {
  private handlers: Map<
    EventTypes,
    Array<{ handler: (data: any) => void; subscriberClass?: string }>
  >;
  private debugEvents = process.env.DEBUG_EVENTS === "true";

  constructor() {
    this.handlers = new Map<
      EventTypes,
      Array<{ handler: (data: any) => void; subscriberClass?: string }>
    >();
  }

  /**
   * This method is used to subscribe to an event.
   * It should be called in the constructor of the class that will subscribe to the event.
   *
   * @param event the event to subscribe to
   * @param handler the function to call when the event is published
   * @param subscriberClass the name of the class that is subscribing to the event, can be get using this.constructor.name
   */
  subscribe(
    event: EventTypes,
    handler: (data: any) => void,
    subscriberClass?: string
  ) {
    if (!this.handlers.has(event)) {
      this.handlers.set(event, []);
    }
    const handlers = this.handlers.get(event);
    if (handlers) {
      if (
        !handlers.some(
          (h) => h.handler === handler && h.subscriberClass === subscriberClass
        )
      ) {
        handlers.push({ handler, subscriberClass });
      }
    }
  }

  publish(event: EventTypes, data: any) {
    const handlers = this.handlers.get(event);
    if (handlers) {
      if (this.debugEvents) {
        console.log("📢 Publishing event: ", event);
      }
      handlers.forEach(({ handler, subscriberClass }) => {
        if (this.debugEvents) {
          if (subscriberClass) {
            console.log(
              "🏭 Subscriber class: ",
              subscriberClass,
              "🔧 method:",
              handler.name
            );
          }
        }
        handler(data);
      });
    }
  }

  unsubscribe(event: EventTypes, handler: (data: any) => void) {
    const handlers = this.handlers.get(event);
    if (handlers) {
      const index = handlers.findIndex((h) => h.handler === handler);
      if (index !== -1) {
        handlers.splice(index, 1);
      }
    }
  }
  debug() {
    console.log(this.handlers);
  }
}
