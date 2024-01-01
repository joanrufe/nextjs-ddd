import { User } from "../Entities/User";

// Include only fields, no methods or aggregated entities
export type UserModel = Omit<User, "notifications">;
