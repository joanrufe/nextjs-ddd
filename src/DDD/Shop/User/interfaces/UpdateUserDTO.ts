import { UserModel } from "./UserModel";

export type UpdateUserDTO = Partial<Omit<UserModel, "id">>;
