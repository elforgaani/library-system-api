import { NextFunction, Request, Response } from "express";

export const globalErrorMiddlewareHnadler = async (error: any, req: Request, res: Response, next: NextFunction) => {
    if (error) {
        return res.status(500).json({ success: false, message: "Internal Server Error." });
    }
}