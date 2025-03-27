import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { securityApi, SecurityScanResult } from '../api/security';
import { Card, CardHeader, CardTitle, CardContent } from '../components/ui/card';
import { useToast } from '../components/ui/use-toast';

const SecurityScan: React.FC = () => {
  const { toast } = useToast();
  const { data: scanResults, isLoading, error } = useQuery<SecurityScanResult[]>({
    queryKey: ['securityScan'],
    queryFn: securityApi.getSecurityScan,
    onError: () => {
      toast({
        title: 'Error',
        description: 'Failed to fetch security scan results',
        variant: 'destructive',
      });
    },
  });

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center text-red-600">
        Error loading security scan results
      </div>
    );
  }

  return (
    <div>
      <h1 className="text-2xl font-semibold text-gray-900 mb-6">Security Scan Results</h1>
      
      <div className="grid gap-6">
        {scanResults?.map((result) => (
          <Card key={result.resource_id}>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <span>{result.resource_type}</span>
                <span className={`px-2 py-1 rounded-full text-sm ${
                  result.severity === 'HIGH' ? 'bg-red-100 text-red-800' :
                  result.severity === 'MEDIUM' ? 'bg-yellow-100 text-yellow-800' :
                  'bg-green-100 text-green-800'
                }`}>
                  {result.severity}
                </span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <h3 className="font-medium text-gray-900">Finding</h3>
                  <p className="mt-1 text-gray-600">{result.finding}</p>
                </div>
                <div>
                  <h3 className="font-medium text-gray-900">Recommendation</h3>
                  <p className="mt-1 text-gray-600">{result.recommendation}</p>
                </div>
                <div className="flex justify-between text-sm text-gray-500">
                  <span>Resource ID: {result.resource_id}</span>
                  <span>Last Updated: {new Date(result.last_updated).toLocaleString()}</span>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default SecurityScan; 