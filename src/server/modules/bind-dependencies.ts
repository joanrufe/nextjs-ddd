import "reflect-metadata";
import { Container } from "inversify";

const container = new Container({
  autoBindInjectable: true,
  defaultScope: "Singleton",
  skipBaseClassChecks: true,
});

// Do not import container from this file, instead import from @/server/modules/index.ts
export { container };
