from fastapi import APIRouter
from app.api.v1.endpoints import security, compliance, auth

api_router = APIRouter()

api_router.include_router(auth.router, prefix="/auth", tags=["authentication"])
api_router.include_router(security.router, prefix="/security", tags=["security"])
api_router.include_router(compliance.router, prefix="/compliance", tags=["compliance"]) 