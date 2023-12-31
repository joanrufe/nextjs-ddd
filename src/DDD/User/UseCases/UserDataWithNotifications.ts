import { UserService } from "../Services/UserService";

export class UserDataWithNotifications {
  constructor(private readonly userService: UserService = new UserService()) {
    this.userService = userService;
  }

  async getUserWithNotifications(id: string) {
    const user = await this.userService.getUserWithNotifications(id);
    return user;
  }
}
