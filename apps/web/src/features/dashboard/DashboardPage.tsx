import { WorkspaceSelector } from "../workspaces/WorkspaceSelector";
import { ProviderConnect } from "../providers/ProviderConnect";
import { FileBrowser } from "../files/FileBrowser";
import { RoleAssignmentPanel } from "../workspaces/RoleAssignmentPanel";
import { FolderTree } from "../folders/FolderTree";
import { FolderPermissionPanel } from "../folders/FolderPermissionPanel";
import { SettingsPage } from "../settings/SettingsPage";
import { ActivityFeed } from "../activity/ActivityFeed";

export function DashboardPage() {
  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">Dashboard</h1>
      <div className="space-y-6">
        <WorkspaceSelector />
        <ProviderConnect />
        <RoleAssignmentPanel />
        <FolderTree />
        <FolderPermissionPanel />
        <FileBrowser />
        <SettingsPage />
        <ActivityFeed />
      </div>
    </div>
  );
}
