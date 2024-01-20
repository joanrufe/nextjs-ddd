import { AdminUserRegister } from "./UseCases/AdminUserRegister";
import { AdminUserService } from "./Services/AdminUserService";
import { ListUsers } from "./UseCases/ListUsers";
import { container } from "../..";
import { TYPES } from "../../dep-definitions";

container.bind<AdminUserService>(TYPES.AdminUserService).to(AdminUserService);
container
  .bind<AdminUserRegister>(TYPES.AdminUserRegister)
  .to(AdminUserRegister);
container.bind<ListUsers>(TYPES.ListUsers).to(ListUsers);

export { AdminUserRegister, ListUsers };
