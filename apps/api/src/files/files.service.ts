import { Injectable } from "@nestjs/common";
import { getProvider } from "./provider-registry";

@Injectable()
export class FilesService {
  list(providerName: "google-drive" | "onedrive" | "ftp" | "sftp" | "ftps", token: string, path?: string) {
    const provider = getProvider(providerName, token, {});
    return provider.list(path);
  }

  createFolder(providerName: "google-drive" | "onedrive" | "ftp" | "sftp" | "ftps", token: string, name: string, parentId?: string) {
    const provider = getProvider(providerName, token, {});
    return provider.createFolder(name, parentId);
  }

  upload(providerName: "google-drive" | "onedrive" | "ftp" | "sftp" | "ftps", token: string, file: Express.Multer.File, parentId?: string) {
    const provider = getProvider(providerName, token, {});
    return provider.upload({
      name: file.originalname,
      path: file.originalname,
      buffer: file.buffer,
    }, parentId);
  }
}
