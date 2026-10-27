export function FolderPermissionPanel() {
  const rules = [
    { name: "Viewer", permission: "read" },
    { name: "Editor", permission: "read + write + upload + delete" },
    { name: "Manager", permission: "manage permissions" },
  ];

  return (
    <div className="bg-white rounded shadow p-4">
      <h2 className="text-xl font-semibold mb-3">Folder Permissions</h2>
      <div className="space-y-3">
        {rules.map((rule) => (
          <div key={rule.name} className="border rounded p-3">
            <p className="font-medium">{rule.name}</p>
            <p className="text-sm text-slate-500">{rule.permission}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
