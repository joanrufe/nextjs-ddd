import { UserModel } from "./UserModel";

type UpdatedFields = Partial<Omit<UserModel, "id">>;

export interface UpdateUserDTO {
  email: string;
  fields: UpdatedFields;
  updatedByEmail: string;
}
