"use client";

import { supabase } from "@/lib/supabase";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Eye, EyeOff, LogIn, Loader2 } from "lucide-react";
import Scene from "@/components/3d/Scene";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      const { error: signInError } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (signInError) throw signInError;
      
      router.push("/dashboard");
      router.refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Authentication failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Scene />
      
      <main className="min-h-screen flex items-center justify-center relative overflow-hidden px-4">
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-background via-background/98 to-surface/30 -z-10" />
        
        {/* Back to Home Link */}
        <button
          onClick={() => router.push("/")}
          className="absolute top-8 left-8 text-xs uppercase tracking-[0.2em] text-foreground/50 hover:text-accent transition-colors"
        >
          ← Back
        </button>

        {/* Login Card */}
        <div className="w-full max-w-md">
          {/* Header */}
          <div className="text-center mb-12">
            <div className="inline-block mb-4">
              <div className="text-3xl font-bold tracking-[0.2em] text-foreground">
                ONZA<span className="text-accent">CORE</span>
              </div>
            </div>
            <h1 className="text-2xl font-light tracking-wider text-foreground/80 mb-2">
              Access Control
            </h1>
            <p className="text-xs uppercase tracking-[0.25em] text-foreground/40">
              Authorized Personnel Only
            </p>
          </div>
          
          {/* Form */}
          <form onSubmit={handleLogin} className="glass-effect rounded-2xl p-8 border border-border/20 backdrop-blur-xl space-y-6">
            
            {/* Email Field */}
            <div className="space-y-2">
              <label 
                htmlFor="email" 
                className="block text-[10px] uppercase tracking-[0.2em] text-foreground/60 font-medium"
              >
                Email Address
              </label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={loading}
                required
                className="w-full px-4 py-3 bg-surface/20 border border-border/30 rounded-lg text-foreground placeholder:text-foreground/20 focus:outline-none focus:border-accent/50 focus:bg-surface/30 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                placeholder="user@onzacore.com"
              />
            </div>
            
            {/* Password Field */}
            <div className="space-y-2">
              <label 
                htmlFor="password" 
                className="block text-[10px] uppercase tracking-[0.2em] text-foreground/60 font-medium"
              >
                Access Code
              </label>
              <div className="relative">
                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  disabled={loading}
                  required
                  className="w-full px-4 py-3 pr-12 bg-surface/20 border border-border/30 rounded-lg text-foreground placeholder:text-foreground/20 focus:outline-none focus:border-accent/50 focus:bg-surface/30 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                  placeholder="••••••••••••"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  disabled={loading}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-foreground/40 hover:text-foreground/70 transition-colors disabled:opacity-50"
                  tabIndex={-1}
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>
            
            {/* Error Message */}
            {error && (
              <div className="bg-red-500/10 border border-red-500/30 rounded-lg p-3 text-sm text-red-400 text-center">
                {error}
              </div>
            )}
            
            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full py-3.5 bg-accent hover:bg-accent/90 disabled:bg-accent/50 rounded-lg font-bold text-sm uppercase tracking-[0.15em] text-background transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] disabled:cursor-not-allowed disabled:hover:scale-100 flex items-center justify-center gap-2"
            >
              {loading ? (
                <>
                  <Loader2 className="animate-spin" size={18} />
                  Authenticating...
                </>
              ) : (
                <>
                  <LogIn size={18} />
                  Access System
                </>
              )}
            </button>
            
            {/* Footer Note */}
            <div className="pt-4 border-t border-border/10">
              <p className="text-[10px] text-center text-foreground/40 uppercase tracking-wider">
                Secure connection established
              </p>
            </div>
          </form>
          
          {/* Bottom Decoration */}
          <div className="mt-8 flex items-center justify-center gap-2 text-foreground/20">
            <div className="h-px w-12 bg-gradient-to-r from-transparent to-border" />
            <div className="w-1 h-1 rounded-full bg-accent/40" />
            <div className="h-px w-12 bg-gradient-to-l from-transparent to-border" />
          </div>
        </div>
      </main>
    </>
  );
}