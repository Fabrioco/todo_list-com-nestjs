import { JwtService } from "@nestjs/jwt";
import { Injectable, CanActivate, ExecutionContext, UnauthorizedException } from "@nestjs/common";
import { Request } from "express";

@Injectable()
export class JwtAuthGuard implements CanActivate {
  constructor(private jwtService: JwtService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const token = this.extractTokenFromHeader(request);
    if (!token) {
      throw new UnauthorizedException("Without token");
    }

    try {
      const payload = await this.jwtService.verifyAsync(token);
      request["user"] = payload;
    } catch (error) {
      throw new UnauthorizedException("Invalid token");
    }
    return true;
  }

  private extractTokenFromHeader(request: Request): string | undefined {
    const [type, token] = request.headers.authorization?.split(" ") ?? [];
    return type === "Bearer" ? token : undefined;
  }
}
