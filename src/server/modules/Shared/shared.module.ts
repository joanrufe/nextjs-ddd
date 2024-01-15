import { container } from "..";
import { TYPES } from "../dep-definitions";
import { EventBus } from "./EventBus/EventBus";
import { PrismaService } from "./PrismaService/PrismaService";
import { Roles } from "./User/Attributes/roles";

// Bind shared dependencies
container.bind<EventBus>(TYPES.EventBus).to(EventBus).inSingletonScope();
container
  .bind<PrismaService>(TYPES.PrismaService)
  .to(PrismaService)
  .inSingletonScope();

export { EventBus };
export { PrismaService };

export { Roles };
