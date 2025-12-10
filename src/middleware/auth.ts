import { NextFunction, Request, Response } from "express"
import jwt, { JwtPayload } from "jsonwebtoken";
import { config } from "../config";

export const auth = (roles: string[]) => {
    return (req: Request, res: Response, next: NextFunction) => {
        const token = req.headers.authorization || "" ;
        const decodedToken = jwt.verify(token, config.JWT_SECRET_KEY as string) as JwtPayload;
        console.log({decodedToken: decodedToken});

        if(roles.length) {
            if(!roles.includes(decodedToken.role)) {
                return res.status(403).send({message: "You are not authorized"})
            }
        }
        next();
    }
}