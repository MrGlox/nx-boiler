import * as express from "express";

//Types
import type { Request, Response, NextFunction } from "express";

/**
 * Skips body parsing for requests that include the specified basePath
 * followed by at least one additional segment (e.g. /basePath/login).
 * Useful for routes like BetterAuth that handle raw request bodies.
 * Matches paths like /basePath/* or /api/basePath/*, but not /basePath or /basePath/.
 */
export function createBodyParsingAuthMiddleware(basePath: string) {
  const regexPath = new RegExp(`/${basePath.replace(/^\/+|\/+$/g, "")}/.+`);

  return (req: Request, res: Response, next: NextFunction) => {
    if (regexPath.test(req.baseUrl)) {
      return next();
    }

    express.json()(req, res, (err) => {
      if (err) return next(err);
      express.urlencoded({ extended: true })(req, res, next);
    });
  };
}
