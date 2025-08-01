# Student-Parent Management System

A mini web application for managing student-parent information, class scheduling, and subscription management.

## 🏗️ Architecture

This project follows the **MVC (Model-View-Controller)** pattern:

### **Model (M) - Data & Business Logic:**

- `app/models/` - Database models (SQLAlchemy ORM)
- `app/services/` - Business logic layer
- `app/database.py` - Database configuration

### **View (V) - Presentation:**

- Frontend React components
- API JSON responses
- No business logic in presentation layer

### **Controller (C) - Request Handling:**

- `app/controllers/` - API endpoints (FastAPI routes)
- Receives requests, calls services, returns responses
- Handles HTTP status codes and error responses

## 🚀 Technology Stack

### Backend

- **Python 3.13+** with FastAPI
- **SQLAlchemy 2.0** for ORM
- **PostgreSQL** database
- **Pydantic** for data validation
- **Uvicorn** ASGI server

### Frontend

- **React 18** with Vite
- **Axios** for API calls
- **React Router DOM** for navigation
- **date-fns** for date handling

### DevOps

- **Docker & Docker Compose**
- **Multi-stage builds**
- **Health checks**
- **Environment-based configuration**

## 📁 Project Structure

```
test-mini-web/
├── backend/
│   ├── app/
│   │   ├── models/           # Database models (M)
│   │   │   ├── parent.py
│   │   │   ├── student.py
│   │   │   ├── class_model.py
│   │   │   ├── class_registration.py
│   │   │   └── subscription.py
│   │   ├── schemas/          # Pydantic schemas
│   │   │   ├── parent.py
│   │   │   ├── student.py
│   │   │   ├── class_schema.py
│   │   │   └── subscription.py
│   │   ├── services/         # Business logic (M)
│   │   │   ├── parent_service.py
│   │   │   ├── student_service.py
│   │   │   ├── class_service.py
│   │   │   └── subscription_service.py
│   │   ├── controllers/      # API endpoints (C)
│   │   │   ├── parent_controller.py
│   │   │   ├── student_controller.py
│   │   │   ├── class_controller.py
│   │   │   └── subscription_controller.py
│   │   ├── database.py       # Database configuration
│   │   ├── main.py          # FastAPI app setup
│   │   └── seed_data.py     # Initial data seeding
│   ├── main.py              # Entry point
│   ├── run_seed.py          # Seed script runner
│   ├── requirements.txt      # Python dependencies
│   └── Dockerfile           # Backend container
├── frontend/
│   ├── src/
│   │   ├── components/      # React components (V)
│   │   │   ├── ParentForm.jsx
│   │   │   ├── StudentForm.jsx
│   │   │   ├── ClassSchedule.jsx
│   │   │   ├── ClassRegistration.jsx
│   │   │   └── SubscriptionManagement.jsx
│   │   ├── App.jsx         # Main app component
│   │   └── main.jsx        # Entry point
│   ├── package.json         # Node dependencies
│   ├── vite.config.js       # Vite configuration
│   └── Dockerfile           # Frontend container
├── docker-compose.yml       # Multi-service orchestration
├── README.md               # This file
└── .gitignore             # Git ignore rules
```

## 🗄️ Database Schema

### Parents Table

```sql
CREATE TABLE parents (
    id SERIAL PRIMARY KEY,
    name VARCHAR NOT NULL,
    phone VARCHAR NOT NULL,
    email VARCHAR NOT NULL,
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP
);
```

### Students Table

```sql
CREATE TABLE students (
    id SERIAL PRIMARY KEY,
    name VARCHAR NOT NULL,
    dob DATE NOT NULL,
    gender VARCHAR NOT NULL,
    current_grade VARCHAR NOT NULL,
    parent_id INTEGER REFERENCES parents(id),
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP
);
```

### Classes Table

```sql
CREATE TABLE classes (
    id SERIAL PRIMARY KEY,
    name VARCHAR NOT NULL,
    subject VARCHAR NOT NULL,
    day_of_week VARCHAR NOT NULL,
    time_slot VARCHAR NOT NULL,
    teacher_name VARCHAR NOT NULL,
    max_students INTEGER NOT NULL,
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP
);
```

### ClassRegistrations Table

```sql
CREATE TABLE class_registrations (
    id SERIAL PRIMARY KEY,
    class_id INTEGER REFERENCES classes(id),
    student_id INTEGER REFERENCES students(id),
    created_at TIMESTAMP DEFAULT NOW()
);
```

### Subscriptions Table

```sql
CREATE TABLE subscriptions (
    id SERIAL PRIMARY KEY,
    student_id INTEGER REFERENCES students(id),
    package_name VARCHAR NOT NULL,
    start_date DATE NOT NULL,
    end_date DATE NOT NULL,
    total_sessions INTEGER NOT NULL,
    used_sessions INTEGER DEFAULT 0,
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP
);
```

## 🔌 API Endpoints

### Parents

- `POST /api/parents` - Create new parent
- `GET /api/parents/{id}` - Get parent by ID
- `GET /api/parents` - Get all parents

### Students

- `POST /api/students` - Create new student
- `GET /api/students/{id}` - Get student with parent info
- `GET /api/students` - Get all students

### Classes

- `POST /api/classes` - Create new class
- `GET /api/classes?day={weekday}` - Get classes by day
- `GET /api/classes/{id}` - Get class with registrations
- `POST /api/classes/{id}/register` - Register student to class

### Subscriptions

- `POST /api/subscriptions` - Create new subscription
- `GET /api/subscriptions/{id}` - Get subscription details
- `PATCH /api/subscriptions/{id}/use` - Use a session
- `GET /api/subscriptions` - Get all subscriptions

