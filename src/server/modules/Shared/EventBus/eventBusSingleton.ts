import { EventBus } from "./EventBus";

const EventBusSingletonCreator = () => {
  return new EventBus();
};

export const eventBusSingleton: EventBus =
  //@ts-ignore
  globalThis.eventBusSingleton ?? EventBusSingletonCreator();

if (process.env.NODE_ENV !== "production")
  //@ts-ignore
  globalThis.eventBusSingleton = eventBusSingleton;
