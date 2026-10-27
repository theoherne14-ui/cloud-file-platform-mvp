import { Injectable } from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";

@Injectable()
export class ProvidersService {
  constructor(private readonly prisma: PrismaService) {}

  async connectProvider(userId: string, provider: string, accessToken: string) {
    return this.prisma.providerAccount.upsert({
      where: {
        userId_provider: {
          userId,
          provider,
        },
      },
      update: { accessToken },
      create: { userId, provider, providerUserId: `demo-${provider}`, accessToken },
    });
  }

  async getProvidersForUser(userId: string) {
    return this.prisma.providerAccount.findMany({ where: { userId } });
  }
}
