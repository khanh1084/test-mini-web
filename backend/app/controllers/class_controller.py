from fastapi import APIRouter, Depends, HTTPException, Query
from sqlalchemy.orm import Session
from app.database import get_db
from app.services.class_service import ClassService
from app.schemas.class_schema import ClassCreate, ClassResponse, ClassWithRegistrations
from typing import List

router = APIRouter(prefix="/api/classes", tags=["classes"])


@router.post("/", response_model=ClassResponse)
def create_class(class_data: ClassCreate, db: Session = Depends(get_db)):
    """Create a new class"""
    try:
        return ClassService.create_class(db, class_data)
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))


@router.get("/", response_model=List[ClassResponse])
def get_classes(day: str = Query(None, description="Filter by day of week"), 
                db: Session = Depends(get_db)):
    """Get classes, optionally filtered by day"""
    if day:
        return ClassService.get_classes_by_day(db, day)
    return ClassService.get_all_classes(db)


@router.get("/{class_id}", response_model=ClassWithRegistrations)
def get_class(class_id: int, db: Session = Depends(get_db)):
    """Get class by ID with registrations"""
    class_obj = ClassService.get_class_with_registrations(db, class_id)
    if not class_obj:
        raise HTTPException(status_code=404, detail="Class not found")
    return class_obj


@router.post("/{class_id}/register")
def register_student_to_class(class_id: int, student_id: int, db: Session = Depends(get_db)):
    """Register a student to a class"""
    try:
        result = ClassService.register_student_to_class(db, class_id, student_id)
        return result
    except ValueError as e:
        raise HTTPException(status_code=400, detail=str(e))
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e)) 