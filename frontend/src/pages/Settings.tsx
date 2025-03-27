import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { securityApi } from '../api/security';
import { Card, CardHeader, CardTitle, CardContent } from '../components/ui/card';
import { useToast } from '../components/ui/use-toast';

const Settings: React.FC = () => {
  const { toast } = useToast();
  const [isScanning, setIsScanning] = useState(false);

  const { data: securityScore, refetch: refetchScore } = useQuery({
    queryKey: ['securityScore'],
    queryFn: securityApi.getSecurityScore,
    onError: () => {
      toast({
        title: 'Error',
        description: 'Failed to fetch security score',
        variant: 'destructive',
      });
    },
  });

  const handleScan = async () => {
    try {
      setIsScanning(true);
      await securityApi.getSecurityScan();
      await refetchScore();
      toast({
        title: 'Success',
        description: 'Security scan completed successfully',
      });
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to complete security scan',
        variant: 'destructive',
      });
    } finally {
      setIsScanning(false);
    }
  };

  return (
    <div>
      <h1 className="text-2xl font-semibold text-gray-900 mb-6">Settings</h1>

      <div className="grid gap-6">
        {/* Security Score Card */}
        <Card>
          <CardHeader>
            <CardTitle>Security Score</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-3xl font-bold text-gray-900">{securityScore}%</p>
                <p className="text-sm text-gray-500">Current security score</p>
              </div>
              <button
                onClick={handleScan}
                disabled={isScanning}
                className={`px-4 py-2 rounded-md text-white ${
                  isScanning
                    ? 'bg-gray-400 cursor-not-allowed'
                    : 'bg-blue-600 hover:bg-blue-700'
                }`}
              >
                {isScanning ? 'Scanning...' : 'Run Security Scan'}
              </button>
            </div>
          </CardContent>
        </Card>

        {/* AWS Configuration Card */}
        <Card>
          <CardHeader>
            <CardTitle>AWS Configuration</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  AWS Region
                </label>
                <input
                  type="text"
                  defaultValue="us-east-1"
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                  disabled
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Security Hub Integration
                </label>
                <div className="mt-1">
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                    Active
                  </span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Notification Settings Card */}
        <Card>
          <CardHeader>
            <CardTitle>Notification Settings</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <label className="text-sm font-medium text-gray-700">
                    Email Notifications
                  </label>
                  <p className="text-sm text-gray-500">
                    Receive alerts via email
                  </p>
                </div>
                <button
                  type="button"
                  className="relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent bg-gray-200 transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                >
                  <span className="sr-only">Use setting</span>
                  <span
                    className="pointer-events-none relative inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out"
                  />
                </button>
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <label className="text-sm font-medium text-gray-700">
                    Slack Notifications
                  </label>
                  <p className="text-sm text-gray-500">
                    Receive alerts via Slack
                  </p>
                </div>
                <button
                  type="button"
                  className="relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent bg-gray-200 transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                >
                  <span className="sr-only">Use setting</span>
                  <span
                    className="pointer-events-none relative inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out"
                  />
                </button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Settings; 