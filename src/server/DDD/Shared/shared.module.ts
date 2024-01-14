import { PrismaService } from "./PrismaService/PrismaService";
import { EventBus } from "./EventBus/EventBus";

export const eventBusSingleton = new EventBus();
export const prismaSingleton = new PrismaService();
