import { Body, Controller, Get, Post, Query, UploadedFile, UseInterceptors } from "@nestjs/common";
import { FileInterceptor } from "@nestjs/platform-express";
import { FilesService } from "./files.service";

@Controller("files")
export class FilesController {
  constructor(private readonly filesService: FilesService) {}

  @Get()
  async list(
    @Query("provider") provider: "google-drive" | "onedrive" | "ftp" | "sftp" | "ftps",
    @Query("token") token: string,
    @Query("path") path?: string,
  ) {
    return this.filesService.list(provider, token, path);
  }

  @Post("folder")
  async createFolder(
    @Query("provider") provider: "google-drive" | "onedrive" | "ftp" | "sftp" | "ftps",
    @Query("token") token: string,
    @Body() body: { name: string; parentId?: string },
  ) {
    return this.filesService.createFolder(provider, token, body.name, body.parentId);
  }

  @Post("upload")
  @UseInterceptors(FileInterceptor("file"))
  async upload(
    @Query("provider") provider: "google-drive" | "onedrive" | "ftp" | "sftp" | "ftps",
    @Query("token") token: string,
    @UploadedFile() file: Express.Multer.File,
    @Body() body: { parentId?: string },
  ) {
    return this.filesService.upload(provider, token, file, body.parentId);
  }
}
