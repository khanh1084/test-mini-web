from sqlalchemy.orm import Session
from app.models.class_model import Class
from app.models.class_registration import ClassRegistration
from app.models.student import Student
from app.schemas.class_schema import ClassCreate, ClassResponse, ClassWithRegistrations
from typing import Optional, List


class ClassService:
    """Service layer for Class business logic"""
    
    @staticmethod
    def create_class(db: Session, class_data: ClassCreate) -> ClassResponse:
        """Create a new class"""
        db_class = Class(**class_data.model_dump())
        db.add(db_class)
        db.commit()
        db.refresh(db_class)
        return ClassResponse.model_validate(db_class)
    
    @staticmethod
    def get_class(db: Session, class_id: int) -> Optional[ClassResponse]:
        """Get class by ID"""
        class_obj = db.query(Class).filter(Class.id == class_id).first()
        if class_obj:
            return ClassResponse.model_validate(class_obj)
        return None
    
    @staticmethod
    def get_classes_by_day(db: Session, day: str) -> List[ClassResponse]:
        """Get classes by day of week"""
        classes = db.query(Class).filter(Class.day_of_week == day).all()
        result = []
        for class_obj in classes:
            current_students = db.query(ClassRegistration).filter(
                ClassRegistration.class_id == class_obj.id
            ).count()
            
            class_dict = {
                "id": class_obj.id,
                "name": class_obj.name,
                "subject": class_obj.subject,
                "day_of_week": class_obj.day_of_week,
                "time_slot": class_obj.time_slot,
                "teacher_name": class_obj.teacher_name,
                "max_students": class_obj.max_students,
                "current_students": current_students,  
                "created_at": class_obj.created_at,
                "updated_at": class_obj.updated_at
            }
            result.append(ClassResponse.model_validate(class_dict))
        return result
    
    @staticmethod
    def get_all_classes(db: Session) -> List[ClassResponse]:
        """Get all classes"""
        classes = db.query(Class).all()
        result = []
        for class_obj in classes:
            current_students = db.query(ClassRegistration).filter(
                ClassRegistration.class_id == class_obj.id
            ).count()
            
            class_dict = {
                "id": class_obj.id,
                "name": class_obj.name,
                "subject": class_obj.subject,
                "day_of_week": class_obj.day_of_week,
                "time_slot": class_obj.time_slot,
                "teacher_name": class_obj.teacher_name,
                "max_students": class_obj.max_students,
                "current_students": current_students,  
                "created_at": class_obj.created_at,
                "updated_at": class_obj.updated_at
            }
            result.append(ClassResponse.model_validate(class_dict))
        return result
    
    @staticmethod
    def register_student_to_class(db: Session, class_id: int, student_id: int) -> dict:
        """Register a student to a class with validation"""
        # Check if class exists
        class_obj = db.query(Class).filter(Class.id == class_id).first()
        if not class_obj:
            raise ValueError("Class not found")
        
        # Check if student exists
        student = db.query(Student).filter(Student.id == student_id).first()
        if not student:
            raise ValueError("Student not found")
        
        # Check if student is already registered
        existing_registration = db.query(ClassRegistration).filter(
            ClassRegistration.class_id == class_id,
            ClassRegistration.student_id == student_id
        ).first()
        
        if existing_registration:
            raise ValueError("Student is already registered for this class")
        
        # Check class capacity
        current_registrations = db.query(ClassRegistration).filter(
            ClassRegistration.class_id == class_id
        ).count()
        
        if current_registrations >= class_obj.max_students:
            raise ValueError("Class is at maximum capacity")
        
        # Check for time conflicts
        student_classes = db.query(Class).join(ClassRegistration).filter(
            ClassRegistration.student_id == student_id
        ).all()
        
        for student_class in student_classes:
            if (student_class.day_of_week == class_obj.day_of_week and 
                student_class.time_slot == class_obj.time_slot):
                raise ValueError("Student has another class at the same time")
        
        # Register student
        registration = ClassRegistration(class_id=class_id, student_id=student_id)
        db.add(registration)
        db.commit()
        db.refresh(registration)
        
        return {
            "message": "Student registered successfully",
            "registration_id": registration.id,
            "class_id": class_id,
            "student_id": student_id
        }
    
    @staticmethod
    def get_class_with_registrations(db: Session, class_id: int) -> Optional[ClassWithRegistrations]:
        """Get class with registration information"""
        class_obj = db.query(Class).filter(Class.id == class_id).first()
        if class_obj:
            class_dict = ClassResponse.model_validate(class_obj).model_dump()
            registrations = db.query(ClassRegistration).filter(
                ClassRegistration.class_id == class_id
            ).all()
            
            class_dict["registrations"] = [
                {
                    "id": reg.id,
                    "student_id": reg.student_id,
                    "created_at": reg.created_at
                }
                for reg in registrations
            ]
            
            return ClassWithRegistrations.model_validate(class_dict)
        return None 
    
    @staticmethod
    def get_total_registrations(db: Session) -> int:
        """Get the total number of registrations"""
        return db.query(ClassRegistration).count()