## 🚀 Quick Start

### Prerequisites

- Docker & Docker Compose
- Git

### 1. Clone and Setup

```bash
git clone <repository-url>
cd test-mini-web
```

### 2. Run with Docker Compose

```bash
docker-compose up --build
```

### 3. Access Applications

- **Frontend**: http://localhost:3000
- **Backend API**: http://localhost:8000
- **API Documentation**: http://localhost:8000/docs
- **Database**: PostgreSQL on localhost:5432

### 4. Test API Endpoints

#### Create a Parent

```bash
curl -X POST "http://localhost:8000/api/parents" \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Nguyễn Văn A",
    "phone": "0123456789",
    "email": "nguyenvana@email.com"
  }'
```

#### Create a Student

```bash
curl -X POST "http://localhost:8000/api/students" \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Nguyễn Văn C",
    "dob": "2010-05-15",
    "gender": "Male",
    "current_grade": "Grade 5",
    "parent_id": 1
  }'
```

#### Create a Class

```bash
curl -X POST "http://localhost:8000/api/classes" \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Math Advanced",
    "subject": "Mathematics",
    "day_of_week": "Monday",
    "time_slot": "14:00-15:30",
    "teacher_name": "Ms. Smith",
    "max_students": 15
  }'
```

#### Register Student to Class

```bash
curl -X POST "http://localhost:8000/api/classes/1/register?student_id=1"
```

#### Create Subscription

```bash
curl -X POST "http://localhost:8000/api/subscriptions" \
  -H "Content-Type: application/json" \
  -d '{
    "student_id": 1,
    "package_name": "Basic Package",
    "start_date": "2024-01-01",
    "end_date": "2024-12-31",
    "total_sessions": 20
  }'
```

#### Use Subscription Session

```bash
curl -X PATCH "http://localhost:8000/api/subscriptions/1/use"
```

## 🔧 Development

### Backend Development

```bash
cd backend
pip install -r requirements.txt
python main.py
```

### Frontend Development

```bash
cd frontend
npm install
npm run dev
```

### Database Migrations

The application uses SQLAlchemy's `create_all()` for simplicity. For production, consider using Alembic for migrations.

## 🧪 Testing

### API Testing

- Use the interactive API docs at http://localhost:8000/docs
- Import the provided Postman collection: `Student_Management_API.postman_collection.json`

### Manual Testing

1. Open http://localhost:3000
2. Create parents and students
3. Create classes and register students
4. Manage subscriptions

## 📊 Features

### ✅ Implemented

- [x] **MVC Architecture** - Clean separation of concerns
- [x] **RESTful API** - All required endpoints
- [x] **Database Schema** - Complete with relationships
- [x] **Frontend UI** - React components for all features
- [x] **Docker Setup** - Multi-service containerization
- [x] **Data Seeding** - Automatic sample data
- [x] **Error Handling** - Proper HTTP status codes
- [x] **Validation** - Pydantic schemas
- [x] **CORS** - Cross-origin requests enabled
- [x] **Health Checks** - Container health monitoring

### 🔄 Business Logic

- [x] **Time Conflict Detection** - Prevents double booking
- [x] **Class Capacity Management** - Prevents overbooking
- [x] **Subscription Session Tracking** - Usage monitoring
- [x] **Data Validation** - Input sanitization
- [x] **Relationship Management** - Parent-Student links

## 🚀 Deployment

### Production Considerations

1. **Environment Variables** - Use `.env` files for secrets
2. **Database Migrations** - Implement Alembic
3. **Logging** - Add structured logging
4. **Monitoring** - Health checks and metrics
5. **Security** - Authentication & authorization
6. **Backup** - Database backup strategy

### CI/CD Pipeline

```yaml
# .github/workflows/deploy.yml
name: Deploy
on:
  push:
    branches: [main]
jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - name: Run Tests
        run: |
          docker-compose up -d
          # Add test commands
  deploy:
    needs: test
    runs-on: ubuntu-latest
    steps:
      - name: Deploy to Production
        run: |
          # Add deployment commands
```

## 📝 What's Missing (Optional Enhancements)

### 🔐 Security

- [ ] **Authentication** - JWT tokens
- [ ] **Authorization** - Role-based access
- [ ] **Input Sanitization** - SQL injection prevention
- [ ] **Rate Limiting** - API protection

### 📈 Performance

- [ ] **Caching** - Redis for frequently accessed data
- [ ] **Pagination** - Large dataset handling
- [ ] **Database Indexing** - Query optimization
- [ ] **API Response Compression** - Gzip compression

### 🧪 Testing

- [ ] **Unit Tests** - pytest for backend
- [ ] **Integration Tests** - API testing
- [ ] **Frontend Tests** - Jest/React Testing Library
- [ ] **E2E Tests** - Cypress/Playwright

### 📊 Monitoring

- [ ] **Logging** - Structured logging with ELK
- [ ] **Metrics** - Prometheus/Grafana
- [ ] **Error Tracking** - Sentry integration
- [ ] **Health Checks** - Advanced monitoring

### 🔄 Advanced Features

- [ ] **Real-time Updates** - WebSocket notifications
- [ ] **File Upload** - Student photos/documents
- [ ] **Email Notifications** - Registration confirmations
- [ ] **Payment Integration** - Subscription billing
- [ ] **Reporting** - Analytics dashboard
- [ ] **Multi-tenancy** - School management

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests
5. Submit a pull request

## 📄 License

This project is for educational purposes. Feel free to use and modify as needed.

---

**Note**: This is a demonstration project showing MVC architecture, RESTful API design, and modern web development practices. For production use, implement the missing security and performance features listed above.
