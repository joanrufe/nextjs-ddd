import { OmitMethods } from "@/server/modules/Shared/Types/utility-types";
import { UserNotification } from "../Entities/UserNotification";

export type UserNotificationModel = OmitMethods<UserNotification>;
