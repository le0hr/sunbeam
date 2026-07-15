from fastapi import APIRouter

internal_router = APIRouter(prefix="/internal")
api_router = APIRouter(prefix="/api")