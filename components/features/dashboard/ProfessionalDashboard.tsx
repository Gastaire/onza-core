import Link from "next/link";
import { Users, FileText } from "lucide-react";

export function ProfessionalDashboard() {
  return (
    <div className="space-y-12">
      <div>
        <h2 className="text-3xl font-bold">Professional Dashboard</h2>
        <p className="text-primary/80">
          Welcome back. Here's an overview of your clients and projects.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="bg-white p-8 rounded-lg shadow-lg">
          <h3 className="text-2xl font-semibold mb-4 flex items-center gap-2">
            <Users size={24} />
            Client Management
          </h3>
          <p className="text-primary/80">No clients yet.</p>
        </div>
        <div className="bg-white p-8 rounded-lg shadow-lg">
          <h3 className="text-2xl font-semibold mb-4 flex items-center gap-2">
            <FileText size={24} />
            Blog Management
          </h3>
          <Link
            href="/dashboard/blog"
            className="text-primary font-semibold hover:underline"
          >
            Go to Blog Management
          </Link>
        </div>
      </div>
    </div>
  );
}