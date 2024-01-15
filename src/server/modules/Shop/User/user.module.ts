import { UserRegister } from "./UseCases/UserRegister";
import { GetMyNotifications } from "./UseCases/GetMyNotifications";
import { MyProfileUpdater } from "./UseCases/MyProfileUpdater";
import { GetMyProfile } from "./UseCases/GetMyProfile";
import { GetUserRole } from "./UseCases/GetUserRoles";
import { EventBus, PrismaService } from "@/server/modules/Shared/shared.module";
import { UserService } from "./Services/UserService";
import { UserNotificationsService } from "./Services/UserNotificationsService";
import { container } from "../..";
import { TYPES } from "../../dep-definitions";

container.bind<UserService>(TYPES.UserService).to(UserService);
container
  .bind<UserNotificationsService>(TYPES.UserNotificationsService)
  .to(UserNotificationsService);
container
  .bind<GetMyNotifications>(TYPES.GetMyNotifications)
  .to(GetMyNotifications);
container.bind<MyProfileUpdater>(TYPES.MyProfileUpdater).to(MyProfileUpdater);
container.bind<GetMyProfile>(TYPES.GetMyProfile).to(GetMyProfile);

export {
  UserRegister,
  MyProfileUpdater,
  GetMyNotifications,
  GetMyProfile,
  GetUserRole,
};
