import { Injectable, NestMiddleware } from "@nestjs/common";
import { NextFunction, Request, Response } from "express";
import { middleware } from "supertokens-node/framework/express";

@Injectable()
export class AuthMiddleware implements NestMiddleware<Request, Response> {
  use(req: Request, res: Response, next: NextFunction) {
    console.log("Auth middleware");

    return middleware()(req, res, next);
  }
}
