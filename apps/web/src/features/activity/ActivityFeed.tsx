import { useQuery } from "@tanstack/react-query";
import { apiGet } from "../../lib/api";

export function ActivityFeed() {
  const { data, isLoading } = useQuery({
    queryKey: ["activity"],
    queryFn: () => apiGet<any[]>("/activity"),
  });

  if (isLoading) return <p>Loading activity...</p>;

  return (
    <div className="bg-white rounded shadow p-4">
      <h2 className="text-xl font-semibold mb-3">Activity</h2>
      <div className="space-y-3">
        {(data || []).map((item) => (
          <div key={item.id} className="border rounded p-3">
            <p className="font-medium">{item.action}</p>
            <p className="text-xs text-slate-500">{item.resourceType}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
