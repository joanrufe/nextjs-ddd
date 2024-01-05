import { UserService } from "../Services/UserService";
import { GetUserProfileDTO } from "../interfaces/GetUserProfileDTO";

export class GetUserProfile {
  constructor(private readonly userService: UserService = new UserService()) {}

  async getUserProfile({ id }: GetUserProfileDTO) {
    const user = await this.userService.findOne(id);
    if (!user) {
      throw new Error("User not found");
    }
    return user.toPrimitives();
  }
}
