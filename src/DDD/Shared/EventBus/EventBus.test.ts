import { EventBus } from "./EventBus";
import { EventTypes } from "./interfaces/EventTypes";

describe("EventBus", () => {
  let eventBus: EventBus;

  beforeEach(() => {
    eventBus = new EventBus();
  });

  describe("subscribe", () => {
    it("should subscribe to an event and call the handler when published", () => {
      const event: EventTypes = "UserCreated";
      const handler = jest.fn();

      eventBus.subscribe(event, handler);
      eventBus.publish(event, { id: 1, name: "John Doe" });

      expect(handler).toHaveBeenCalledWith({ id: 1, name: "John Doe" });
    });

    it("should call multiple handlers when an event is published", () => {
      const event: EventTypes = "UserDeleted";
      const handler1 = jest.fn();
      const handler2 = jest.fn();

      eventBus.subscribe(event, handler1);
      eventBus.subscribe(event, handler2);
      eventBus.publish(event, { id: 1 });

      expect(handler1).toHaveBeenCalledWith({ id: 1 });
      expect(handler2).toHaveBeenCalledWith({ id: 1 });
    });
    it("should not be able to subscribe to the same event twice", () => {
      const event: EventTypes = "UserUpdated";
      const handler = jest.fn();

      eventBus.subscribe(event, handler);
      eventBus.subscribe(event, handler);
      eventBus.publish(event, { id: 1, name: "John Doe" });

      expect(handler).toHaveBeenCalledTimes(1);
    });
  });

  describe("publish", () => {
    it("should not call the handler if not subscribed to the event", () => {
      const event: EventTypes = "UserCreated";
      const handler = jest.fn();

      eventBus.publish(event, { id: 1, name: "John Doe" });

      expect(handler).not.toHaveBeenCalled();
    });
  });

  describe("unsubscribe", () => {
    it("should unsubscribe a handler from an event", () => {
      const event: EventTypes = "UserCreated";
      const handler = jest.fn();

      eventBus.subscribe(event, handler);
      eventBus.unsubscribe(event, handler);
      eventBus.publish(event, { id: 1, name: "John Doe" });

      expect(handler).not.toHaveBeenCalled();
    });

    it("should not throw an error when unsubscribing a non-existing handler", () => {
      const event: EventTypes = "UserCreated";
      const handler = jest.fn();

      eventBus.unsubscribe(event, handler);

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
      const event: EventTypes = "UserCreated";
      const handler = jest.fn();
      const subscriberClass = "UserRegister";

      jest.spyOn(console, "log").mockImplementation(() => {});

      eventBus.subscribe(event, handler, subscriberClass);
      eventBus.publish(event, { id: 1, name: "John Doe" });

      expect(console.log).toHaveBeenCalledWith("📢 Publishing event: ", event);
      expect(console.log).toHaveBeenCalledWith(
        "🏭 Subscriber class: ",
        subscriberClass,
        "🔧 method:",
        "mockConstructor"
      );
    });
  });
});
