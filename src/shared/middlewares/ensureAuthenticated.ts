import auth from "config/auth";
import { NextFunction, Request, Response } from "express";
import { verify } from "jsonwebtoken";

interface ITokenPayload {
    sub: string;
    exp: number;
}

export default function ensureAuthenticated(request: Request, response: Response, next: NextFunction) {
    const authHeader = request.headers.authorization;

    if (!authHeader)
        throw new Error('Missing JWT token');

    const [, token] = authHeader.split(' ');

    try {
        const decoded = verify(token, auth.jwt.secret);

        const { sub } = decoded as ITokenPayload;

        request.user = {
            id: sub,
        }

        return next();
    } catch(error) {
        throw new Error('Invalid JWT token');
    }
}