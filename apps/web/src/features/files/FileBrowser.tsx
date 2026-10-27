import { useQuery } from "@tanstack/react-query";
import { apiGet } from "../../lib/api";
import { FileItem } from "../../lib/types";

export function FileBrowser() {
  const provider = new URLSearchParams(window.location.search).get("provider") || "google-drive";
  const token = localStorage.getItem("auth_token") || "demo-token";

  const { data, isLoading } = useQuery({
    queryKey: ["files", provider, token],
    queryFn: () => apiGet<FileItem[]>(`/files?provider=${provider}&token=${token}&path=root`),
  });

  if (isLoading) return <p>Loading files...</p>;

  return (
    <div className="bg-white rounded shadow p-4">
      <h2 className="text-xl font-semibold mb-3">Files</h2>
      <div className="space-y-2">
        {(data || []).map((file) => (
          <div key={file.id} className="flex justify-between border rounded p-3">
            <div>
              <p className="font-medium">{file.name}</p>
              <p className="text-xs text-slate-500">{file.type}</p>
            </div>
            <button className="border rounded px-3 py-1 hover:bg-slate-100">Open</button>
          </div>
        ))}
      </div>
    </div>
  );
}
