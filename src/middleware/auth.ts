import { NextFunction, Request, Response } from "express"
import jwt, { JwtPayload } from "jsonwebtoken";
import { config } from "../config";

export const auth = (roles: string[]) => {
    return (req: Request, res: Response, next: NextFunction) => {
        const bearerToken = req.headers.authorization || "";
        let token = ""
        if(bearerToken !== "") {
            token = bearerToken.split(" ")[1] as string;
        } else {
            return res.status(403).send({success: false, message: "You are not authorized"})
        }
        const decodedToken = jwt.verify(token, config.JWT_SECRET_KEY as string) as JwtPayload;

        if(roles.length) {
            if(!roles.includes(decodedToken.role)) {
                return res.status(403).send({success: false, message: "You are not authorized"})
            }
        }

        req.userInfo = decodedToken;
        next();
    }
}