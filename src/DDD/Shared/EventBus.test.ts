import { EventBus } from "./EventBus";
import { EventTypes } from "./EventTypes";

describe("EventBus", () => {
  let eventBus: EventBus;

  beforeEach(() => {
    eventBus = new EventBus();
  });

  it("should subscribe to an event and call the handler when published", () => {
    const event = EventTypes.UserCreated;
    const handler = jest.fn();

    eventBus.subscribe(event, handler);
    eventBus.publish(event, { id: 1, name: "John Doe" });

    expect(handler).toHaveBeenCalledWith({ id: 1, name: "John Doe" });
  });

  it("should not call the handler if not subscribed to the event", () => {
    const event = EventTypes.UserCreated;
    const handler = jest.fn();

    eventBus.publish(event, { id: 1, name: "John Doe" });

    expect(handler).not.toHaveBeenCalled();
  });

  it("should call multiple handlers when an event is published", () => {
    const event = EventTypes.UserDeleted;
    const handler1 = jest.fn();
    const handler2 = jest.fn();

    eventBus.subscribe(event, handler1);
    eventBus.subscribe(event, handler2);
    eventBus.publish(event, { id: 1 });

    expect(handler1).toHaveBeenCalledWith({ id: 1 });
    expect(handler2).toHaveBeenCalledWith({ id: 1 });
  });
});
