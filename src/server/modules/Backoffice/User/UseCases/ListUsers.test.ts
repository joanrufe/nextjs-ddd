import { ListUsers } from "./ListUsers";
import { AdminUserService } from "../Services/AdminUserService";
import { createUser } from "../Factories/UserFactory";

describe("ListUsers", () => {
  let listUsers: ListUsers;
  let userService: AdminUserService;

  beforeEach(() => {
    userService = new AdminUserService();
    listUsers = new ListUsers(userService);
  });

  it("should return a list of users", async () => {
    const userOne = createUser();
    const userTwo = createUser();
    const userThree = createUser();

    jest
      .spyOn(userService, "findMany")
      .mockResolvedValue([userOne, userTwo, userThree]);

    const result = await listUsers.list();

    expect(result).toEqual([userOne, userTwo, userThree]);
  });
});
