# Student Management System

Ứng dụng web mini quản lý học sinh - phụ huynh với React và FastAPI.

## 🗄️ Database Schema

| **Bảng**               | **Mô tả**           | **Fields chính**                                                                  |
| ---------------------- | ------------------- | --------------------------------------------------------------------------------- |
| **Parents**            | Thông tin phụ huynh | id, name, phone, email, created_at, updated_at                                    |
| **Students**           | Thông tin học sinh  | id, name, dob, gender, current_grade, parent_id, created_at, updated_at           |
| **Classes**            | Thông tin lớp học   | id, name, subject, day_of_week, time_slot, teacher_name, max_students, created_at |
| **ClassRegistrations** | Đăng ký lớp         | id, class_id, student_id, created_at                                              |
| **Subscriptions**      | Gói học             | id, student_id, package_name, start_date, end_date, total_sessions, used_sessions |

## 🔌 API Endpoints

### Parents

- `POST /api/parents` – Tạo phụ huynh mới
- `GET /api/parents/{id}` – Xem chi tiết phụ huynh
- `GET /api/parents` – Lấy danh sách tất cả phụ huynh

### Students

- `POST /api/students` – Tạo học sinh mới (kèm parent_id)
- `GET /api/students/{id}` – Xem chi tiết học sinh (bao gồm thông tin phụ huynh)
- `GET /api/students` – Lấy danh sách tất cả học sinh (bao gồm thông tin phụ huynh)

### Classes

- `POST /api/classes` – Tạo lớp học mới
- `GET /api/classes` – Lấy danh sách tất cả lớp học (bao gồm current_students)
- `GET /api/classes?day={weekday}` – Lọc lớp học theo ngày trong tuần
- `GET /api/classes/{id}` – Xem chi tiết lớp học với danh sách đăng ký

### Class Registrations

- `POST /api/classes/{class_id}/register?student_id={student_id}` – Đăng ký học sinh vào lớp
- `GET /api/classes/registrations/count` – Lấy tổng số đăng ký

### Subscriptions

- `POST /api/subscriptions` – Tạo gói học mới
- `GET /api/subscriptions/{id}` – Xem chi tiết gói học
- `GET /api/subscriptions` – Lấy danh sách tất cả gói học (bao gồm thông tin học sinh)
- `PATCH /api/subscriptions/{id}/use` – Sử dụng 1 buổi học (giảm used_sessions)

### Ví dụ truy vấn API

#### Tạo phụ huynh

```bash
curl -X POST "http://localhost:8000/api/parents" \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Nguyễn Văn A",
    "phone": "0123456789",
    "email": "nguyenvana@email.com"
  }'
```

#### Tạo học sinh

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

#### Tạo lớp học

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

#### Đăng ký học sinh vào lớp

```bash
curl -X POST "http://localhost:8000/api/classes/1/register?student_id=1"
```

#### Tạo gói học

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

#### Sử dụng buổi học

```bash
curl -X PATCH "http://localhost:8000/api/subscriptions/1/use"
```

## 🚀 Cách dựng project (build/run với Docker)

### Yêu cầu

- Docker & Docker Compose

### 1. Clone project

```bash
git clone https://github.com/khanh1084/test-mini-web.git
cd test-mini-web
```

### 2. Chạy với Docker Compose

```bash
docker compose up --build
```

### 3. Truy cập ứng dụng

- **Frontend**: http://localhost:3000
- **Backend API**: http://localhost:8000
- **API Documentation**: http://localhost:8000/docs

### 4. Data seed

Ứng dụng tự động tạo data mẫu: 2 parents, 3 students, 2-3 classes
