import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { securityApi } from '../api/security';
import { useToast } from '../components/ui/use-toast';

const ComplianceReport: React.FC = () => {
  const { toast } = useToast();

  const { data: alerts, isLoading, error } = useQuery({
    queryKey: ['securityAlerts'],
    queryFn: securityApi.getSecurityAlerts,
  });

  React.useEffect(() => {
    if (error) {
      toast({
        title: 'Error',
        description: 'Failed to fetch compliance data',
        variant: 'destructive',
      });
    }
  }, [error, toast]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-12">
        <h2 className="text-lg font-medium text-gray-900">Error loading data</h2>
        <p className="mt-2 text-sm text-gray-500">Please try again later</p>
      </div>
    );
  }

  return (
    <div>
      <h1 className="text-2xl font-semibold text-gray-900 mb-6">Compliance Report</h1>
      <div className="grid gap-6">
        {alerts?.map((alert) => (
          <div key={alert.id} className="bg-white p-6 rounded-lg shadow">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-medium text-gray-900">{alert.title}</h2>
              <span
                className={`px-2 py-1 rounded-full text-xs font-medium ${
                  alert.severity === 'HIGH'
                    ? 'bg-red-100 text-red-800'
                    : alert.severity === 'MEDIUM'
                    ? 'bg-yellow-100 text-yellow-800'
                    : 'bg-green-100 text-green-800'
                }`}
              >
                {alert.severity}
              </span>
            </div>
            <p className="mt-2 text-sm text-gray-600">{alert.description}</p>
            <div className="mt-4">
              <h3 className="text-sm font-medium text-gray-900">Recommendation</h3>
              <p className="mt-1 text-sm text-gray-600">{alert.recommendation}</p>
            </div>
            <div className="mt-4 flex items-center justify-between text-sm text-gray-500">
              <span>Resource: {alert.resource_type}</span>
              <span>Created: {new Date(alert.created_at).toLocaleDateString()}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ComplianceReport; 