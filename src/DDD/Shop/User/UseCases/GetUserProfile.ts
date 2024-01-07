import { UserService } from "../Services/UserService";
import { GetUserProfileDTO } from "../interfaces/GetUserProfileDTO";

export class GetUserProfile {
  constructor(private readonly userService: UserService = new UserService()) {}

  async byEmail({ email }: GetUserProfileDTO) {
    const user = await this.userService.findOne(email);
    if (!user) {
      return null;
    }

    const { emailVerified: _, role: _r, ...userData } = user.toPrimitives();
    // remove emailVerified to avoid Date serialization error
    return { ...userData };
  }
}
