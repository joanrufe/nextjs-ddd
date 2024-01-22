import { AdminUserService } from "../Services/AdminUserService";

export class ListUsers {
  constructor(protected readonly adminUserService = new AdminUserService()) {}

  async list() {
    const users = await this.adminUserService.findMany();
    return users.map((user) => user.toPrimitives());
  }
}
