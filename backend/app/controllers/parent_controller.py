from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app.database import get_db
from app.services.parent_service import ParentService
from app.schemas.parent import ParentCreate, ParentResponse
from typing import List

router = APIRouter(prefix="/api/parents", tags=["parents"])


@router.post("/", response_model=ParentResponse)
def create_parent(parent: ParentCreate, db: Session = Depends(get_db)):
    """Create a new parent"""
    try:
        return ParentService.create_parent(db, parent)
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))


@router.get("/{parent_id}", response_model=ParentResponse)
def get_parent(parent_id: int, db: Session = Depends(get_db)):
    """Get parent by ID"""
    parent = ParentService.get_parent(db, parent_id)
    if not parent:
        raise HTTPException(status_code=404, detail="Parent not found")
    return parent


@router.get("/", response_model=List[ParentResponse])
def get_all_parents(db: Session = Depends(get_db)):
    """Get all parents"""
    return ParentService.get_all_parents(db) 