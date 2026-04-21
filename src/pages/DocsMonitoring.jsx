import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  BarChart,
  Key,
  Globe,
  Download,
  AlertCircle,
  Check,
  Copy,
  Layers,
  Database,
  Activity,
  Search,
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

const monitoringSteps = [
  { id: 'monitoring-overview', label: 'Architecture and prerequisites' },
  { id: 'install-grafana', label: 'Step 1: Install Grafana' },
  { id: 'get-password', label: 'Step 2: Get Grafana admin password' },
  { id: 'access-grafana', label: 'Step 3: Access Grafana UI' },
  { id: 'add-data-source', label: 'Step 4: Add Prometheus data source' },
  { id: 'import-dashboard', label: 'Step 5: Import dashboard' },
  { id: 'how-kubecents-uses-this', label: 'How Kubecents uses this setup' },
  { id: 'monitoring-troubleshooting', label: 'Troubleshooting' },
  { id: 'final-stack', label: 'Final stack overview' },
];

const DocsMonitoring = () => (
  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="pb-20">
    <div className="mb-12 border-b border-slate-800 pb-8">
      <div className="flex items-center gap-3 mb-4">
        <div className="p-3 bg-purple-500/10 rounded-xl border border-purple-500/20 text-purple-400">
          <BarChart size={32} />
        </div>
        <h1 className="text-4xl font-bold text-white">Integrate with Grafana</h1>
      </div>
      <p className="text-xl text-slate-400 leading-relaxed max-w-3xl">
        Kubecents uses <span className="text-white font-semibold">Prometheus</span> for metrics collection.
        Grafana can visualize these metrics for advanced dashboards and analysis.
      </p>
    </div>

    <section className="mb-12 rounded-2xl border border-slate-800 bg-slate-900/40 p-6">
      <h2 className="text-xl font-bold text-white mb-4">Monitoring Steps</h2>
      <ul className="list-disc space-y-3 pl-6 text-slate-300">
        {monitoringSteps.map(step => (
          <li key={step.id}>
            <a href={`#${step.id}`} className="transition-colors hover:text-cyan-400">
              {step.label}
            </a>
          </li>
        ))}
      </ul>
    </section>

    <div className="space-y-16">
      <section id="monitoring-overview" className="scroll-mt-28 grid md:grid-cols-2 gap-8">
        <div>
          <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
            <Layers className="text-cyan-400" /> Architecture Overview
          </h2>
          <div className="p-6 bg-slate-900/50 rounded-xl border border-slate-800 h-full">
            <p className="text-sm text-slate-400 mb-4 font-mono">Kubecents -&gt; Prometheus -&gt; Grafana</p>
            <ul className="space-y-3 text-slate-300">
              <li><strong className="text-white">Kubecents:</strong> analyzes cost and optimization.</li>
              <li><strong className="text-white">Prometheus:</strong> stores resource metrics.</li>
              <li><strong className="text-white">Grafana:</strong> visualizes metrics in dashboards.</li>
            </ul>
          </div>
        </div>

        <div>
          <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
            <Check className="text-green-400" /> Prerequisites
          </h2>
          <div className="p-6 bg-slate-900/50 rounded-xl border border-slate-800 h-full">
            <ul className="list-disc space-y-3 pl-6 text-slate-300">
              <li>Ensure Kubecents is already installed and running.</li>
              <li>Prometheus should already be deployed as part of the Kubecents stack.</li>
            </ul>
            <CodeBlock code="kubectl get pods -n kubecents" />
          </div>
        </div>
      </section>

      <section id="install-grafana" className="scroll-mt-28">
        <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
          <Download className="text-green-400" /> Step 1 - Install Grafana
        </h2>
        <ul className="list-disc space-y-3 pl-6 text-slate-300">
          <li>Add the Grafana Helm repository.</li>
          <li>Update your Helm index and install Grafana into a `monitoring` namespace.</li>
        </ul>
        <CodeBlock code={`helm repo add grafana https://grafana.github.io/helm-charts\nhelm repo update`} />
        <CodeBlock code={`kubectl create namespace monitoring\nhelm install grafana grafana/grafana -n monitoring`} />
      </section>

      <section id="get-password" className="scroll-mt-28">
        <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
          <Key className="text-yellow-400" /> Step 2 - Get Grafana Admin Password
        </h2>
        <ul className="list-disc space-y-3 pl-6 text-slate-300">
          <li>Read the Grafana admin password from the Kubernetes secret.</li>
        </ul>
        <CodeBlock code={`kubectl get secret grafana -n monitoring -o jsonpath="{.data.admin-password}" | base64 --decode`} />
      </section>

      <section id="access-grafana" className="scroll-mt-28">
        <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
          <Globe className="text-blue-400" /> Step 3 - Access Grafana UI
        </h2>
        <ul className="list-disc space-y-3 pl-6 text-slate-300">
          <li>Port-forward the Grafana service to your machine.</li>
          <li>Open the local URL and sign in with `admin` plus the password from Step 2.</li>
        </ul>
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <CodeBlock code="kubectl port-forward svc/grafana 3000:80 -n monitoring" />
          </div>
          <div className="p-6 bg-slate-900 rounded-xl border border-slate-800">
            <h3 className="font-bold text-white mb-4">Login Details</h3>
            <ul className="space-y-2 text-slate-400 text-sm">
              <li><strong>URL:</strong> <a href="http://localhost:3000" target="_blank" rel="noreferrer" className="text-cyan-400">http://localhost:3000</a></li>
              <li><strong>Username:</strong> admin</li>
              <li><strong>Password:</strong> from Step 2</li>
            </ul>
          </div>
        </div>
      </section>

      <section id="add-data-source" className="scroll-mt-28">
        <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
          <Database className="text-purple-400" /> Step 4 - Add Prometheus Data Source
        </h2>
        <div className="bg-slate-900/50 border border-slate-800 rounded-xl p-6">
          <ul className="list-disc space-y-3 pl-6 text-slate-300 mb-6">
            <li>Open <code>Settings -&gt; Data Sources</code> in Grafana.</li>
            <li>Click `Add Data Source` and choose `Prometheus`.</li>
            <li>Paste the internal Kubecents Prometheus service URL.</li>
            <li>Click `Save & Test` to confirm the connection.</li>
          </ul>
          <CodeBlock label="Prometheus URL" code="http://kubecents-prometheus.kubecents.svc.cluster.local:9090" />
        </div>
      </section>

      <section id="import-dashboard" className="scroll-mt-28">
        <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
          <Activity className="text-orange-400" /> Step 5 - Import Dashboard
        </h2>
        <div className="bg-slate-900/50 border border-slate-800 rounded-xl p-6">
          <ul className="list-disc space-y-3 pl-6 text-slate-300 mb-6">
            <li>Go to <code>Dashboards -&gt; Import</code> in Grafana.</li>
            <li>Use dashboard ID `6417` for Kubernetes cluster monitoring.</li>
            <li>Select your Prometheus data source.</li>
            <li>Click `Import` to load the dashboard.</li>
          </ul>

          <div className="mt-6 p-4 bg-slate-900 rounded-lg border border-slate-800">
            <p className="text-sm text-slate-400 mb-2 font-semibold">Now you can visualize:</p>
            <div className="flex flex-wrap gap-3">
              {['CPU Usage', 'Memory Usage', 'Pod Metrics', 'Node Utilization'].map(tag => (
                <span key={tag} className="px-3 py-1 bg-cyan-900/30 text-cyan-300 text-xs rounded-full border border-cyan-500/20">{tag}</span>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section id="how-kubecents-uses-this" className="scroll-mt-28 border-t border-slate-800 pt-12">
        <h2 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
          <Search className="text-blue-400" /> How Kubecents Uses This
        </h2>
        <ul className="list-disc space-y-3 pl-6 text-slate-300 mb-8">
          <li>Kubecents uses the same Prometheus metrics for efficiency calculations.</li>
          <li>Those metrics also power optimization recommendations.</li>
          <li>Cluster health scoring is based on the same monitoring data.</li>
        </ul>
        <ul className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <li className="p-4 bg-slate-900 rounded-lg border border-slate-800 text-slate-300 text-center">Efficiency Calculations</li>
          <li className="p-4 bg-slate-900 rounded-lg border border-slate-800 text-slate-300 text-center">Optimization Recs</li>
          <li className="p-4 bg-slate-900 rounded-lg border border-slate-800 text-slate-300 text-center">Health Scoring</li>
        </ul>
        <p className="text-sm text-slate-500 italic">
          Grafana is used for <strong>advanced observability</strong>, while Kubecents focuses on <strong>cost intelligence</strong>.
        </p>
      </section>

      <section id="monitoring-troubleshooting" className="scroll-mt-28">
        <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
          <AlertCircle className="text-red-400" /> Troubleshooting
        </h2>

        <div className="space-y-6">
          <div className="p-5 bg-slate-900/50 rounded-xl border border-slate-800">
            <h3 className="font-bold text-white mb-2">Prometheus not reachable?</h3>
            <p className="text-slate-400 text-sm mb-3">Ensure the service name matches the URL.</p>
            <CodeBlock code="kubectl get svc -n kubecents" />
          </div>

          <div className="p-5 bg-slate-900/50 rounded-xl border border-slate-800">
            <h3 className="font-bold text-white mb-2">No data in Grafana?</h3>
            <p className="text-slate-400 text-sm">Wait 5-10 minutes for metrics to initially populate in Prometheus.</p>
          </div>
        </div>
      </section>

      <section id="final-stack" className="scroll-mt-28 bg-gradient-to-br from-slate-900 to-slate-950 rounded-2xl border border-slate-800 overflow-hidden">
        <div className="p-6 border-b border-slate-800">
          <h2 className="text-xl font-bold text-white">Final Stack Overview</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-900/50 text-slate-400 text-sm uppercase tracking-wider">
                <th className="p-4 font-medium border-b border-slate-800">Tool</th>
                <th className="p-4 font-medium border-b border-slate-800">Purpose</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800 text-slate-300">
              <tr>
                <td className="p-4 font-medium text-cyan-400">Kubecents</td>
                <td className="p-4">Cost and optimization insights</td>
              </tr>
              <tr>
                <td className="p-4 font-medium text-orange-400">Prometheus</td>
                <td className="p-4">Metrics storage</td>
              </tr>
              <tr>
                <td className="p-4 font-medium text-purple-400">Grafana</td>
                <td className="p-4">Visualization dashboards</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>
    </div>
  </motion.div>
);

export default DocsMonitoring;
