import { Roles } from "./Shared/User/Attributes/roles";
import { UnauthorizedError } from "./Shared/Exceptions/UnauthorizedError";

// This should be the only file that exports anything from the DDD folder
// When possible, export only the use cases and interface that are intended
// to be public, not the services or any other internal implementation detail

export { Roles };

export { UnauthorizedError };

// @TODO Things that would need to be fixed/refactored:
// - Some of the use cases doesn't need to be exported, but they are because
//   they need to be instantiated with the event bus, which is a singleton

export * from "./Shared/shared.module";
export * from "./Shop/shop.module";
export * from "./Retention/retention.module";
