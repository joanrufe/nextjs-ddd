import { UserService } from "../Services/UserService";

export class GetUserRole {
  constructor(private readonly userService: UserService = new UserService()) {}

  async byEmail({ email }: { email: string }) {
    const user = await this.userService.findOne(email);
    if (!user) {
      return null;
    }

    const { role } = user.toPrimitives();

    return role;
  }
}
