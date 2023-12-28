import { EventTypes } from "./EventTypes";

export interface DomainEventSubscriber<T> {
  on(domainEvent: T): Promise<void>;

  subscribedTo(): EventTypes[];
}
