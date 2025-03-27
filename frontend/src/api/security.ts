import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:8000/api/v1';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add token to requests if it exists
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export interface SecurityScanResult {
  resource_id: string;
  resource_type: string;
  severity: string;
  finding: string;
  recommendation: string;
  status: string;
  last_updated: string;
}

export interface SecurityAlert {
  id: string;
  title: string;
  description: string;
  severity: string;
  resource_id: string;
  resource_type: string;
  created_at: string;
  status: string;
  recommendation?: string;
}

export const securityApi = {
  // Get security scan results
  getSecurityScan: async (): Promise<SecurityScanResult[]> => {
    const response = await api.get('/security/scan');
    return response.data;
  },

  // Get security alerts
  getSecurityAlerts: async (): Promise<SecurityAlert[]> => {
    const response = await api.get('/security/alerts');
    return response.data;
  },

  // Get security score
  getSecurityScore: async (): Promise<number> => {
    const response = await api.get('/security/score');
    return response.data.score;
  },

  // Login
  login: async (username: string, password: string): Promise<{ access_token: string }> => {
    const formData = new FormData();
    formData.append('username', username);
    formData.append('password', password);
    
    const response = await api.post('/auth/token', formData);
    return response.data;
  },
}; 