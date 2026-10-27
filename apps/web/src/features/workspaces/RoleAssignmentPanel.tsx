export function RoleAssignmentPanel() {
  const roles = [
    { id: "role_1", name: "Viewer" },
    { id: "role_2", name: "Editor" },
    { id: "role_3", name: "Admin" },
  ];

  return (
    <div className="bg-white rounded shadow p-4">
      <h2 className="text-xl font-semibold mb-3">Role Assignment</h2>
      <div className="space-y-3">
        {roles.map((role) => (
          <div key={role.id} className="border rounded p-3">
            <p className="font-medium">{role.name}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
