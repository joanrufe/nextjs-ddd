import { inject, injectable } from "inversify";
import { UserService } from "../Services/UserService";
import { TYPES } from "@/server/modules/dep-definitions";

@injectable()
export class GetMyProfile {
  constructor(
    @inject(TYPES.UserService) protected readonly userService: UserService
  ) {}

  async byEmail({ email }: { email: string }) {
    const user = await this.userService.findOne(email);
    if (!user) {
      return null;
    }

    // remove emailVerified to avoid Date serialization error
    return user.toPrimitives();
  }
}
