import { Injectable } from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";

@Injectable()
export class StorageService {
  constructor(private readonly prisma: PrismaService) {}

  readonly defaultOsFolders = [
    "Desktop",
    "Programs",
    "Downloads",
    "Documents",
    "Pictures",
    "Audio",
    "Videos",
  ];

  async createMount(data: {
    userId: string;
    tenantId: string;
    name: string;
    type: "LOCAL" | "FTP" | "SFTP" | "FTPS" | "GOOGLE_DRIVE" | "ONEDRIVE" | "DROPBOX" | "MEGA" | "APPLE_ICLOUD" | "OTHER";
    rootPath?: string;
    host?: string;
    port?: number;
    username?: string;
    password?: string;
  }) {
    const mount = await this.prisma.storageMount.create({
      data: {
        userId: data.userId,
        tenantId: data.tenantId,
        name: data.name,
        type: data.type as any,
        rootPath: data.rootPath || null,
        host: data.host || null,
        port: data.port || null,
        username: data.username || null,
        password: data.password || null,
      },
    });

    await this.createDefaultFolderStructure(mount.id, data.tenantId);

    return mount;
  }

  async listMounts(userId: string) {
    return this.prisma.storageMount.findMany({
      where: { userId },
      orderBy: { createdAt: "desc" },
    });
  }

  async createDefaultFolderStructure(mountId: string, tenantId: string) {
    const mount = await this.prisma.storageMount.findUnique({ where: { id: mountId } });

    if (!mount) {
      return [];
    }

    const rootFolder = await this.prisma.folder.create({
      data: {
        name: mount.name,
        tenantId,
        storageMountId: mount.id,
        parentId: null,
      },
    });

    const created = [] as any[];

    for (const folderName of this.defaultOsFolders) {
      const folder = await this.prisma.folder.create({
        data: {
          name: folderName,
          tenantId,
          parentId: rootFolder.id,
          storageMountId: mount.id,
        },
      });
      created.push(folder);
    }

    return created;
  }
}
