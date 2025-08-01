from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app.database import get_db
from app.services.student_service import StudentService
from app.schemas.student import StudentCreate, StudentResponse, StudentWithParent
from typing import List

router = APIRouter(prefix="/api/students", tags=["students"])


@router.post("/", response_model=StudentResponse)
@router.post("", response_model=StudentResponse)
def create_student(student: StudentCreate, db: Session = Depends(get_db)):
    """Create a new student"""
    try:
        return StudentService.create_student(db, student)
    except ValueError as e:
        raise HTTPException(status_code=400, detail=str(e))
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


@router.get("/{student_id}", response_model=StudentWithParent)
def get_student(student_id: int, db: Session = Depends(get_db)):
    """Get student by ID with parent information"""
    student = StudentService.get_student_with_parent(db, student_id)
    if not student:
        raise HTTPException(status_code=404, detail="Student not found")
    return student


@router.get("/", response_model=List[StudentWithParent])
@router.get("", response_model=List[StudentWithParent])
def get_all_students(db: Session = Depends(get_db)):
    """Get all students with parent information"""
    return StudentService.get_all_students_with_parents(db) 