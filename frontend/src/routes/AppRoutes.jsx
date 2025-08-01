import React from "react";
import { Routes, Route } from "react-router-dom";
import {
  HomePage,
  ParentsPage,
  StudentsPage,
  ClassesPage,
  RegistrationPage,
  SubscriptionsPage,
} from "../pages";

function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/parents" element={<ParentsPage />} />
      <Route path="/students" element={<StudentsPage />} />
      <Route path="/classes" element={<ClassesPage />} />
      <Route path="/registration" element={<RegistrationPage />} />
      <Route path="/subscriptions" element={<SubscriptionsPage />} />
    </Routes>
  );
}

export default AppRoutes;
