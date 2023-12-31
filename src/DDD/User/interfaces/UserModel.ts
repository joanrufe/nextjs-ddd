import { User } from "../Entities/User";

export type UserModel = Omit<User, "id" | "notifications">;
