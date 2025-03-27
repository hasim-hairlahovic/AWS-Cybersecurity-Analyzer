from pydantic import BaseModel
from typing import List, Optional
from datetime import datetime

class SecurityScanResult(BaseModel):
    resource_id: str
    resource_type: str
    severity: str
    finding: str
    recommendation: str
    status: str
    last_updated: datetime

class SecurityAlert(BaseModel):
    id: str
    title: str
    description: str
    severity: str
    resource_id: str
    resource_type: str
    created_at: datetime
    status: str
    recommendation: Optional[str] = None 