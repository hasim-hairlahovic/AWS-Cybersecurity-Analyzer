import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import SecurityScan from './pages/SecurityScan';
import ComplianceReport from './pages/ComplianceReport';
import Settings from './pages/Settings';
import Layout from './components/Layout';

const App: React.FC = () => {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/security-scan" element={<SecurityScan />} />
        <Route path="/compliance-report" element={<ComplianceReport />} />
        <Route path="/settings" element={<Settings />} />
      </Routes>
    </Layout>
  );
};

export default App; 