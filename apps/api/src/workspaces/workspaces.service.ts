import { Injectable } from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";

@Injectable()
export class WorkspacesService {
  constructor(private readonly prisma: PrismaService) {}

  async createWorkspace(name: string) {
    return this.prisma.tenant.create({
      data: { name },
    });
  }

  async getWorkspaces() {
    return this.prisma.tenant.findMany();
  }

  async assignUserToWorkspace(userId: string, tenantId: string, roleId: string) {
    return this.prisma.member.upsert({
      where: {
        userId_tenantId: { userId, tenantId },
      },
      update: { roleId },
      create: { userId, tenantId, roleId },
    });
  }
}
