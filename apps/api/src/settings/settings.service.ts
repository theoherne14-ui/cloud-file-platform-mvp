import { Injectable } from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";

@Injectable()
export class SettingsService {
  constructor(private readonly prisma: PrismaService) {}

  async getSettingsForUser(userId: string) {
    return this.prisma.settings.findMany({ where: { userId } });
  }

  async saveProviderSetting(userId: string, tenantId: string, providerName: string, connectionType: string, config: Record<string, any>) {
    return this.prisma.settings.create({
      data: {
        userId,
        tenantId,
        key: providerName,
        value: JSON.stringify({ connectionType, config }),
      },
    });
  }
}
