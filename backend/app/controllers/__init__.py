from .parent_controller import router as parent_router
from .student_controller import router as student_router
from .class_controller import router as class_router
from .subscription_controller import router as subscription_router

__all__ = [
    "parent_router",
    "student_router",
    "class_router", 
    "subscription_router"
] 