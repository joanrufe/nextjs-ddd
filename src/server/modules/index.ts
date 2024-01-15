/**
 * First thing is to import the container
 * so shared dependencies can be injected
 * into other modules.
 */
// eslint-disable-next-line import/no-internal-modules
import { container } from "./bind-dependencies";

// Import all modules below so dependencies can be injected
// it is ok just to import it here
export * from "./Shared/shared.module";
export * from "./Retention/retention.module";
export * from "./Shop/shop.module";

// Export the container with all dependencies injected
// use only this file to import the container
export { container };
