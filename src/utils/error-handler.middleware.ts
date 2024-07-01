import { Request, Response, NextFunction, RequestHandler } from "express";

export const errorHandleMiddleware= (API: any) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      await API(req, res, next);
    } catch (error) {
      next(error);
    }
  };
};
