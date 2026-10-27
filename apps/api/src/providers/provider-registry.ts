import { FileProvider } from "./file-provider.interface";
import { GoogleDriveProvider } from "./google-drive.provider";
import { OneDriveProvider } from "./onedrive.provider";
import { FtpProvider } from "./ftp.provider";

export function getProvider(providerName: "google-drive" | "onedrive" | "ftp" | "sftp" | "ftps" | "api", accessToken?: string, config?: Record<string, any>): FileProvider {
  switch (providerName) {
    case "google-drive":
      return new GoogleDriveProvider(accessToken || "");
    case "onedrive":
      return new OneDriveProvider(accessToken || "");
    case "ftp":
    case "sftp":
    case "ftps":
      return new FtpProvider({
        host: config?.host || "localhost",
        port: Number(config?.port || 21),
        username: config?.username || "",
        password: config?.password || "",
        protocol: providerName as "ftp" | "sftp" | "ftps",
        path: config?.path || "/",
      });
    default:
      throw new Error(`Unsupported provider: ${providerName}`);
  }
}
