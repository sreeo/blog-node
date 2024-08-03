/**
 * Middleware to verify user logged in and is an an admin.
 */

import { Request, Response, NextFunction } from 'express';

import HttpStatusCodes from '@src/common/HttpStatusCodes';

import EnvVars from '@src/common/EnvVars';


// **** Variables **** //

const USER_UNAUTHORIZED_ERR = 'Blog not authorized to perform this action';
const API_KEY_HEADER_KEY = 'apikey';

/**
 * See note at beginning of file.
 */
async function authMiddleware(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  // Get session data
  // Set session data to locals
  const authHeader = req.headers[API_KEY_HEADER_KEY];
  if (authHeader == EnvVars.ApiKey) {
    return next();
  // Return an unauth error if user is not an admin
  } else {
    return res
      .status(HttpStatusCodes.UNAUTHORIZED)
      .json({ error: USER_UNAUTHORIZED_ERR });
  }
}


// **** Export Default **** //

export default authMiddleware;
