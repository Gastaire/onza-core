"use client";

import { useAuth } from "@/components/features/auth/AuthContext";
import { ClientDashboard } from "@/components/features/dashboard/ClientDashboard";
import { ProfessionalDashboard } from "@/components/features/dashboard/ProfessionalDashboard";
import { Header } from "@/components/ui/Header";
import Scene from "@/components/3d/Scene";

export default function DashboardPage() {
  const { role } = useAuth();

  return (
    <>
      <Header />
      <Scene />
      <main className="min-h-screen pt-24 relative">
         {/* Background Gradient */}
         <div className="absolute inset-0 bg-gradient-to-b from-background via-background/95 to-surface/10 -z-10 pointer-events-none" />
         
        <div className="container mx-auto px-8">
          <div className="glass-effect rounded-2xl p-8 min-h-[80vh] border border-border/20 backdrop-blur-xl">
             <h1 className="text-3xl font-bold text-foreground mb-8 tracking-tight border-b border-border/10 pb-4">
                Dashboard
             </h1>
            {role === "client" && <ClientDashboard />}
            {role === "professional" && <ProfessionalDashboard />}
            {!role && <div className="text-foreground/50 animate-pulse">Loading system modules...</div>}
          </div>
        </div>
      </main>
    </>
  );
}