import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useLocation } from 'react-router-dom';
import { Github, Menu, X, Mail, Users } from 'lucide-react';

// Import Pages
import Home from './pages/Home';
import DocsInstallation from './pages/DocsInstallation';
import DocsMonitoring from './pages/DocsMonitoring';

// --- SHARED COMPONENTS (Navbar/Footer/Layout) ---

const Logo = () => (
  <div className="flex items-center gap-2 group cursor-pointer">
    <div className="relative w-8 h-8">
      <svg viewBox="0 0 100 100" className="w-full h-full fill-cyan-400 group-hover:fill-cyan-300 transition-colors drop-shadow-[0_0_8px_rgba(34,211,238,0.5)]">
        <path d="M50 5 L93 28 V72 L50 95 L7 72 V28 Z" fill="none" stroke="currentColor" strokeWidth="8" />
        <path d="M50 25 V75 M28 38 L72 62 M72 38 L28 62" stroke="currentColor" strokeWidth="4" className="opacity-50" />
      </svg>
    </div>
    <span className="text-xl font-bold tracking-tight text-white">
      Kube<span className="text-cyan-400">cents</span>
    </span>
  </div>
);

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const handleLinkClick = () => setIsOpen(false);

  return (
    <nav className="fixed w-full z-50 bg-slate-950/80 backdrop-blur-md border-b border-cyan-500/10">
      <div className="w-full max-w-[1400px] mx-auto px-6 lg:px-12">
        <div className="flex items-center justify-between h-20">
          <Link to="/" onClick={handleLinkClick}><Logo /></Link>
          <div className="hidden md:flex items-center space-x-8">
            <Link to="/" className="text-slate-300 hover:text-cyan-400 transition-colors text-sm font-medium">Home</Link>
            <Link to="/#features" className="text-slate-300 hover:text-cyan-400 transition-colors text-sm font-medium">Features</Link>
            {/* Updated Link to the new install page */}
            <Link to="/docs/install" className="text-slate-300 hover:text-cyan-400 transition-colors text-sm font-medium">Docs</Link>
            <Link to="/#contact" className="text-slate-300 hover:text-cyan-400 transition-colors text-sm font-medium">Contact Us</Link>
            <a href="https://github.com/voidVisual/Kubecent-Kubernetes-cost-optimization" target="_blank" className="bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 hover:bg-cyan-500/20 px-4 py-2 rounded-full text-sm font-medium transition-all flex items-center gap-2">
                <Github size={16} /> GitHub
            </a>
          </div>
          <button onClick={() => setIsOpen(!isOpen)} className="md:hidden text-slate-300 p-2">
            {isOpen ? <X /> : <Menu />}
          </button>
        </div>
      </div>
      {isOpen && (
        <div className="md:hidden bg-slate-900 border-b border-slate-800 px-4 py-4 space-y-4">
          <Link to="/" onClick={handleLinkClick} className="block text-slate-300 hover:text-cyan-400">Home</Link>
          <Link to="/#features" onClick={handleLinkClick} className="block text-slate-300 hover:text-cyan-400">Features</Link>
          <Link to="/docs/install" onClick={handleLinkClick} className="block text-slate-300 hover:text-cyan-400">Docs</Link>
          <Link to="/#contact" onClick={handleLinkClick} className="block text-slate-300 hover:text-cyan-400">Contact</Link>
        </div>
      )}
    </nav>
  );
};

