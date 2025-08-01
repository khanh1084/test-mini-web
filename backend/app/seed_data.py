from sqlalchemy.orm import Session
from app.database import SessionLocal, engine, Base
from app.models import Parent, Student, Class, ClassRegistration, Subscription
from datetime import date, datetime
import logging

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)


def seed_data():
    """Seed the database with initial data"""
    # Create all tables first
    logger.info("Creating database tables...")
    Base.metadata.create_all(bind=engine)
    
    db = SessionLocal()
    try:
        # Check if data already exists
        existing_parents = db.query(Parent).count()
        if existing_parents > 0:
            logger.info("Data already seeded, skipping...")
            return

        logger.info("Seeding database with initial data...")

        # Create parents
        parent1 = Parent(name="Nguyễn Văn A", phone="0123456789", email="nguyenvana@email.com")
        parent2 = Parent(name="Trần Thị B", phone="0987654321", email="tranthib@email.com")
        
        db.add(parent1)
        db.add(parent2)
        db.commit()
        db.refresh(parent1)
        db.refresh(parent2)

        # Create students
        student1 = Student(
            name="Nguyễn Văn C", 
            dob=date(2010, 5, 15), 
            gender="Male", 
            current_grade="Grade 5", 
            parent_id=parent1.id
        )
        student2 = Student(
            name="Nguyễn Thị D", 
            dob=date(2012, 8, 20), 
            gender="Female", 
            current_grade="Grade 3", 
            parent_id=parent1.id
        )
        student3 = Student(
            name="Trần Văn E", 
            dob=date(2011, 3, 10), 
            gender="Male", 
            current_grade="Grade 4", 
            parent_id=parent2.id
        )

        db.add(student1)
        db.add(student2)
        db.add(student3)
        db.commit()
        db.refresh(student1)
        db.refresh(student2)
        db.refresh(student3)

        # Create classes
        class1 = Class(
            name="Math Advanced", 
            subject="Mathematics", 
            day_of_week="Monday", 
            time_slot="14:00-15:30", 
            teacher_name="Ms. Smith", 
            max_students=15
        )
        class2 = Class(
            name="English Conversation", 
            subject="English", 
            day_of_week="Wednesday", 
            time_slot="16:00-17:30", 
            teacher_name="Mr. Johnson", 
            max_students=12
        )
        class3 = Class(
            name="Science Lab", 
            subject="Science", 
            day_of_week="Friday", 
            time_slot="15:00-16:30", 
            teacher_name="Dr. Brown", 
            max_students=10
        )

        db.add(class1)
        db.add(class2)
        db.add(class3)
        db.commit()
        db.refresh(class1)
        db.refresh(class2)
        db.refresh(class3)

        # Create subscriptions
        subscription1 = Subscription(
            student_id=student1.id,
            package_name="Basic Package",
            start_date=date(2024, 1, 1),
            end_date=date(2024, 12, 31),
            total_sessions=20,
            used_sessions=5
        )
        subscription2 = Subscription(
            student_id=student2.id,
            package_name="Premium Package",
            start_date=date(2024, 1, 1),
            end_date=date(2024, 12, 31),
            total_sessions=30,
            used_sessions=8
        )
        subscription3 = Subscription(
            student_id=student3.id,
            package_name="Standard Package",
            start_date=date(2024, 1, 1),
            end_date=date(2024, 12, 31),
            total_sessions=25,
            used_sessions=12
        )

        db.add(subscription1)
        db.add(subscription2)
        db.add(subscription3)
        db.commit()

        # Register students to classes
        registration1 = ClassRegistration(class_id=class1.id, student_id=student1.id)
        registration2 = ClassRegistration(class_id=class1.id, student_id=student2.id)
        registration3 = ClassRegistration(class_id=class2.id, student_id=student1.id)
        registration4 = ClassRegistration(class_id=class3.id, student_id=student3.id)

        db.add(registration1)
        db.add(registration2)
        db.add(registration3)
        db.add(registration4)
        db.commit()

        logger.info("Database seeded successfully!")

    except Exception as e:
        logger.error(f"Error seeding database: {e}")
        db.rollback()
        raise
    finally:
        db.close()


if __name__ == "__main__":
    seed_data() 