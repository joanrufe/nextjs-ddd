import { NextApiRequest } from "next";
import { getServerSession } from "next-auth";

/**
 * Use this function to get user session from API routes.
 * This function have been build due error thrown in getServerSession
 * when user is not authenticated.
 * @param req
 * @returns
 */
export const safelyGetServerSession = async (req: NextApiRequest) => {
  try {
    const session = await getServerSession(req);
    return session;
  } catch (error) {}
  return null;
};
