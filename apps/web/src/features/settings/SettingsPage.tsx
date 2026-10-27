export function SettingsPage() {
  const provider = "ftp";

  return (
    <div className="bg-white rounded shadow p-4">
      <h2 className="text-xl font-semibold mb-3">Settings</h2>
      <div className="space-y-3">
        <div className="border rounded p-3">
          <p className="font-medium">Provider</p>
          <p className="text-sm text-slate-500">{provider}</p>
        </div>
        <button className="bg-blue-600 text-white px-4 py-2 rounded">Save Connection</button>
      </div>
    </div>
  );
}
