import { GetMyProfile } from "./GetMyProfile";
import { UserService } from "../Services/UserService";
import { createUser } from "../Factories/UserFactory";

describe("GetMyProfile", () => {
  let getUserProfile: GetMyProfile;
  let userService: UserService;

  beforeEach(() => {
    userService = new UserService();
    getUserProfile = new GetMyProfile(userService);
  });

  describe("byEmail", () => {
    it("should return the user profile editable fields", async () => {
      const email = "user@example.com";
      const user = createUser();

      jest.spyOn(userService, "findOne").mockResolvedValueOnce(user);

      const result = await getUserProfile.byEmail({ email });

      expect(userService.findOne).toHaveBeenCalledWith(email);

      expect(result).toEqual(user.toPrimitives());
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
