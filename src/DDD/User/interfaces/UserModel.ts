import { OmitMethods } from "@/DDD/Shared/Types/utility-types";
import { User } from "../Entities/User";

type UserNoMethods = OmitMethods<User>;

// Include only fields, no methods or aggregated entities
export type UserModel = Omit<UserNoMethods, "notifications">;
