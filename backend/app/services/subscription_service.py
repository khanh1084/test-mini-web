from sqlalchemy.orm import Session
from app.models.subscription import Subscription
from app.models.student import Student
from app.schemas.subscription import SubscriptionCreate, SubscriptionResponse, SubscriptionUse
from typing import Optional


class SubscriptionService:
    """Service layer for Subscription business logic"""
    
    @staticmethod
    def create_subscription(db: Session, subscription_data: SubscriptionCreate) -> SubscriptionResponse:
        """Create a new subscription"""
        # Validate student exists
        student = db.query(Student).filter(Student.id == subscription_data.student_id).first()
        if not student:
            raise ValueError("Student not found")
        
        # Validate dates
        if subscription_data.start_date >= subscription_data.end_date:
            raise ValueError("Start date must be before end date")
        
        db_subscription = Subscription(**subscription_data.model_dump())
        db.add(db_subscription)
        db.commit()
        db.refresh(db_subscription)
        return SubscriptionResponse.model_validate(db_subscription)
    
    @staticmethod
    def get_subscription(db: Session, subscription_id: int) -> Optional[SubscriptionResponse]:
        """Get subscription by ID"""
        subscription = db.query(Subscription).filter(Subscription.id == subscription_id).first()
        if subscription:
            return SubscriptionResponse.model_validate(subscription)
        return None
    
    @staticmethod
    def use_subscription_session(db: Session, subscription_id: int) -> SubscriptionResponse:
        """Use a session from subscription"""
        subscription = db.query(Subscription).filter(Subscription.id == subscription_id).first()
        if not subscription:
            raise ValueError("Subscription not found")
        
        if subscription.used_sessions >= subscription.total_sessions:
            raise ValueError("All sessions have been used")
        
        subscription.used_sessions += 1
        db.commit()
        db.refresh(subscription)
        return SubscriptionResponse.model_validate(subscription)
    
    @staticmethod
    def get_all_subscriptions(db: Session) -> list[SubscriptionResponse]:
        """Get all subscriptions"""
        subscriptions = db.query(Subscription).all()
        return [SubscriptionResponse.model_validate(subscription) for subscription in subscriptions] 