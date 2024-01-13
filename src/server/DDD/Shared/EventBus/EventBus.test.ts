import { DomainEvent, EventBus } from "./EventBus";

class MyUserCreatedEvent extends DomainEvent {
  // public eventType = "MyUserCreatedEvent";
  constructor(public readonly user: { id: number; name: string }) {
    super();
  }
}

describe("EventBus", () => {
  let eventBus: EventBus;
  const user = { id: 1, name: "John Doe" };

  beforeEach(() => {
    eventBus = new EventBus();
  });

  describe("subscribe", () => {
    it("should subscribe to an event and call the handler when published", () => {
      // const event: EventTypes = "UserCreated";
      const event = new MyUserCreatedEvent(user);
      const handler = jest.fn();

      eventBus.subscribe(MyUserCreatedEvent.name, handler);
      eventBus.publish(event);

      expect(handler).toHaveBeenCalledWith({ user });
    });

    it("should call multiple handlers when an event is published", () => {
      const event = new MyUserCreatedEvent(user);
      const handler1 = jest.fn();
      const handler2 = jest.fn();

      eventBus.subscribe(MyUserCreatedEvent.name, handler1);
      eventBus.subscribe(MyUserCreatedEvent.name, handler2);
      eventBus.publish(event);

      expect(handler1).toHaveBeenCalledWith({ user });
      expect(handler2).toHaveBeenCalledWith({ user });
    });
    it("should not be able to subscribe to the same event twice", () => {
      const event = new MyUserCreatedEvent(user);
      const handler = jest.fn();

      eventBus.subscribe(MyUserCreatedEvent.name, handler);
      eventBus.subscribe(MyUserCreatedEvent.name, handler);
      eventBus.publish(event);

      expect(handler).toHaveBeenCalledTimes(1);
    });
  });

  describe("publish", () => {
    it("should not call the handler if not subscribed to the event", () => {
      const event = new MyUserCreatedEvent(user);
      const handler = jest.fn();

      eventBus.publish(event);

      expect(handler).not.toHaveBeenCalled();
    });
  });

  describe("unsubscribe", () => {
    it("should unsubscribe a handler from an event", () => {
      const event = new MyUserCreatedEvent(user);
      const handler = jest.fn();

      eventBus.subscribe(MyUserCreatedEvent.name, handler);
      eventBus.unsubscribe(MyUserCreatedEvent.name, handler);
      eventBus.publish(event);

      expect(handler).not.toHaveBeenCalled();
    });

    it("should not throw an error when unsubscribing a non-existing handler", () => {
      const event = new MyUserCreatedEvent(user);
      const handler = jest.fn();

      eventBus.unsubscribe(MyUserCreatedEvent.name, handler);

      expect(handler).not.toHaveBeenCalled();
    });
  });

  describe("debug", () => {
    beforeAll(() => {
      process.env.DEBUG_EVENTS = "true";
      eventBus = new EventBus();
    });
    afterAll(() => {
      delete process.env.DEBUG_EVENTS;
    });
    it("should log the handlers and subscribersClasses when process.env.DEBUG_EVENTS is true", () => {
      const event = new MyUserCreatedEvent(user);
      const handler = jest.fn();
      const subscriberClass = "UserRegister";

      jest.spyOn(console, "log").mockImplementation(() => {});

      eventBus.subscribe(MyUserCreatedEvent.name, handler, subscriberClass);
      eventBus.publish(event);

      expect(console.log).toHaveBeenCalledWith(
        "📢 Publishing event: ",
        MyUserCreatedEvent.name
      );
      expect(console.log).toHaveBeenCalledWith(
        "🏭 Subscriber class: ",
        subscriberClass,
        "🔧 method:",
        "mockConstructor"
      );
    });
  });
});
