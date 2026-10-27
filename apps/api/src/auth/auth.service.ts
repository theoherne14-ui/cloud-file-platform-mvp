import { Injectable } from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";

@Injectable()
export class AuthService {
  constructor(private readonly prisma: PrismaService) {}

  private async ensureRole(name: string, permissions: Record<string, boolean>) {
    return this.prisma.role.upsert({
      where: { name },
      update: { permissions },
      create: { name, permissions },
    });
  }

  private async createDefaultUserHome(userId: string, userName: string) {
    const workspaceName = `${userName || "User"} Home`;
    const workspace = await this.prisma.tenant.create({
      data: { name: workspaceName },
    });

    const adminRole = await this.ensureRole("Admin", {
      read: true,
      write: true,
      upload: true,
      delete: true,
      share: true,
      manage_permissions: true,
      manage_provider: true,
    });

    await this.prisma.member.upsert({
      where: {
        userId_tenantId: {
          userId,
          tenantId: workspace.id,
        },
      },
      update: { roleId: adminRole.id },
      create: {
        userId,
        tenantId: workspace.id,
        roleId: adminRole.id,
      },
    });

    const homeRoot = await this.prisma.folder.create({
      data: {
        name: userName || "Home",
        tenantId: workspace.id,
        parentId: null,
      },
    });

    const defaultFolders = [
      "Desktop",
      "Programs",
      "Downloads",
      "Documents",
      "Pictures",
      "Audio",
      "Videos",
    ];

    for (const folderName of defaultFolders) {
      await this.prisma.folder.create({
        data: {
          name: folderName,
          tenantId: workspace.id,
          parentId: homeRoot.id,
        },
      });
    }

    return workspace;
  }

  private async ensureSuperAdministrator() {
    const superAdminRole = await this.ensureRole("Super Admin", {
      read: true,
      write: true,
      upload: true,
      delete: true,
      share: true,
      manage_permissions: true,
      manage_provider: true,
    });

    const adminUser = await this.prisma.user.upsert({
      where: { email: "superadmin@local.local" },
      update: {},
      create: {
        email: "superadmin@local.local",
        name: "Super Administrator",
      },
    });

    const systemTenant = await this.prisma.tenant.findFirst({
      where: { name: "System Administration" },
    });

    const targetTenant =
      systemTenant ||
      (await this.prisma.tenant.create({
        data: { name: "System Administration" },
      }));

    await this.prisma.member.upsert({
      where: {
        userId_tenantId: {
          userId: adminUser.id,
          tenantId: targetTenant.id,
        },
      },
      update: { roleId: superAdminRole.id },
      create: {
        userId: adminUser.id,
        tenantId: targetTenant.id,
        roleId: superAdminRole.id,
      },
    });

    return adminUser;
  }

  async register(email: string, name?: string) {
    const existing = await this.prisma.user.findUnique({ where: { email } });
    if (existing) {
      return existing;
    }

    const user = await this.prisma.user.create({
      data: {
        email,
        name: name || "New User",
      },
    });

    await this.ensureSuperAdministrator();
    await this.createDefaultUserHome(user.id, user.name || user.email);

    return user;
  }

  async login(email: string) {
    const user = await this.prisma.user.findUnique({ where: { email } });
    if (!user) throw new Error("User not found");

    await this.ensureSuperAdministrator();

    return {
      user,
      accessToken: "demo-access-token",
      refreshToken: "demo-refresh-token",
    };
  }
}
