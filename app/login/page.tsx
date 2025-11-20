"use client";

import { Header } from "@/components/ui/Header";
import { supabase } from "@/lib/supabase";
import { useState } from "react";
import LiquidButton from "@/components/ui/LiquidButton";
import Scene from "@/components/3d/Scene";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      setError(error.message);
    } else {
      window.location.href = "/dashboard";
    }
  };

  return (
    <>
      <Header />
      <Scene />
      <main className="min-h-screen flex items-center justify-center relative overflow-hidden">
        {/* Background Gradient */}
        <div className="absolute inset-0 bg-gradient-to-b from-background via-background/90 to-surface/20 -z-10" />

        <div className="w-full max-w-md p-12 glass-effect rounded-2xl border border-border/10 relative z-10 backdrop-blur-xl">
          <h1 className="text-4xl font-bold text-center mb-2 tracking-tight text-foreground">Welcome Back</h1>
          <p className="text-center text-foreground/50 mb-10 text-sm tracking-widest uppercase">Access the mainframe</p>
          
          <form onSubmit={handleLogin} className="space-y-6">
            <div className="space-y-2">
              <label htmlFor="email" className="block text-xs uppercase tracking-widest text-foreground/70">
                Email
              </label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full p-4 bg-surface/10 border border-border/20 rounded-lg text-foreground placeholder:text-foreground/20 focus:outline-none focus:border-accent/50 transition-colors"
                placeholder="name@onzacore.com"
              />
            </div>
            <div className="space-y-2">
              <label
                htmlFor="password"
                className="block text-xs uppercase tracking-widest text-foreground/70"
              >
                Password
              </label>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full p-4 bg-surface/10 border border-border/20 rounded-lg text-foreground placeholder:text-foreground/20 focus:outline-none focus:border-accent/50 transition-colors"
                placeholder="••••••••"
              />
            </div>
            
            {error && <p className="text-red-400 text-sm text-center bg-red-500/10 p-2 rounded border border-red-500/20">{error}</p>}
            
            <div className="pt-4">
              <LiquidButton className="w-full flex justify-center" fillColor="bg-foreground">
                 <span className="font-bold tracking-widest text-foreground group-hover:text-background">LOGIN</span>
              </LiquidButton>
            </div>
          </form>
        </div>
      </main>
    </>
  );
}