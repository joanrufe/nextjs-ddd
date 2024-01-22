import { GetUserRole } from "./GetUserRoles";
import { UserService } from "../Services/UserService";
import { createUser } from "../Factories/UserFactory";

describe("GetUserRoles", () => {
  let getUserRoles: GetUserRole;
  let userService: UserService;

  beforeEach(() => {
    userService = new UserService();
    getUserRoles = new GetUserRole(userService);
  });

  describe("getUserRoles", () => {
    it("should return the user role", async () => {
      const email = "user@example.com";
      const user = createUser();

      jest.spyOn(userService, "findOne").mockResolvedValueOnce(user);

      const result = await getUserRoles.byEmail({ email });

      expect(userService.findOne).toHaveBeenCalledWith(email);
      const { role } = user.toPrimitives();
      expect(result).toEqual(role);
    });

    it("should return null if user is not found", async () => {
      const email = "user@example.com";

      jest.spyOn(userService, "findOne").mockResolvedValueOnce(null);

      const result = await getUserRoles.byEmail({ email });

      expect(userService.findOne).toHaveBeenCalledWith(email);
      expect(result).toBeNull();
    });
  });
});
