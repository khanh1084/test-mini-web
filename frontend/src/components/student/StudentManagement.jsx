import React, { useState, useEffect } from "react";
import axios from "axios";
import StudentForm from "./StudentForm";
import StudentList from "./StudentList";

function StudentManagement() {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchStudents();
  }, []);

  const fetchStudents = async () => {
    try {
      setLoading(true);
      const response = await axios.get("/api/students");
      setStudents(response.data);
    } catch (error) {
      console.error("Error fetching students:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container">
      <StudentForm onStudentCreated={fetchStudents} />
      <StudentList students={students} loading={loading} />
    </div>
  );
}

export default StudentManagement;
