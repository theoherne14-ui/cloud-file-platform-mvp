import { useQuery } from "@tanstack/react-query";
import { apiGet } from "../../lib/api";
import { Workspace } from "../../lib/types";

export function WorkspaceSelector() {
  const { data, isLoading } = useQuery({
    queryKey: ["workspaces"],
    queryFn: () => apiGet<Workspace[]>("/workspaces"),
  });

  if (isLoading) return <p>Loading workspaces...</p>;

  return (
    <div className="bg-white rounded shadow p-4">
      <h2 className="text-xl font-semibold mb-3">Workspaces</h2>
      <div className="flex gap-3">
        {(data || []).map((workspace) => (
          <button key={workspace.id} className="border rounded px-4 py-2 hover:bg-slate-100">
            {workspace.name}
          </button>
        ))}
      </div>
    </div>
  );
}
