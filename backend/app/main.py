from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.database import engine, Base
from app.models import Parent, Student, Class, ClassRegistration, Subscription
from app.controllers import parent_router, student_router, class_router, subscription_router

# Create database tables
Base.metadata.create_all(bind=engine)

app = FastAPI(
    title="Student Management API", 
    version="1.0.0",
    redirect_slashes=False
)

# CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000", "http://frontend:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include routers
app.include_router(parent_router)
app.include_router(student_router)
app.include_router(class_router)
app.include_router(subscription_router)


@app.get("/")
def read_root():
    return {"message": "Student Management API", "version": "1.0.0"}


@app.get("/health")
def health_check():
    return {"status": "healthy"} 