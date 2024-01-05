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
    it("should return the user profile with the given id", async () => {
      const userId = "1";
      const user = createUser();

      jest.spyOn(userService, "findOne").mockResolvedValueOnce(user);

      const result = await getUserProfile.getUserProfile({ id: userId });

      expect(userService.findOne).toHaveBeenCalledWith(userId);
      expect(result).toEqual(user.toPrimitives());
    });

    it("should throw an error if user is not found", async () => {
      const userId = "1";

      jest.spyOn(userService, "findOne").mockResolvedValueOnce(null);

      await expect(
        getUserProfile.getUserProfile({ id: userId })
      ).rejects.toThrow("User not found");

      expect(userService.findOne).toHaveBeenCalledWith(userId);
    });
  });
});
