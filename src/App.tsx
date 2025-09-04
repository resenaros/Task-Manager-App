import React from "react";
import { Routes, Route } from "react-router-dom";
import PageLayout from "./layout/PageLayout";
import { TaskProvider } from "./context/TaskContext";
import HomePage from "./pages/HomePage";
import ProfilePage from "./pages/ProfilePage";
import ProtectedPage from "./pages/ProtectedPage";
import CallbackPage from "./pages/CallbackPage";
import TaskDashboard from "./components/TaskDashboard";
import TaskForm from "./components/TaskForm";
import TaskDetails from "./components/TaskDetails";
import AuthenticationGuard from "./AuthenticationGuard";

const App: React.FC = () => (
  <TaskProvider>
    <PageLayout>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route
          path="/tasks"
          element={<AuthenticationGuard element={<TaskDashboard />} />}
        />
        <Route
          path="/create"
          element={<AuthenticationGuard element={<TaskForm />} />}
        />
        <Route
          path="/edit/:id"
          element={<AuthenticationGuard element={<TaskForm />} />}
        />
        <Route
          path="/task/:id"
          element={<AuthenticationGuard element={<TaskDetails />} />}
        />
        <Route
          path="/profile"
          element={<AuthenticationGuard element={<ProfilePage />} />}
        />
        <Route
          path="/protected"
          element={<AuthenticationGuard element={<ProtectedPage />} />}
        />
        <Route path="/callback" element={<CallbackPage />} />
      </Routes>
    </PageLayout>
  </TaskProvider>
);

export default App;
