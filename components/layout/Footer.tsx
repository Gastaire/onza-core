export default function Footer() {
  return (
    <footer className="bg-black py-20 px-6 border-t border-white/10">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center md:items-start gap-10">
        <div className="text-center md:text-left">
          <h2 className="text-2xl font-bold text-foreground tracking-widest mb-2">ONZA<span className="text-accent">CORE</span></h2>
          <p className="text-foreground/50 text-sm">Engineered for Excellence.</p>
        </div>
        
        <div className="flex gap-8 text-foreground/70 text-sm tracking-wider uppercase">
          <a href="#" className="hover:text-accent transition-colors">Linkedin</a>
          <a href="#" className="hover:text-accent transition-colors">Twitter</a>
          <a href="#" className="hover:text-accent transition-colors">Github</a>
        </div>

        <div className="text-foreground/30 text-xs">
          © {new Date().getFullYear()} OnzaCore. All rights reserved.
        </div>
      </div>
    </footer>
  );
}