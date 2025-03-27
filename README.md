# AWS Cybersecurity Analyzer

A web-based application designed to assess and enhance the security posture of AWS resources while ensuring compliance with the NIST Cybersecurity Framework (CSF) 2.0.

## Features

- AWS Security Posture Assessment
- NIST CSF 2.0 Compliance Mapping
- AI-Powered Security Analysis
- Real-time Monitoring and Alerts
- Compliance Reporting
- User Role Management

## Tech Stack

- Frontend: React.js + TypeScript
- Backend: Python FastAPI
- Database: PostgreSQL
- AI Layer: LangChain + Claude 3.7
- Containerization: Docker + Docker Compose
- AWS Integration: Boto3 SDK

## Getting Started

### Prerequisites

- Docker and Docker Compose
- AWS Account with appropriate permissions
- Claude API key

### Environment Setup

1. Clone the repository
2. Copy `.env.example` to `.env` and fill in your credentials
3. Run `docker-compose up -d`

### Development

- Frontend: `http://localhost:3000`
- Backend API: `http://localhost:8000`
- API Documentation: `http://localhost:8000/docs`

## Project Structure

```
.
├── frontend/           # React frontend application
├── backend/           # FastAPI backend application
├── docker/            # Docker configuration files
├── tests/             # Test files
└── docs/              # Documentation
```

## Contributing

Please read CONTRIBUTING.md for details on our code of conduct and the process for submitting pull requests.

## License

This project is licensed under the MIT License - see the LICENSE file for details.
