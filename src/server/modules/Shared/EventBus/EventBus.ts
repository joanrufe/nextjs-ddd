import { injectable } from "inversify";

// Generic type for events
export class DomainEvent {}

@injectable()
export class EventBus {
  private handlers: Map<
    string,
    Array<{ handler: (data: any) => void; subscriberClass?: string }>
  >;
  private debugEvents = process.env.DEBUG_EVENTS === "true";

  constructor() {
    this.handlers = new Map<
      string,
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
    event: string,
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

  publish<T extends DomainEvent>(event: T) {
    const handlers = this.handlers.get(event.constructor.name);
    if (handlers) {
      if (this.debugEvents) {
        console.log("📢 Publishing event: ", event.constructor.name);
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
        handler(event);
      });
    }
  }

  unsubscribe(event: string, handler: (data: any) => void) {
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

export const eventBusSingleton = new EventBus();
