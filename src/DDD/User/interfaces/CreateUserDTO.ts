import { User } from "@/DDD";

// Omit id and notifications
export type CreateEntityDTO = Omit<User, "id" | "notifications">;
