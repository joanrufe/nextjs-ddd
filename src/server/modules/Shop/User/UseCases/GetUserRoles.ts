import { UserService } from "../Services/UserService";

export class GetUserRole {
  constructor(protected readonly userService = new UserService()) {}

  async byEmail({ email }: { email: string }) {
    const user = await this.userService.findOne(email);
    if (!user) {
      return null;
    }

    const { role } = user.toPrimitives();

    return role;
  }
}
