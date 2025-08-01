# Student Management System

Ứng dụng web mini quản lý học sinh - phụ huynh với React và FastAPI.

## 🗄️ Database Schema

| **Bảng**               | **Mô tả**           | **Fields chính**                                                                  |
| ---------------------- | ------------------- | --------------------------------------------------------------------------------- |
| **Parents**            | Thông tin phụ huynh | id, name, phone, email                                                            |
| **Students**           | Thông tin học sinh  | id, name, dob, gender, current_grade, parent_id                                   |
| **Classes**            | Thông tin lớp học   | id, name, subject, day_of_week, time_slot, teacher_name, max_students             |
| **ClassRegistrations** | Đăng ký lớp         | class_id, student_id                                                              |
| **Subscriptions**      | Gói học             | id, student_id, package_name, start_date, end_date, total_sessions, used_sessions |

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

### 4. Ví dụ data seed

Ứng dụng tự động tạo data mẫu: 2 parents, 3 students, 2-3 classes
