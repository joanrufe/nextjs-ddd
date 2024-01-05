import { UserService } from "../Services/UserService";
import { GetUserProfileDTO } from "../interfaces/GetUserProfileDTO";

export class GetUserProfile {
  constructor(private readonly userService: UserService = new UserService()) {}

  async byEmail({ email }: GetUserProfileDTO) {
    const user = await this.userService.findOne(email);
    if (!user) {
      throw new Error("User not found");
    }

    const { emailVerified: _, ...userData } = user.toPrimitives();
    // Serialize emailVerified to JSON to avoid error
    return { ...userData };
  }
}
