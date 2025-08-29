import React from "react";
import { Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage.";
import CallbackPage from "./pages/CallbackPage";
import ProtectedPage from "./pages/ProtectedPage";
import ProfilePage from "./pages/ProfilePage";
import AuthenticationGuard from "./AuthenticationGuard";
import TaskDashboard from "./components/TaskDashboard";
import TaskDetails from "./components/TaskDetails";
import TaskForm from "./components/TaskForm";
import PageLayout from "./layout/PageLayout";
import { TaskProvider } from "./context/TaskContext";

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
          path="/task/:id"
          element={<AuthenticationGuard element={<TaskDetails />} />}
        />
        <Route
          path="/create"
          element={<AuthenticationGuard element={<TaskForm />} />}
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
