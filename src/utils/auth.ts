import { NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/pages/api/auth/[...nextauth]";

/**
 * Use this function to get user session from API routes.
 * This function have been build due error thrown in getServerSession
 * when user is not authenticated.
 * @param req
 * @returns
 */
export const safelyGetServerSession = async (
  req: NextApiRequest,
  res: NextApiResponse
) => {
  try {
    const session = await getServerSession(req, res, authOptions);
    return session;
  } catch (error) {
    console.error(error);
  }
  return null;
};
