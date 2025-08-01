from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app.database import get_db
from app.services.subscription_service import SubscriptionService
from app.schemas.subscription import SubscriptionCreate, SubscriptionResponse, SubscriptionUse
from typing import List

router = APIRouter(prefix="/api/subscriptions", tags=["subscriptions"])


@router.post("/", response_model=SubscriptionResponse)
def create_subscription(subscription: SubscriptionCreate, db: Session = Depends(get_db)):
    """Create a new subscription"""
    try:
        return SubscriptionService.create_subscription(db, subscription)
    except ValueError as e:
        raise HTTPException(status_code=400, detail=str(e))
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


@router.get("/{subscription_id}", response_model=SubscriptionResponse)
def get_subscription(subscription_id: int, db: Session = Depends(get_db)):
    """Get subscription by ID"""
    subscription = SubscriptionService.get_subscription(db, subscription_id)
    if not subscription:
        raise HTTPException(status_code=404, detail="Subscription not found")
    return subscription


@router.patch("/{subscription_id}/use", response_model=SubscriptionResponse)
def use_subscription_session(subscription_id: int, db: Session = Depends(get_db)):
    """Use a session from subscription"""
    try:
        return SubscriptionService.use_subscription_session(db, subscription_id)
    except ValueError as e:
        raise HTTPException(status_code=400, detail=str(e))
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


@router.get("/", response_model=List[SubscriptionResponse])
def get_all_subscriptions(db: Session = Depends(get_db)):
    """Get all subscriptions"""
    return SubscriptionService.get_all_subscriptions(db) 