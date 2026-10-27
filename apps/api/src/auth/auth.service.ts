import { Injectable } from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";

@Injectable()
export class AuthService {
  constructor(private readonly prisma: PrismaService) {}

  async register(email: string, name?: string) {
    const existing = await this.prisma.user.findUnique({ where: { email } });
    if (existing) return existing;

    return this.prisma.user.create({
      data: {
        email,
        name: name || "New User",
      },
    });
  }

  async login(email: string) {
    const user = await this.prisma.user.findUnique({ where: { email } });
    if (!user) throw new Error("User not found");

    return {
      user,
      accessToken: "demo-access-token",
      refreshToken: "demo-refresh-token",
    };
  }
}
