import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  ChevronRight, Check, Copy, Terminal, Rocket, 
  AlertCircle, Server, Clock, Globe, BarChart, 
  Trash2, TestTube, Package 
} from 'lucide-react';

// Reusable CodeBlock Component
const CodeBlock = ({ code, label = 'bash' }) => {
  const [copied, setCopied] = useState(false);
  const handleCopy = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };
  return (
    <div className="my-4 rounded-lg overflow-hidden border border-slate-800 bg-slate-950/50 shadow-inner">
      <div className="flex justify-between items-center px-4 py-2 bg-slate-900/80 border-b border-slate-800">
        <span className="text-xs text-slate-400 font-mono uppercase">{label}</span>
        <button onClick={handleCopy} className="text-slate-500 hover:text-cyan-400 transition-colors">
          {copied ? <Check size={14} /> : <Copy size={14} />}
        </button>
      </div>
      <div className="p-4 overflow-x-auto">
        <pre className="text-sm font-mono text-cyan-100 whitespace-pre-wrap"><code>{code}</code></pre>
      </div>
    </div>
  );
};

const DocsInstallation = () => (
  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="pb-20">
    
    {/* HEADER */}
    <div className="mb-12 border-b border-slate-800 pb-8">
      <div className="flex items-center gap-3 mb-4">
        <div className="p-3 bg-cyan-500/10 rounded-xl border border-cyan-500/20 text-cyan-400">
          <Rocket size={32} />
        </div>
        <h1 className="text-4xl font-bold text-white">Kubecents Setup Guide</h1>
      </div>
      <p className="text-xl text-slate-400 leading-relaxed max-w-3xl">
        Install Kubecents using <span className="text-white font-semibold">Helm</span> (Recommended Method). 
        It runs inside your cluster alongside OpenCost and Prometheus.
      </p>
    </div>
    
    <div className="space-y-16">

      {/* PREREQUISITES */}
      <section>
        <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
          <span className="text-cyan-500">📋</span> Prerequisites
        </h2>
        <div className="bg-slate-900/50 border border-slate-800 rounded-xl p-6 space-y-8">
          
          <div>
            <h3 className="text-lg font-semibold text-white mb-2 flex items-center gap-2">
              1. Kubernetes Cluster Running
            </h3>
            <p className="text-slate-400 mb-3 text-sm">Supported: Minikube, Kind, AWS EKS, GKE, AKS.</p>
            <CodeBlock code="kubectl get nodes" />
          </div>

          <div>
            <h3 className="text-lg font-semibold text-white mb-2 flex items-center gap-2">
              2. Helm Installed
            </h3>
            <CodeBlock code="helm version" />
            <p className="text-xs text-slate-500 mt-2">
              Need Helm? <a href="https://helm.sh/docs/intro/install/" target="_blank" rel="noreferrer" className="text-cyan-400 underline">View install guide</a>
            </p>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-white mb-2 flex items-center gap-2">
              3. kubectl Installed
            </h3>
            <CodeBlock code="kubectl version --client" />
          </div>
        </div>
      </section>

      {/* STEP 1: HELM REPO */}
      <section>
        <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
          <Package className="text-orange-400" /> Step 1 — Add Kubecents Helm Repository
        </h2>
        <p className="text-slate-400 mb-4">Add the official chart repository to your local Helm client.</p>
        <CodeBlock code={`helm repo add kubecents https://charts.kubecents.io\nhelm repo update`} />
      </section>

      {/* STEP 2: NAMESPACE */}
      <section>
        <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
          <Server className="text-purple-400" /> Step 2 — Create Namespace
        </h2>
        <CodeBlock code="kubectl create namespace kubecents" />
      </section>

      {/* STEP 3: INSTALL */}
      <section>
        <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
          <Rocket className="text-green-400" /> Step 3 — Install Kubecents
        </h2>
        <CodeBlock code="helm install kubecents kubecents/kubecents -n kubecents" />
        
        <div className="mt-4 p-4 bg-slate-900 rounded-lg border border-slate-800">
          <p className="text-sm text-slate-400 mb-2 font-semibold">This installs:</p>
          <ul className="grid grid-cols-2 gap-2 text-sm text-slate-300">
            <li className="flex items-center gap-2"><Check size={14} className="text-cyan-400" /> Kubecents Frontend</li>
            <li className="flex items-center gap-2"><Check size={14} className="text-cyan-400" /> Kubecents Backend</li>
            <li className="flex items-center gap-2"><Check size={14} className="text-cyan-400" /> OpenCost</li>
            <li className="flex items-center gap-2"><Check size={14} className="text-cyan-400" /> Prometheus</li>
          </ul>
        </div>
      </section>

      {/* STEP 4: WAIT */}
      <section>
        <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
          <Clock className="text-yellow-400" /> Step 4 — Wait for All Pods
        </h2>
        <p className="text-slate-400 mb-4">Wait until all pods show <code>STATUS: Running</code>.</p>
        <CodeBlock code="kubectl get pods -n kubecents" />
      </section>

      {/* STEP 5: ACCESS DASHBOARD */}
      <section>
        <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
          <Globe className="text-blue-400" /> Step 5 — Access Kubecents Dashboard
        </h2>
        <div className="space-y-6">
          <div>
            <p className="text-slate-400 mb-2 font-semibold">Port-forward the service:</p>
            <CodeBlock code="kubectl port-forward svc/kubecents-frontend 9090 -n kubecents" />
          </div>
          <div>
            <p className="text-slate-400 mb-2 font-semibold">Open your browser:</p>
            <div className="inline-block px-4 py-2 bg-slate-800 rounded text-cyan-400 font-mono border border-slate-700">
              http://localhost:9090
            </div>
          </div>
        </div>
      </section>

      {/* STEP 6: METRICS POPULATION */}
      <section className="bg-gradient-to-r from-blue-900/20 to-cyan-900/20 border border-blue-500/30 rounded-xl p-8">
        <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
          <BarChart className="text-cyan-400" /> Step 6 — Allow Metrics to Populate
        </h2>
        <p className="text-slate-300 mb-4">
          Kubecents requires some runtime data. After <span className="text-white font-bold">5–10 minutes</span>, dashboards will start showing:
        </p>
        <ul className="space-y-2 text-slate-400">
          <li className="flex items-center gap-2"><Check size={16} className="text-blue-400" /> Namespace cost breakdown</li>
          <li className="flex items-center gap-2"><Check size={16} className="text-blue-400" /> Workload cost trends</li>
          <li className="flex items-center gap-2"><Check size={16} className="text-blue-400" /> Optimization insights</li>
          <li className="flex items-center gap-2"><Check size={16} className="text-blue-400" /> Cluster health score</li>
        </ul>
      </section>

      {/* OPTIONAL: TEST WORKLOAD */}
      <section>
        <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
          <TestTube className="text-purple-400" /> Optional — Deploy a Test Workload
        </h2>
        <p className="text-slate-400 mb-4">Generate some sample resource usage to see immediate data.</p>
        <CodeBlock code={`kubectl create namespace demo\nkubectl run nginx --image=nginx --requests='cpu=200m,memory=256Mi' -n demo`} />
      </section>

      {/* TROUBLESHOOTING */}
      <section className="border-t border-slate-800 pt-12">
        <h2 className="text-2xl font-bold text-white mb-8 flex items-center gap-2">
          <AlertCircle className="text-red-400" /> Troubleshooting
        </h2>
        
        <div className="grid md:grid-cols-2 gap-6">
          <div className="p-6 bg-slate-900/50 rounded-xl border border-slate-800">
            <h3 className="font-bold text-white mb-2">Pods not running?</h3>
            <CodeBlock code="kubectl describe pod <pod-name> -n kubecents" />
          </div>
          
          <div className="p-6 bg-slate-900/50 rounded-xl border border-slate-800">
            <h3 className="font-bold text-white mb-2">Check logs</h3>
            <CodeBlock code="kubectl logs <pod-name> -n kubecents" />
          </div>
        </div>
        
        <div className="mt-6 p-4 bg-yellow-900/10 border border-yellow-500/20 rounded-lg text-yellow-200/80 text-sm">
          <strong>No cost data?</strong> Wait a few minutes for Prometheus to collect metrics from the new pods.
        </div>
      </section>

      {/* UNINSTALL */}
      <section>
        <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
          <Trash2 className="text-slate-400" /> Uninstall Kubecents
        </h2>
        <CodeBlock code={`helm uninstall kubecents -n kubecents\nkubectl delete namespace kubecents`} />
      </section>

      {/* NEXT STEPS */}
      <div className="flex justify-end pt-10">
         <Link to="/docs/monitoring" className="bg-cyan-600 hover:bg-cyan-500 text-white font-bold py-3 px-8 rounded-lg flex items-center gap-2 transition-all shadow-lg shadow-cyan-500/20">
            Next: Monitoring Setup <ChevronRight size={20} />
         </Link>
      </div>

    </div>
  </motion.div>
);

export default DocsInstallation;