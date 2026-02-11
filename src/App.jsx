import { useState, useEffect } from 'react';
import { Navigate, Routes, Route, RouterProvider, createBrowserRouter } from 'react-router-dom';
import styles from './App.module.css'
import { Toaster } from "react-hot-toast";
import { useAppSelector } from './redux/store';

import { CWGPage } from './Page/CWGpage/CWGpage';
import { LoginPage } from './Page/Onboarding/LoginPage';
import { AdminLogin } from './Admin/Page/AdminOnboarding/AdminLogin';
import { ConfirmationPage } from './Page/Onboarding/ConfirmationPage';
import { AdminReset } from './Admin/Page/AdminOnboarding/AdminReset';
import { ResetPage } from './Page/Onboarding/ResetPage';
import { ChangePasswordPage } from './Page/Onboarding/ChangePasswordPage';
import { AccountPage } from './Page/Onboarding/AccountPage';
import { PasswordPage } from './Page/Onboarding/PasswordPage';
import { NewAdmin } from './Admin/Page/AdminOnboarding/NewAdmin';

import { DashboardLayout } from './Page/DashboardLayout'
import { AdminDashboardLayout } from './Admin/Page/AdminDashboardLayout';
import { ProfilePage } from './Page/ProfilePage/ProfilePage';
import { BlankPage } from './Page/BlankPage';
import { PageNotFound } from './Page/404';

import { Overview } from './Page/Overviewpage/Overview'
import { ActiveCourse } from './Page/Course/ActiveCourse'
import { CompletedCourse } from './Page/Course/CompletedCourses';
import { CourseDetails } from './Page/CourseDetails/CourseDetails';
import { CalendarPage } from './Page/CalendarPage/Calendar';
import { Certificate } from './Page/Certificate/Certificate';
import { TheCertificate } from './Page/Certificate/TheCertificate';
import { Library } from './Page/Library/Library';

import { AdminOverview } from './Admin/Page/AdminOverviewpage/AdminOverview';
import { AllCourses } from './Admin/Page/Courses/AllCourses';
import { ActiveCourses } from './Admin/Page/Courses/ActiveCourses';
import { UpcomingCourses } from './Admin/Page/Courses/UpcomingCourses';
import { CompletedCourses } from './Admin/Page/Courses/CompletedCourses';
import { SchedulePage } from './Admin/Page/SchedulePage/SchedulePage';
import { TeachersPage } from './Admin/Page/TeacherPage/TeacherPage';
import { StudentPage } from './Admin/Page/StudentPage/StudentPage';
import { PendingStudentPage } from './Admin/Page/StudentPage/PendingStudentPage';
import { ActivityLogPage } from './Admin/Page/ActivityLogPage/ActivityLogPage';
import { CourseDetail } from './Admin/Page/Courses/CourseDetail';
import { CoursePreview } from './Admin/Page/Courses/CoursePreview';
import { CohortPage } from './Admin/Page/CohortPage/CohortPage';
import { CohortDetails } from './Admin/Page/CohortPage/CohortDetails';
import { Classes } from './Admin/Page/ClassesPage/Classes';
import { ClassDetails } from './Admin/Page/ClassesPage/ClassDetails';
import { TaskPage } from './Admin/Page/TaskPage/TaskPage';
import { GradesPage } from './Page/GradesPage/GradesPage';
import { LibraryPage } from './Admin/Page/LibraryPage/LibraryPage';
import { LibraryDetails } from './Admin/Page/LibraryPage/LibraryDetails';
import { LibraryDetailss } from './Page/Library/LibraryDetailss';


