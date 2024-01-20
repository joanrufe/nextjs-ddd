import { AdminUserService } from "../Services/AdminUserService";
import { inject, injectable } from "inversify";
import { TYPES } from "@/server/modules/dep-definitions";

@injectable()
export class ListUsers {
  constructor(
    @inject(TYPES.AdminUserService)
    protected readonly adminUserService: AdminUserService
  ) {}

  async list() {
    const users = await this.adminUserService.findMany();
    return users.map((user) => user.toPrimitives());
  }
}