const Footer = () => (
  <footer id="contact" className="bg-slate-950 pt-20 pb-10 border-t border-slate-900 w-full">
    <div className="w-full max-w-[1400px] mx-auto px-6 lg:px-12">
      
      {/* CTA Card */}
      <div className="relative overflow-hidden rounded-3xl border border-slate-800 bg-slate-900/50 p-12 text-center mb-20 group">
        <div className="absolute inset-0 bg-gradient-to-r from-purple-500/10 via-transparent to-cyan-500/10 opacity-50 group-hover:opacity-100 transition-opacity" />
        <div className="relative z-10">
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">
            Start optimizing your Kubernetes costs today
          </h2>
          <p className="text-slate-400 text-lg mb-8 max-w-2xl mx-auto">
            Join DevOps teams using Kubecents to gain clarity, cut waste, and scale with confidence.
          </p>
          <div className="flex justify-center gap-4">
             <Link to="/docs/install" className="bg-white text-slate-950 font-bold py-3 px-8 rounded-lg hover:bg-cyan-50 transition-colors">
               Get Started
             </Link>
             <a href="https://github.com/voidVisual/Kubecent-Kubernetes-cost-optimization" className="bg-slate-800 text-white font-medium py-3 px-8 rounded-lg border border-slate-700 hover:bg-slate-700 transition-all">
               View on GitHub
             </a>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-16 border-b border-slate-900 pb-16 mb-10">
        <div>
          <h3 className="text-xl font-bold text-white mb-4">About Kubecents</h3>
          <p className="text-slate-400 leading-relaxed max-w-md">
            We are on a mission to make Kubernetes cost and performance transparent and actionable for every team. Open source and privacy-first.
          </p>
        </div>
        <div className="bg-slate-900/30 border border-slate-800 rounded-2xl p-8">
           <h3 className="text-xl font-bold text-white mb-2">Contact Us</h3>
           <p className="text-slate-500 mb-6">Questions or feedback? Reach out and we'll get back to you.</p>
           <div className="flex flex-wrap gap-4">
             <a href="mailto:hello@kubecents.io" className="flex items-center gap-2 bg-slate-800 hover:bg-slate-700 border border-slate-700 text-white px-4 py-2 rounded-lg transition-colors text-sm">
               <Mail size={16} /> hello@kubecents.io
             </a>
             <a href="#" className="flex items-center gap-2 text-slate-400 hover:text-cyan-400 transition-colors text-sm px-2 py-2">
               <Users size={16} /> Join our community
             </a>
           </div>
        </div>
      </div>

      <div className="text-center text-slate-600 text-sm">
        <p>© {new Date().getFullYear()} Kubecents. Open Source (MIT License).</p>
      </div>
    </div>
  </footer>
);

// Layout for ocumentation Pages (Sidebar logic)
const DocsLayout = ({ children }) => {
  const loc = useLocation();
  const menu = [
    { name: 'Installation', path: '/docs/install' },
    { name: 'Monitoring', path: '/docs/monitoring' },
  ];

  return (
    <div className="bg-slate-950 min-h-screen">
       <Navbar />
       <div className="pt-24 flex max-w-[1400px] mx-auto">
        <aside className="hidden md:block w-72 fixed top-24 bottom-0 overflow-y-auto border-r border-slate-800 p-8 bg-slate-950">
          <div className="space-y-2">
            {menu.map(item => (
              <Link key={item.path} to={item.path} 
                className={`block px-4 py-3 rounded-lg text-sm font-medium transition-colors ${loc.pathname === item.path ? 'bg-cyan-500/10 text-cyan-400 border border-cyan-500/20' : 'text-slate-400 hover:text-white hover:bg-slate-800'}`}>
                {item.name}
              </Link>
            ))}
          </div>
        </aside>
        <main className="flex-1 md:ml-72 p-12 max-w-4xl">{children}</main>
      </div>
    </div>
  );
};

// --- MAIN APP COMPONENT ---
function App() {
  return (
    <Router>
      <div className="bg-slate-950 min-h-screen text-white selection:bg-cyan-500/30">
        <Routes>
          {/* Home Route (Has its own layout with Navbar/Footer) */}
          <Route path="/" element={
            <>
              <Navbar />
              <Home />
              <Footer />
            </>
          } />
          
          {/* Docs Routes (Use the specific Docs Layout) */}
          <Route path="/docs/install" element={<DocsLayout><DocsInstallation /></DocsLayout>} />
          <Route path="/docs/monitoring" element={<DocsLayout><DocsMonitoring /></DocsLayout>} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;