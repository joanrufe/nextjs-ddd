import { UserService } from "../Services/UserService";

export class GetMyProfile {
  constructor(private readonly userService: UserService = new UserService()) {}

  async byEmail({ email }: { email: string }) {
    const user = await this.userService.findOne(email);
    if (!user) {
      return null;
    }

    // remove emailVerified to avoid Date serialization error
    return user.toPrimitives();
  }
}
