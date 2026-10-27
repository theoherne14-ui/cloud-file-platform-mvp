import { Body, Controller, Get, Post, Query, UseGuards } from "@nestjs/common";
import { StorageService } from "./storage.service";
import { AuthGuard } from "../common/guards/auth.guard";
import { CurrentUser } from "../common/decorators/current-user.decorator";

@Controller("storage")
@UseGuards(AuthGuard)
export class StorageController {
  constructor(private readonly storageService: StorageService) {}

  @Get("mounts")
  async listMounts(@CurrentUser() user: any) {
    return this.storageService.listMounts(user.id);
  }

  @Post("mounts")
  async createMount(
    @CurrentUser() user: any,
    @Body() body: {
      tenantId: string;
      name: string;
      type: "LOCAL" | "FTP" | "SFTP" | "FTPS" | "GOOGLE_DRIVE" | "ONEDRIVE" | "DROPBOX" | "MEGA" | "APPLE_ICLOUD" | "OTHER";
      rootPath?: string;
      host?: string;
      port?: number;
      username?: string;
      password?: string;
    },
  ) {
    return this.storageService.createMount({
      userId: user.id,
      tenantId: body.tenantId,
      name: body.name,
      type: body.type,
      rootPath: body.rootPath,
      host: body.host,
      port: body.port,
      username: body.username,
      password: body.password,
    });
  }

  @Get("folders")
  async getDefaultFolders(@Query("mountId") mountId: string, @Query("tenantId") tenantId: string) {
    return this.storageService.createDefaultFolderStructure(mountId, tenantId);
  }
}
