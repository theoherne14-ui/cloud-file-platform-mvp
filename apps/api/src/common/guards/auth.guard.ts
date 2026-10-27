import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from "@nestjs/common";

@Injectable()
export class AuthGuard implements CanActivate {
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const req = context.switchToHttp().getRequest();
    const header = req.headers.authorization;
    const token = header?.split("Bearer ")[1];

    if (!token) {
      throw new UnauthorizedException("Missing token");
    }

    req.user = { id: "demo-user", email: "demo@example.com" };
    return true;
  }
}
