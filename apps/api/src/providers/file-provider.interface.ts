export type FileItem = {
  id: string;
  name: string;
  path: string;
  type: "file" | "folder";
  mimeType?: string;
  size?: number;
  modifiedAt?: Date;
  parentId?: string;
};

export interface FileProvider {
  list(path?: string): Promise<FileItem[]>;
  upload(file: { name: string; path: string; buffer: Buffer }, parentId?: string): Promise<FileItem>;
  createFolder(name: string, parentId?: string): Promise<FileItem>;
  delete(fileId: string): Promise<void>;
  rename(fileId: string, newName: string): Promise<FileItem>;
  share(fileId: string, options?: Record<string, any>): Promise<{ link: string }>;
  syncStatus(): Promise<{ connected: boolean; lastSyncedAt?: Date }>;
}
