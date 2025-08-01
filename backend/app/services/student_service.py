from sqlalchemy.orm import Session
from app.models.student import Student
from app.models.parent import Parent
from app.schemas.student import StudentCreate, StudentResponse, StudentWithParent
from typing import Optional


class StudentService:
    """Service layer for Student business logic"""
    
    @staticmethod
    def create_student(db: Session, student_data: StudentCreate) -> StudentResponse:
        """Create a new student"""
        parent = db.query(Parent).filter(Parent.id == student_data.parent_id).first()
        if not parent:
            raise ValueError("Parent not found")
        
        db_student = Student(**student_data.model_dump())
        db.add(db_student)
        db.commit()
        db.refresh(db_student)
        return StudentResponse.model_validate(db_student)
    
    @staticmethod
    def get_student(db: Session, student_id: int) -> Optional[StudentResponse]:
        """Get student by ID"""
        student = db.query(Student).filter(Student.id == student_id).first()
        if student:
            return StudentResponse.model_validate(student)
        return None
    
    @staticmethod
    def get_student_with_parent(db: Session, student_id: int) -> Optional[StudentWithParent]:
        """Get student with parent information"""
        student = db.query(Student).filter(Student.id == student_id).first()
        if student:
            student_dict = StudentResponse.model_validate(student).model_dump()
            student_dict["parent"] = {
                "id": student.parent.id,
                "name": student.parent.name,
                "phone": student.parent.phone,
                "email": student.parent.email
            }
            return StudentWithParent.model_validate(student_dict)
        return None
    
    @staticmethod
    def get_all_students(db: Session) -> list[StudentResponse]:
        """Get all students"""
        students = db.query(Student).all()
        return [StudentResponse.model_validate(student) for student in students]
    
    @staticmethod
    def get_all_students_with_parents(db: Session) -> list[StudentWithParent]:
        """Get all students with parent information"""
        students = db.query(Student).all()
        result = []
        for student in students:
            student_dict = StudentResponse.model_validate(student).model_dump()
            student_dict["parent"] = {
                "id": student.parent.id,
                "name": student.parent.name,
                "phone": student.parent.phone,
                "email": student.parent.email
            }
            result.append(StudentWithParent.model_validate(student_dict))
        return result 