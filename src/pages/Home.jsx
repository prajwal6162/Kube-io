import React, { useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  LayoutGrid, Activity, Shield, ChevronRight, Github, 
  Zap, Bell
} from 'lucide-react';

// You can keep FeatureCard local or move it to a components folder
const FeatureCard = ({ icon, title, desc }) => (
  <motion.div 
    whileHover={{ y: -8 }}
    className="p-10 rounded-2xl bg-slate-900 border border-slate-800 hover:border-cyan-500/40 transition-all group hover:shadow-[0_0_30px_rgba(34,211,238,0.05)]"
  >
    <div className="mb-8 p-4 bg-slate-800/50 w-fit rounded-xl group-hover:bg-cyan-950/30 transition-colors">{icon}</div>
    <h3 className="text-2xl font-bold text-white mb-4 group-hover:text-cyan-400 transition-colors">{title}</h3>
    <p className="text-slate-400 leading-relaxed text-lg">{desc}</p>
  </motion.div>
);

const Home = () => {
  const location = useLocation();

  useEffect(() => {
    if (location.hash) {
      const element = document.getElementById(location.hash.substring(1));
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, [location]);

  return (
    <div className="min-h-screen bg-slate-950 selection:bg-cyan-500/30 w-full overflow-x-hidden">
      
      {/* HERO SECTION */}
      <div className="relative pt-32 pb-20 w-full px-6 lg:px-12 text-center overflow-hidden">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[80vw] h-[500px] bg-cyan-500/10 blur-[120px] rounded-full pointer-events-none" />
          
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} className="relative z-10 max-w-[1400px] mx-auto">
            
            <div className="flex justify-center mb-8">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-cyan-950/50 border border-cyan-500/30 text-cyan-400 font-bold tracking-wide text-sm uppercase shadow-[0_0_15px_rgba(34,211,238,0.2)]">
                <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
                Meet Kubecents
              </div>
            </div>

            <h1 className="text-5xl md:text-7xl lg:text-8xl font-extrabold tracking-tight text-white mb-8">
              Stop guessing your <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">
                Kubernetes costs.
              </span>
            </h1>
            
            <p className="max-w-3xl mx-auto text-xl md:text-2xl text-slate-400 mb-12 leading-relaxed">
              <span className="text-white font-semibold">Kubecents</span> is the open-source cost monitoring tool for AWS EKS. Install in minutes, visualize in Grafana, and save thousands.
            </p>
            
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Link to="/docs/install" className="bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold py-4 px-12 rounded-xl transition-all shadow-[0_0_30px_rgba(34,211,238,0.4)] text-lg">
                Get Started
              </Link>
              <a href="https://github.com" className="bg-slate-900 hover:bg-slate-800 text-white font-medium py-4 px-12 rounded-xl border border-slate-700 transition-all text-lg">
                View on GitHub
              </a>
            </div>
          </motion.div>
      </div>

      {/* PRODUCT INTRO */}
      <div className="relative py-24 w-full bg-slate-950">
        <div className="w-full max-w-[1400px] mx-auto px-6 lg:px-12 grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
          
          <motion.div initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
            <span className="inline-block py-1 px-3 rounded-full bg-cyan-950 border border-cyan-500/30 text-cyan-400 font-bold tracking-wide text-xs uppercase mb-6">
              Cloud-native Cost Intelligence
            </span>
            <h2 className="text-4xl md:text-6xl font-bold text-white mb-6 leading-tight">
              Kubecents – <br />
              Monitoring & Optimization
            </h2>
            <p className="text-lg text-slate-400 mb-6 leading-relaxed">
              Kubecents is a cloud-native platform designed to simplify Kubernetes monitoring and cost optimization. 
              It enables DevOps teams to gain real-time visibility into their clusters, track pod-level resource usage, 
              and receive actionable alerts.
            </p>
            
            <a 
              href="https://drive.google.com/file/d/1D_MEr8-2t9K6LlCwSSk_wOLPR0OPE69r/view?usp=drive_link" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-cyan-400 hover:text-cyan-300 font-bold flex items-center gap-2 group text-lg"
            >
              See how it works <ChevronRight className="group-hover:translate-x-1 transition-transform" />
            </a>

          </motion.div>

          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }} 
            whileInView={{ opacity: 1, scale: 1 }} 
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative"
          >
            <div className="absolute inset-0 bg-gradient-to-tr from-cyan-500/20 to-blue-600/20 blur-3xl -z-10 rounded-full" />
            <div className="relative z-10 bg-slate-900/80 backdrop-blur border border-cyan-500/20 rounded-2xl p-8 shadow-2xl shadow-cyan-500/10">
              {/* Fake UI Header */}
              <div className="flex items-center gap-4 mb-8 border-b border-cyan-500/10 pb-4">
                <div className="flex gap-2">
                  <div className="w-3 h-3 rounded-full bg-red-500/20" />
                  <div className="w-3 h-3 rounded-full bg-yellow-500/20" />
                  <div className="w-3 h-3 rounded-full bg-green-500/20" />
                </div>
                <div className="h-2 w-32 bg-slate-800 rounded-full" />
              </div>
              {/* Fake Charts */}
              <div className="grid grid-cols-3 gap-6 mb-6">
                 <div className="col-span-2 h-48 bg-gradient-to-t from-cyan-500/10 to-transparent rounded-lg border border-cyan-500/20 relative overflow-hidden">
                    <svg className="absolute bottom-0 left-0 w-full h-full" preserveAspectRatio="none">
                      <path d="M0,100 Q30,80 50,90 T100,60 T150,80 T200,40 T250,50 T300,20 V160 H0 Z" fill="rgba(34, 211, 238, 0.1)" />
                      <path d="M0,100 Q30,80 50,90 T100,60 T150,80 T200,40 T250,50 T300,20" fill="none" stroke="#22d3ee" strokeWidth="3" />
                    </svg>
                 </div>
                 <div className="col-span-1 h-48 flex items-end justify-between gap-2 px-2 pb-2 bg-slate-800/50 rounded-lg border border-slate-700">
                    {[40, 70, 50, 90].map((h, i) => (
                      <div key={i} style={{height: `${h}%`}} className="w-full bg-cyan-500/40 rounded-t-sm shadow-[0_0_10px_rgba(34,211,238,0.2)]" />
                    ))}
                 </div>
              </div>
              <div className="space-y-3">
                 {[1,2,3].map(i => (
                   <div key={i} className="h-8 w-full bg-slate-800/50 rounded flex items-center px-4 border border-slate-800">
                      <div className="w-2 h-2 rounded-full bg-cyan-400 mr-4 animate-pulse" />
                      <div className="h-2 w-1/2 bg-slate-700 rounded" />
                   </div>
                 ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* FEATURES GRID */}
      <div id="features" className="w-full bg-slate-900/50 py-32 border-t border-slate-800">
        <div className="w-full max-w-[1400px] mx-auto px-6 lg:px-12">
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">Why teams choose Kubecents</h2>
            <p className="text-slate-400 text-xl max-w-2xl mx-auto">Purpose-built for Kubernetes environments with deep cost and performance insights.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <FeatureCard 
              icon={<Activity className="text-cyan-400" size={32} />}
              title="Real-time visibility"
              desc="Live cost and resource usage across clusters, namespaces, and pods. Drill down from cluster to pod-level CPU, memory, and cost allocation in seconds."
            />
            <FeatureCard 
              icon={<LayoutGrid className="text-blue-400" size={32} />}
              title="Prometheus & Grafana"
              desc="Native integration for intuitive, familiar dashboards. Plug into your existing observability stack while enriching it with cost signals."
            />
            <FeatureCard 
              icon={<Zap className="text-yellow-400" size={32} />}
              title="Workload right-sizing"
              desc="Detect underutilized or overprovisioned workloads. Receive actionable recommendations to reclaim waste and lower cluster costs."
            />
            <FeatureCard 
              icon={<Bell className="text-red-400" size={32} />}
              title="Threshold-based alerting"
              desc="Configure budgets and alerts by namespace, label, or deployment for proactive control."
            />
            <FeatureCard 
              icon={<Shield className="text-green-400" size={32} />}
              title="DR readiness & health"
              desc="Continuously monitor cluster health for resilience. Ensure disaster recovery readiness with health checks and SLOs across regions."
            />
            <div className="p-10 rounded-2xl bg-slate-900 border border-slate-800 hover:border-cyan-500/50 transition-all group flex flex-col justify-between hover:shadow-[0_0_30px_rgba(34,211,238,0.1)]">
               <div>
                  <h3 className="text-2xl font-bold text-white mb-4">Explore the docs</h3>
                  <p className="text-slate-400 leading-relaxed mb-8 text-lg">
                    Learn how to connect your AWS account, install the agent, and start tracking costs in minutes.
                  </p>
               </div>
               <Link to="/docs/install" className="inline-block w-full bg-cyan-600 hover:bg-cyan-500 text-white font-bold py-4 px-6 rounded-xl text-center transition-colors shadow-lg shadow-cyan-500/20">
                 Read docs
               </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;