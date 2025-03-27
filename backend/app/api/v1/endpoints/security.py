from fastapi import APIRouter, Depends, HTTPException
from typing import List
from app.schemas.security import SecurityScanResult, SecurityAlert
from app.services.aws import AWSSecurityService
from app.core.auth import get_current_user

router = APIRouter()

@router.get("/scan", response_model=List[SecurityScanResult])
async def scan_security(
    current_user = Depends(get_current_user),
    aws_service: AWSSecurityService = Depends()
):
    """
    Perform a security scan of AWS resources
    """
    try:
        results = await aws_service.scan_security()
        return results
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@router.get("/alerts", response_model=List[SecurityAlert])
async def get_security_alerts(
    current_user = Depends(get_current_user),
    aws_service: AWSSecurityService = Depends()
):
    """
    Get current security alerts
    """
    try:
        alerts = await aws_service.get_security_alerts()
        return alerts
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@router.get("/score")
async def get_security_score(
    current_user = Depends(get_current_user),
    aws_service: AWSSecurityService = Depends()
):
    """
    Get overall security score
    """
    try:
        score = await aws_service.calculate_security_score()
        return {"score": score}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e)) 