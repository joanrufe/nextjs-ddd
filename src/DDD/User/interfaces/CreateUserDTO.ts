import { User } from "../Entities/User";

// Omit id and notifications fields and all methods
export type CreateUserDTO = Omit<User, "id" | "notifications">;
