from typing import List
import boto3
from datetime import datetime
from app.core.config import settings
from app.schemas.security import SecurityScanResult, SecurityAlert

class AWSSecurityService:
    def __init__(self):
        self.session = boto3.Session(
            aws_access_key_id=settings.AWS_ACCESS_KEY_ID,
            aws_secret_access_key=settings.AWS_SECRET_ACCESS_KEY,
            region_name=settings.AWS_DEFAULT_REGION
        )
        self.security_hub = self.session.client('securityhub')
        self.config = self.session.client('config')
        self.iam = self.session.client('iam')

    async def scan_security(self) -> List[SecurityScanResult]:
        """
        Perform a security scan of AWS resources
        """
        results = []
        
        # Scan IAM policies
        try:
            paginator = self.iam.get_paginator('list_policies')
            for page in paginator.paginate(Scope='Local'):
                for policy in page['Policies']:
                    # Check for overly permissive policies
                    if self._is_policy_overly_permissive(policy):
                        results.append(SecurityScanResult(
                            resource_id=policy['PolicyId'],
                            resource_type='IAM_POLICY',
                            severity='HIGH',
                            finding='Overly permissive IAM policy detected',
                            recommendation='Review and restrict policy permissions',
                            status='OPEN',
                            last_updated=datetime.utcnow()
                        ))
        except Exception as e:
            print(f"Error scanning IAM policies: {str(e)}")

        # Get Security Hub findings
        try:
            security_hub_findings = self.security_hub.get_findings(
                Filters={
                    'SeverityLabel': [
                        {'Value': 'CRITICAL'},
                        {'Value': 'HIGH'}
                    ]
                }
            )
            
            for finding in security_hub_findings.get('Findings', []):
                results.append(SecurityScanResult(
                    resource_id=finding.get('Id', ''),
                    resource_type=finding.get('ProductName', ''),
                    severity=finding.get('Severity', {}).get('Label', ''),
                    finding=finding.get('Title', ''),
                    recommendation=finding.get('Remediation', {}).get('Recommendation', {}).get('Text', ''),
                    status='OPEN',
                    last_updated=datetime.utcnow()
                ))
        except Exception as e:
            print(f"Error getting Security Hub findings: {str(e)}")

        return results

    async def get_security_alerts(self) -> List[SecurityAlert]:
        """
        Get current security alerts
        """
        alerts = []
        
        try:
            # Get Security Hub findings as alerts
            security_hub_findings = self.security_hub.get_findings(
                Filters={
                    'SeverityLabel': [
                        {'Value': 'CRITICAL'},
                        {'Value': 'HIGH'}
                    ]
                }
            )
            
            for finding in security_hub_findings.get('Findings', []):
                alerts.append(SecurityAlert(
                    id=finding.get('Id', ''),
                    title=finding.get('Title', ''),
                    description=finding.get('Description', ''),
                    severity=finding.get('Severity', {}).get('Label', ''),
                    resource_id=finding.get('Resources', [{}])[0].get('Id', ''),
                    resource_type=finding.get('ProductName', ''),
                    created_at=datetime.utcnow(),
                    status='OPEN',
                    recommendation=finding.get('Remediation', {}).get('Recommendation', {}).get('Text', '')
                ))
        except Exception as e:
            print(f"Error getting security alerts: {str(e)}")

        return alerts

    async def calculate_security_score(self) -> float:
        """
        Calculate overall security score
        """
        try:
            # Get total number of findings
            total_findings = len(await self.get_security_alerts())
            
            # Calculate score (100 - (number of findings * 5))
            # Each finding reduces score by 5 points
            score = max(0, 100 - (total_findings * 5))
            
            return score
        except Exception as e:
            print(f"Error calculating security score: {str(e)}")
            return 0.0

    def _is_policy_overly_permissive(self, policy) -> bool:
        """
        Check if an IAM policy is overly permissive
        """
        try:
            policy_version = self.iam.get_policy_version(
                PolicyArn=policy['Arn'],
                VersionId=policy['DefaultVersionId']
            )
            
            # Check for wildcard permissions
            for statement in policy_version['PolicyVersion']['Document']['Statement']:
                if statement.get('Effect') == 'Allow':
                    if statement.get('Action') == '*' or statement.get('Resource') == '*':
                        return True
            return False
        except Exception as e:
            print(f"Error checking policy permissions: {str(e)}")
            return False 