import { FileProvider, FileItem } from "./file-provider.interface";

export class FtpProvider implements FileProvider {
  constructor(private readonly config: { host: string; port: number; username: string; password: string; protocol: "ftp" | "sftp" | "ftps"; path?: string; }) {}

  async list(path?: string): Promise<FileItem[]> {
    return [{ id: "ftp-demo", name: "FTP Root", path: path || this.config.path || "/", type: "folder" }];
  }

  async upload(file: { name: string; path: string; buffer: Buffer }, parentId?: string): Promise<FileItem> {
    return { id: file.name, name: file.name, path: parentId || this.config.path || "/", type: "file" };
  }

  async createFolder(name: string, parentId?: string): Promise<FileItem> {
    return { id: name, name, path: parentId || this.config.path || "/", type: "folder" };
  }

  async delete(fileId: string): Promise<void> {}
  async rename(fileId: string, newName: string): Promise<FileItem> {
    return { id: fileId, name: newName, path: this.config.path || "/", type: "file" };
  }
  async share(fileId: string, options?: Record<string, any>): Promise<{ link: string }> {
    return { link: `ftp://${this.config.host}/${fileId}` };
  }
  async syncStatus(): Promise<{ connected: boolean; lastSyncedAt?: Date }> {
    return { connected: true, lastSyncedAt: new Date() };
  }
}
