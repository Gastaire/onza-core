"use client";

import { useAuth } from "@/components/features/auth/AuthContext";
import { ClientDashboard } from "@/components/features/dashboard/ClientDashboard";
import { ProfessionalDashboard } from "@/components/features/dashboard/ProfessionalDashboard";
import { useRouter } from "next/navigation";
import { LogOut, Loader2 } from "lucide-react";
import { supabase } from "@/lib/supabase";
import { useState } from "react";

export default function DashboardPage() {
  const { role, user } = useAuth();
  const router = useRouter();
  const [loggingOut, setLoggingOut] = useState(false);

  const handleLogout = async () => {
    setLoggingOut(true);
    await supabase.auth.signOut();
    router.push("/");
    router.refresh();
  };

  if (!user) {
    return (
      <main className="min-h-screen flex items-center justify-center bg-background">
        <Loader2 className="animate-spin text-accent" size={48} />
      </main>
    );
  }

  return (
    <>
      <div className="fixed inset-0 bg-gradient-to-b from-background via-background/98 to-surface/20 -z-10" />
      
      <main className="min-h-screen pt-20 pb-12 px-6 md:px-12 relative">
        {/* Header Bar */}
        <div className="max-w-7xl mx-auto mb-12">
          <div className="flex justify-between items-center backdrop-blur-xl bg-surface/30 border border-border/20 rounded-2xl p-6">
            <div>
              <div className="text-3xl font-bold tracking-tight text-foreground mb-1">
                ONZA<span className="text-accent">CORE</span>
              </div>
              <p className="text-xs uppercase tracking-[0.2em] text-foreground/40">
                Control Panel
              </p>
            </div>
            
            <button
              onClick={handleLogout}
              disabled={loggingOut}
              className="flex items-center gap-2 px-6 py-3 bg-surface/50 hover:bg-surface border border-border/30 hover:border-accent/50 rounded-lg text-sm uppercase tracking-wider text-foreground/70 hover:text-foreground transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loggingOut ? (
                <>
                  <Loader2 className="animate-spin" size={16} />
                  Logging out...
                </>
              ) : (
                <>
                  <LogOut size={16} />
                  Logout
                </>
              )}
            </button>
          </div>
        </div>

        {/* Dashboard Content */}
        <div className="max-w-7xl mx-auto">
          <div className="backdrop-blur-xl bg-surface/20 rounded-2xl p-8 md:p-12 border border-border/10 min-h-[70vh]">
            {!role && (
              <div className="flex flex-col items-center justify-center h-[60vh] gap-4">
                <Loader2 className="animate-spin text-accent" size={40} />
                <p className="text-foreground/50 text-sm uppercase tracking-widest">
                  Loading system modules...
                </p>
              </div>
            )}
            
            {role === "client" && <ClientDashboard />}
            {role === "professional" && <ProfessionalDashboard />}
          </div>
        </div>
      </main>
    </>
  );
}