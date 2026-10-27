export type User = {
  id: string;
  email: string;
  name?: string;
};

export type Workspace = {
  id: string;
  name: string;
};

export type FileItem = {
  id: string;
  name: string;
  path: string;
  type: "file" | "folder";
  mimeType?: string;
  size?: number;
};
