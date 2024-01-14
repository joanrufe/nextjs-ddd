import { UserRegister } from "./UseCases/UserRegister";
import { GetMyNotifications } from "./UseCases/GetMyNotifications";
import { MyProfileUpdater } from "./UseCases/MyProfileUpdater";
import { GetMyProfile } from "./UseCases/GetMyProfile";
import { GetUserRole } from "./UseCases/GetUserRoles";
import { eventBusSingleton } from "@/server/DDD/";

const userRegister = new UserRegister(eventBusSingleton);
const myProfileUpdater = new MyProfileUpdater(eventBusSingleton);
const getMyNotifications = new GetMyNotifications();
const getMyProfile = new GetMyProfile();
const getUserRole = new GetUserRole();

export {
  userRegister,
  myProfileUpdater,
  getMyNotifications,
  getMyProfile,
  getUserRole,
};
