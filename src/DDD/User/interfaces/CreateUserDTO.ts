import { UserModel } from "./UserModel";

// Omit id and notifications fields and all methods
export type CreateUserDTO = Omit<UserModel, "id">;
