import { Dashboard } from "~/app/_components/dashboard/Dashboard";
import { Sidebar } from "~/app/_components/dashboard/Sidebar";

export default function Home() {
  return (
    <div className="flex h-screen overflow-hidden">
      <Sidebar />
      <main className="flex-1 overflow-y-auto">
        <div className="px-6 py-6">
          <Dashboard />
        </div>
      </main>
    </div>
  );
}
