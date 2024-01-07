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
    it("should return the user profile editable fields", async () => {
      const email = "user@example.com";
      const user = createUser();

      jest.spyOn(userService, "findOne").mockResolvedValueOnce(user);

      const result = await getUserProfile.byEmail({ email });

      expect(userService.findOne).toHaveBeenCalledWith(email);
      const { emailVerified: _, role: _r, ...userData } = user.toPrimitives();
      expect(result).toEqual(userData);
    });

    it("should return null if user is not found", async () => {
      const email = "user@example.com";

      jest.spyOn(userService, "findOne").mockResolvedValueOnce(null);

      const result = await getUserProfile.byEmail({ email });

      expect(userService.findOne).toHaveBeenCalledWith(email);
      expect(result).toBeNull();
    });
  });
});
