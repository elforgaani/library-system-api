import { Request, Response, NextFunction } from "express";

export const errorHandlerMiddleware = async (API: any) => {
  return (req: Request, res: Response, next: NextFunction) => {
    API(req, res, next).catch((error: Error) => next(error));
  };
};
