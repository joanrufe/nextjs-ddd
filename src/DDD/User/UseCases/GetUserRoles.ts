import { UserService } from "../Services/UserService";
import { GetUserProfileDTO } from "../interfaces/GetUserProfileDTO";

export class GetUserRole {
  constructor(private readonly userService: UserService = new UserService()) {}

  async byEmail({ email }: GetUserProfileDTO) {
    const user = await this.userService.findOne(email);
    if (!user) {
      return null;
    }

    const { role } = user.toPrimitives();

    return role;
  }
}
