import { UserService } from "../Services/UserService";
import { UserModel } from "../interfaces/UserModel";

export class UserProfilerUpdater {
  constructor(private readonly userService: UserService) {}

  async updateFields(id: string, fields: Omit<UserModel, "id">) {
    const user = await this.userService.getUser(id);
  }
}