function App() {

  const { authToken } = useAppSelector((state) => state.app.auth);

  const ProtectedRoute = ({ children }) => {

    const type = sessionStorage.getItem("type");
    const lastLogged = sessionStorage.getItem("last_logged");
    if ((!sessionStorage) || (!authToken) || (type != "student") || (!lastLogged) || (new Date() - new Date(lastLogged) >= 604800000)) {
      window.location.href = "/login";
    }
    return children;
  };


  const AdminProtectedRoute = ({ children }) => {
    const type = sessionStorage.getItem("type");
    const lastLogged = sessionStorage.getItem("last_logged");
    if ((!sessionStorage) || (type != "teacher") || (!lastLogged) || (new Date() - new Date(lastLogged) >= 604800000)) {
      window.location.href = "/admin-login";
    }
    return children;
  };

  const router = createBrowserRouter([
    { path: '/', element: <CWGPage /> },
    { path: '/CWG', element: <CWGPage /> },
    { path: '/Login', element: <LoginPage /> },
    { path: '/confirm-email/:id', element: <ConfirmationPage /> },
    { path: '/Admin-login', element: <AdminLogin /> },
    { path: '/new-admin/:id', element: <NewAdmin /> },
    { path: '/Account', element: <AccountPage /> },
    { path: '/Password', element: <PasswordPage /> },
    { path: '/Reset', element: <ResetPage /> },
    { path: '/change-password/:id', element: <ChangePasswordPage /> },
    { path: '/admin-reset', element: <AdminReset /> },

    { path: '/blank', element: <BlankPage /> },
    { path: '/404', element: <PageNotFound /> },

    {
      path: '/dashboard',
      element: (
        <ProtectedRoute>
          <DashboardLayout />
        </ProtectedRoute>
      ),
      children: [
        { path: '/dashboard', element: <Navigate to="overview" /> },
        { path: 'overview', element: <Overview /> },
        { path: 'courses', element: <Navigate to="active" /> },
        { path: 'courses/active', element: <ActiveCourse /> },
        { path: 'courses/completed', element: <CompletedCourse /> },
        { path: 'courses/detail/:courseID', element: <CourseDetails /> },
        { path: 'gradebook', element: <GradesPage /> },
        { path: 'calendar', element: <CalendarPage /> },
        { path: 'certificate', element: <Certificate /> },
        { path: 'certificate/:certId', element: <TheCertificate /> },
        { path: 'library', element: <Library /> },
        { path: 'library/:docId', element: <LibraryDetailss /> },
        { path: 'profile', element: <ProfilePage /> },
        { path: 'profile/:id', element: <ProfilePage /> },
        { path: 'settings', element: <BlankPage /> },

      ]
    },
    {
      path: '/admin-dashboard',
      element: (
        <AdminProtectedRoute>
          <AdminDashboardLayout />
        </AdminProtectedRoute>
      ),
      children: [
        { path: '/admin-dashboard', element: <Navigate to="overview" /> },
        { path: 'overview', element: <AdminOverview /> },
        { path: 'schedule', element: <SchedulePage /> },
        { path: 'courses', element: <AllCourses /> },
        { path: 'courses/active', element: <ActiveCourses /> },
        { path: 'courses/upcoming', element: <UpcomingCourses /> },
        { path: 'courses/completed', element: <CompletedCourses /> },
        { path: 'courses/detail', element: <CourseDetail /> },
        { path: 'courses/detail/:courseId', element: <CourseDetail /> },
        { path: 'courses/preview/:courseID', element: <CoursePreview /> },
        { path: 'cohort', element: <CohortPage /> },
        { path: 'cohort/:id', element: <CohortDetails /> },
        { path: 'classes', element: <Classes /> },
        { path: 'classes/:id', element: <ClassDetails /> },
        { path: 'tasks', element: <TaskPage /> },
        { path: 'teacher', element: <TeachersPage /> },
        { path: 'student', element: <StudentPage /> },
        { path: 'student/pending', element: <PendingStudentPage /> },
        { path: 'library', element: <LibraryPage /> },
        { path: 'library/:id', element: <LibraryDetails /> },
        { path: 'activitylog', element: <ActivityLogPage /> },
        { path: 'profile', element: <ProfilePage /> },
        { path: 'profile/:id', element: <ProfilePage /> },
      ]
    },
  ])


  return (
    <div className={styles.App}>
      {/* <ChakraProvider> */}
      <Toaster position="top-right" reverseOrder={false} />
      <RouterProvider router={router} />
      {/* </ChakraProvider> */}
    </div>
  )
}

export default App



