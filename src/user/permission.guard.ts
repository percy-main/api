import { CanActivate, ExecutionContext, Injectable } from "@nestjs/common";
import { Reflector } from "@nestjs/core";

import { staticAuthConfig } from "../auth/auth.config";
import { TSession } from "../auth/session.decorator";
import { PERMISSION } from "./permission.decorator";
import { UserService } from "./user.service";

@Injectable()
export class PermissionGuard implements CanActivate {
  constructor(
    private readonly userService: UserService,
    private readonly reflector: Reflector,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const permission = this.reflector.get(PERMISSION, context.getHandler());

    if (typeof permission !== "string") {
      throw new Error(`Invalid permission type: ${typeof permission}`);
    }

    const session = this.getSession(context);

    const permissions = await this.userService.getPermissions(
      session.getUserId(),
    );

    if (permissions.some(({ name }) => name === permission)) {
      return true;
    }

    return false;
  }

  private getSession(context: ExecutionContext): TSession {
    const { session } = context.switchToHttp().getRequest();

    if (!session) {
      if (staticAuthConfig.devMode) {
        return {
          getUserId: () => "test",
        } as TSession;
      }
      throw new Error("No user session found");
    }

    return session;
  }
}
