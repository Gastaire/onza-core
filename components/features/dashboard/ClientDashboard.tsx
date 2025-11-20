import { File, Bell, PlusCircle } from "lucide-react";

export function ClientDashboard() {
  return (
    <div className="space-y-12">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-3xl font-bold">Client Dashboard</h2>
          <p className="text-primary/80">
            Welcome back, valued client. Here's an overview of your projects.
          </p>
        </div>
        <button className="flex items-center gap-2 bg-primary text-secondary px-6 py-3 rounded-lg hover:bg-primary/90 transition-colors">
          <PlusCircle size={20} />
          <span>Request Service</span>
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="bg-white p-8 rounded-lg shadow-lg">
          <h3 className="text-2xl font-semibold mb-4 flex items-center gap-2">
            <Bell size={24} />
            Notifications
          </h3>
          <p className="text-primary/80">No new notifications.</p>
        </div>
        <div className="bg-white p-8 rounded-lg shadow-lg">
          <h3 className="text-2xl font-semibold mb-4">Active Services</h3>
          <p className="text-primary/80">No active services.</p>
        </div>
      </div>

      <div>
        <h3 className="text-2xl font-semibold mb-4">Resources</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          <div className="flex flex-col items-center justify-center p-6 bg-white rounded-lg shadow-lg text-center">
            <File size={40} className="mb-4 text-accent" />
            <span className="font-semibold">Project_Brief.pdf</span>
          </div>
        </div>
      </div>
    </div>
  );
}