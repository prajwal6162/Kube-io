import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  ChevronRight,
  Check,
  Copy,
  Rocket,
  AlertCircle,
  Server,
  Clock,
  Globe,
  BarChart,
  Trash2,
  TestTube,
  Package,
} from 'lucide-react';

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

const installationSteps = [
  { id: 'prerequisites', label: 'Prerequisites' },
  { id: 'add-repo', label: 'Step 1: Add Helm repository' },
  { id: 'create-namespace', label: 'Step 2: Create namespace' },
  { id: 'install-kubecents', label: 'Step 3: Install Kubecents' },
  { id: 'wait-for-pods', label: 'Step 4: Wait for all pods' },
  { id: 'access-dashboard', label: 'Step 5: Access dashboard' },
  { id: 'metrics-populate', label: 'Step 6: Allow metrics to populate' },
  { id: 'test-workload', label: 'Optional: Deploy a test workload' },
  { id: 'troubleshooting', label: 'Troubleshooting' },
  { id: 'uninstall', label: 'Uninstall Kubecents' },
];

const DocsInstallation = () => (
  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="pb-20">
    <div className="mb-12 border-b border-slate-800 pb-8">
      <div className="flex items-center gap-3 mb-4">
        <div className="p-3 bg-cyan-500/10 rounded-xl border border-cyan-500/20 text-cyan-400">
          <Rocket size={32} />
        </div>
        <h1 className="text-4xl font-bold text-white">Kubecents Setup Guide</h1>
      </div>
      <p className="text-xl text-slate-400 leading-relaxed max-w-3xl">
        Install Kubecents using <span className="text-white font-semibold">Helm</span> as the recommended method.
        It runs inside your cluster alongside OpenCost and Prometheus.
      </p>
    </div>

    <section className="mb-12 rounded-2xl border border-slate-800 bg-slate-900/40 p-6">
      <h2 className="text-xl font-bold text-white mb-4">Setup Steps</h2>
      <ul className="list-disc space-y-3 pl-6 text-slate-300">
        {installationSteps.map(step => (
          <li key={step.id}>
            <a href={`#${step.id}`} className="transition-colors hover:text-cyan-400">
              {step.label}
            </a>
          </li>
        ))}
      </ul>
    </section>

    <div className="space-y-16">
      <section id="prerequisites" className="scroll-mt-28">
        <h2 className="text-2xl font-bold text-white mb-6">Prerequisites</h2>
        <div className="bg-slate-900/50 border border-slate-800 rounded-xl p-6">
          <ul className="list-disc space-y-6 pl-6 text-slate-300">
            <li>
              <span className="font-semibold text-white">Kubernetes cluster running</span>
              <p className="mt-2 text-sm text-slate-400">Supported options include Minikube, Kind, AWS EKS, GKE, and AKS.</p>
              <CodeBlock code="kubectl get nodes" />
            </li>
            <li>
              <span className="font-semibold text-white">Helm installed</span>
              <CodeBlock code="helm version" />
              <p className="text-xs text-slate-500 mt-2">
                Need Helm? <a href="https://helm.sh/docs/intro/install/" target="_blank" rel="noreferrer" className="text-cyan-400 underline">View the install guide</a>
              </p>
            </li>
            <li>
              <span className="font-semibold text-white">kubectl installed</span>
              <CodeBlock code="kubectl version --client" />
            </li>
          </ul>
        </div>
      </section>

      <section id="add-repo" className="scroll-mt-28">
        <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
          <Package className="text-orange-400" /> Step 1 - Add Kubecents Helm Repository
        </h2>
        <ul className="list-disc space-y-3 pl-6 text-slate-300">
          <li>Add the official Kubecents chart repository to your local Helm client.</li>
          <li>Refresh Helm so the latest charts are available.</li>
        </ul>
        <CodeBlock code={`helm repo add kubecents https://charts.kubecents.io\nhelm repo update`} />
      </section>

      <section id="create-namespace" className="scroll-mt-28">
        <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
          <Server className="text-purple-400" /> Step 2 - Create Namespace
        </h2>
        <ul className="list-disc space-y-3 pl-6 text-slate-300">
          <li>Create a dedicated namespace so Kubecents resources stay isolated.</li>
        </ul>
        <CodeBlock code="kubectl create namespace kubecents" />
      </section>

      <section id="install-kubecents" className="scroll-mt-28">
        <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
          <Rocket className="text-green-400" /> Step 3 - Install Kubecents
        </h2>
        <ul className="list-disc space-y-3 pl-6 text-slate-300">
          <li>Install the Kubecents Helm chart into the `kubecents` namespace.</li>
          <li>The deployment includes the frontend, backend, OpenCost, and Prometheus.</li>
        </ul>
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

      <section id="wait-for-pods" className="scroll-mt-28">
        <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
          <Clock className="text-yellow-400" /> Step 4 - Wait for All Pods
        </h2>
        <ul className="list-disc space-y-3 pl-6 text-slate-300">
          <li>Watch the namespace until all pods report a running state.</li>
          <li>Only continue after the core services are healthy.</li>
        </ul>
        <CodeBlock code="kubectl get pods -n kubecents" />
      </section>

      <section id="access-dashboard" className="scroll-mt-28">
        <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
          <Globe className="text-blue-400" /> Step 5 - Access Kubecents Dashboard
        </h2>
        <ul className="list-disc space-y-3 pl-6 text-slate-300">
          <li>Port-forward the frontend service to your local machine.</li>
          <li>Open the local URL in your browser to view the dashboard.</li>
        </ul>
        <CodeBlock code="kubectl port-forward svc/kubecents-frontend 9090 -n kubecents" />
        <div className="inline-block px-4 py-2 bg-slate-800 rounded text-cyan-400 font-mono border border-slate-700">
          http://localhost:9090
        </div>
      </section>

      <section id="metrics-populate" className="scroll-mt-28 bg-gradient-to-r from-blue-900/20 to-cyan-900/20 border border-blue-500/30 rounded-xl p-8">
        <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
          <BarChart className="text-cyan-400" /> Step 6 - Allow Metrics to Populate
        </h2>
        <ul className="list-disc space-y-3 pl-6 text-slate-300">
          <li>Wait 5-10 minutes so Prometheus can collect enough runtime data.</li>
          <li>Once metrics arrive, Kubecents begins showing cost and optimization insights.</li>
        </ul>
        <ul className="mt-4 space-y-2 text-slate-400">
          <li className="flex items-center gap-2"><Check size={16} className="text-blue-400" /> Namespace cost breakdown</li>
          <li className="flex items-center gap-2"><Check size={16} className="text-blue-400" /> Workload cost trends</li>
          <li className="flex items-center gap-2"><Check size={16} className="text-blue-400" /> Optimization insights</li>
          <li className="flex items-center gap-2"><Check size={16} className="text-blue-400" /> Cluster health score</li>
        </ul>
      </section>

      <section id="test-workload" className="scroll-mt-28">
        <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
          <TestTube className="text-purple-400" /> Optional - Deploy a Test Workload
        </h2>
        <ul className="list-disc space-y-3 pl-6 text-slate-300">
          <li>Deploy a lightweight sample workload if you want to generate immediate usage data.</li>
        </ul>
        <CodeBlock code={`kubectl create namespace demo\nkubectl run nginx --image=nginx --requests='cpu=200m,memory=256Mi' -n demo`} />
      </section>

      <section id="troubleshooting" className="scroll-mt-28 border-t border-slate-800 pt-12">
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

      <section id="uninstall" className="scroll-mt-28">
        <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
          <Trash2 className="text-slate-400" /> Uninstall Kubecents
        </h2>
        <ul className="list-disc space-y-3 pl-6 text-slate-300">
          <li>Remove the Helm release.</li>
          <li>Delete the namespace if you no longer need any Kubecents resources.</li>
        </ul>
        <CodeBlock code={`helm uninstall kubecents -n kubecents\nkubectl delete namespace kubecents`} />
      </section>

      <div className="flex justify-end pt-10">
        <Link to="/docs/monitoring" className="bg-cyan-600 hover:bg-cyan-500 text-white font-bold py-3 px-8 rounded-lg flex items-center gap-2 transition-all shadow-lg shadow-cyan-500/20">
          Next: Monitoring Setup <ChevronRight size={20} />
        </Link>
      </div>
    </div>
  </motion.div>
);

export default DocsInstallation;
