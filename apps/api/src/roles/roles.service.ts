import { Injectable } from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";

@Injectable()
export class RolesService {
  constructor(private readonly prisma: PrismaService) {}

  async seedRoles() {
    const defaultRoles = [
      {
        name: "Super Admin",
        permissions: { read: true, write: true, upload: true, delete: true, share: true, manage_permissions: true, manage_provider: true },
      },
      {
        name: "Admin",
        permissions: { read: true, write: true, upload: true, delete: true, share: true, manage_permissions: true, manage_provider: true },
      },
      {
        name: "Editor",
        permissions: { read: true, write: true, upload: true, delete: true, share: true, manage_permissions: false, manage_provider: false },
      },
      {
        name: "Viewer",
        permissions: { read: true, write: false, upload: false, delete: false, share: false, manage_permissions: false, manage_provider: false },
      },
    ];

    const created = [] as any[];
    for (const role of defaultRoles) {
      const item = await this.prisma.role.upsert({
        where: { name: role.name },
        update: { permissions: role.permissions },
        create: { name: role.name, permissions: role.permissions },
      });
      created.push(item);
    }

    return created;
  }

  async getRoles() {
    return this.prisma.role.findMany();
  }
}
