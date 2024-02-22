import { createBrowserRouter } from 'react-router-dom'
import HomePage from '../pages/HomePage'
import NotFoundPage from '../pages/NotFoundPage'
import SignInPage from '../pages/SignInPage'
import StudentsList from '../pages/Students'
import StudentView from '../pages/Students/_id'
import EmployeesList from '../pages/Employees'
import ClassesList from '../pages/Classes'

const router = createBrowserRouter([
  {
    path: '/',
    element: <HomePage />,
    errorElement: <NotFoundPage />
  },
  {
    path: '/login',
    element: <SignInPage />
  },
  {
    path: '/students',
    element: <StudentsList />
  },
  {
    path: '/students/:studentid',
    element: <StudentView />
  },
  {
    path: '/employees',
    element: <EmployeesList />
  },
  {
    path: '/classes',
    element: <ClassesList />
  }])

export default router