from sqlalchemy.orm import Session
from app.models.parent import Parent
from app.schemas.parent import ParentCreate, ParentResponse
from typing import Optional


class ParentService:
    """Service layer for Parent business logic"""
    
    @staticmethod
    def create_parent(db: Session, parent_data: ParentCreate) -> ParentResponse:
        """Create a new parent"""
        db_parent = Parent(**parent_data.model_dump())
        db.add(db_parent)
        db.commit()
        db.refresh(db_parent)
        return ParentResponse.model_validate(db_parent)
    
    @staticmethod
    def get_parent(db: Session, parent_id: int) -> Optional[ParentResponse]:
        """Get parent by ID"""
        parent = db.query(Parent).filter(Parent.id == parent_id).first()
        if parent:
            return ParentResponse.model_validate(parent)
        return None
    
    @staticmethod
    def get_all_parents(db: Session) -> list[ParentResponse]:
        """Get all parents"""
        parents = db.query(Parent).all()
        return [ParentResponse.model_validate(parent) for parent in parents] 