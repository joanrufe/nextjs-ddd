const eventTypes = ["UserCreated", "UserUpdated", "UserDeleted"] as const;

export type EventTypes = (typeof eventTypes)[number];
