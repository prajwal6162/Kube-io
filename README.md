# Kubecents 🪙

> **Stop guessing your Kubernetes costs.** > The open-source cost monitoring tool for AWS EKS. Install in minutes, visualize in Grafana, and save thousands.

![Kubecents Preview](public/logo/kubecents.jpeg)

## 🚀 Overview

**Kubecents** is a cloud-native SaaS platform designed to simplify Kubernetes monitoring and cost optimization. It enables DevOps teams to gain real-time visibility into their clusters, track pod-level resource usage, and receive actionable alerts.

Built with **privacy first** in mind—your data stays in your cluster. We simply provide the visualization layer on top of your existing Prometheus and Grafana stack.

---

## ✨ Features

* **📊 Real-time Visibility:** Live cost tracking for clusters, namespaces, and pods.
* **🔌 Prometheus & Grafana Native:** Seamless integration with your existing observability stack.
* **⚡ Workload Right-Sizing:** Actionable recommendations to reclaim wasted CPU/RAM.
* **🔔 Threshold-Based Alerting:** Set budgets and get notified before you overspend.
* **🛡️ Privacy First:** No external data leaks. Your metrics stay yours.

---

## 🛠️ Tech Stack

This website is built with modern frontend technologies for high performance and easy maintenance:

* **Framework:** [React](https://react.dev/) + [Vite](https://vitejs.dev/)
* **Styling:** [Tailwind CSS](https://tailwindcss.com/)
* **Animations:** [Framer Motion](https://www.framer.com/motion/)
* **Icons:** [Lucide React](https://lucide.dev/)
* **Routing:** [React Router v6](https://reactrouter.com/)

---

## 🚀 Getting Started

Follow these instructions to set up the project locally on your machine.

### Prerequisites

* Node.js (v16 or higher)
* npm or yarn

### Installation

1.  **Clone the repository**
    ```bash
    git clone [https://github.com/yourusername/kubecents-site.git](https://github.com/yourusername/kubecents-site.git)
    cd kubecents-site
    ```

2.  **Install dependencies**
    ```bash
    npm install
    ```

3.  **Start the development server**
    ```bash
    npm run dev
    ```

4.  **Open in Browser**
    Visit `http://localhost:5173` to view the app.

---

## 📂 Project Structure

```text
src/
├── components/       # Reusable UI components (Navbar, Footer, etc.)
├── pages/            # Page views
│   ├── Home.jsx             # Landing Page
│   ├── DocsInstallation.jsx # Installation Guide
│   └── DocsMonitoring.jsx   # Grafana Setup Guide
├── App.jsx           # Main Router & Layout
└── main.jsx          # Entry point
public/
└── logo/             # Static assets like logos and favicons