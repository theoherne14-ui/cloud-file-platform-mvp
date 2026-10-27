export function FolderTree() {
  const folders = [
    { id: "root", name: "Workspace Root", children: [
      { id: "marketing", name: "Marketing" },
      { id: "assets", name: "Assets" },
      { id: "shared", name: "Shared" },
    ] },
  ];

  return (
    <div className="bg-white rounded shadow p-4">
      <h2 className="text-xl font-semibold mb-3">Folder Tree</h2>
      {folders.map((folder) => (
        <div key={folder.id}>
          <p className="font-medium">{folder.name}</p>
          <div className="ml-4 space-y-1 mt-2">
            {folder.children.map((child) => (
              <div key={child.id} className="text-sm text-slate-600">{child.name}</div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
