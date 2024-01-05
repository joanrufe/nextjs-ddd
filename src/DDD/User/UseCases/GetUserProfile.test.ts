import { GetUserProfile } from "./GetUserProfile";
import { UserService } from "../Services/UserService";
import { createUser } from "../Factories/UserFactory";

describe("GetUserProfile", () => {
  let getUserProfile: GetUserProfile;
  let userService: UserService;

  beforeEach(() => {
    userService = new UserService();
    getUserProfile = new GetUserProfile(userService);
  });

  describe("getUserProfile", () => {
    it("should return the user profile with the given id but omit emailVerified", async () => {
      const email = "user@example.com";
      const user = createUser();

      jest.spyOn(userService, "findOne").mockResolvedValueOnce(user);

      const result = await getUserProfile.byEmail({ email });

      expect(userService.findOne).toHaveBeenCalledWith(email);
      const { emailVerified: _, ...userData } = user.toPrimitives();
      expect(result).toEqual(userData);
    });

    it("should throw an error if user is not found", async () => {
      const email = "user@example.com";

      jest.spyOn(userService, "findOne").mockResolvedValueOnce(null);

      await expect(getUserProfile.byEmail({ email })).rejects.toThrow(
        "User not found"
      );

      expect(userService.findOne).toHaveBeenCalledWith(email);
    });
  });
});
