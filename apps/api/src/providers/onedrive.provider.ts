import { FileProvider, FileItem } from "./file-provider.interface";

export class OneDriveProvider implements FileProvider {
  constructor(private readonly accessToken: string) {}

  async list(path?: string): Promise<FileItem[]> {
    return [{ id: "demo-onedrive", name: "OneDriveDemo", path: path || "root", type: "folder" }];
  }

  async upload(file: { name: string; path: string; buffer: Buffer }, parentId?: string): Promise<FileItem> {
    return { id: file.name, name: file.name, path: parentId || "root", type: "file" };
  }

  async createFolder(name: string, parentId?: string): Promise<FileItem> {
    return { id: name, name, path: parentId || "root", type: "folder" };
  }

  async delete(fileId: string): Promise<void> {}
  async rename(fileId: string, newName: string): Promise<FileItem> {
    return { id: fileId, name: newName, path: "root", type: "file" };
  }
  async share(fileId: string, options?: Record<string, any>): Promise<{ link: string }> {
    return { link: `https://onedrive.live.com/?cid=${fileId}` };
  }
  async syncStatus(): Promise<{ connected: boolean; lastSyncedAt?: Date }> {
    return { connected: true, lastSyncedAt: new Date() };
  }
}
