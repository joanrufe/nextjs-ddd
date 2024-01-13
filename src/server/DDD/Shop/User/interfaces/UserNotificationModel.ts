import { OmitMethods } from "@/server/DDD/Shared/Types/utility-types";
import { UserNotification } from "../Entities/UserNotification";

export type UserNotificationModel = OmitMethods<UserNotification>;
