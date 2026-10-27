export function ProviderConnect() {
  const connectGoogle = () => {
    window.location.href = "http://localhost:3000/providers/google/start";
  };

  const connectOneDrive = () => {
    window.location.href = "http://localhost:3000/providers/onedrive/start";
  };

  return (
    <div className="bg-white rounded shadow p-4">
      <h2 className="text-xl font-semibold mb-3">Connect Providers</h2>
      <div className="flex gap-3">
        <button onClick={connectGoogle} className="bg-blue-600 text-white px-4 py-2 rounded">Connect Google Drive</button>
        <button onClick={connectOneDrive} className="bg-indigo-600 text-white px-4 py-2 rounded">Connect OneDrive</button>
      </div>
    </div>
  );
}
