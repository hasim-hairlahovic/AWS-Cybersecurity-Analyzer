import React from 'react';

const Dashboard: React.FC = () => {
  return (
    <div>
      <h1 className="text-2xl font-semibold text-gray-900 mb-6">Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-lg font-medium text-gray-900 mb-2">Security Score</h2>
          <p className="text-3xl font-bold text-blue-600">85%</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-lg font-medium text-gray-900 mb-2">Active Alerts</h2>
          <p className="text-3xl font-bold text-red-600">3</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-lg font-medium text-gray-900 mb-2">Resources Scanned</h2>
          <p className="text-3xl font-bold text-green-600">24</p>
        </div>
      </div>
    </div>
  );
};

export default Dashboard; 