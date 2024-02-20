import { createBrowserRouter } from 'react-router-dom'
import HomePage from '../pages/HomePage'
import NotFoundPage from '../pages/NotFoundPage'
import SignInPage from '../pages/SignInPage'
import UsersList from '../pages/Users'
import UserView from '../pages/Users/_id'

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
    path: '/users',
    element: <UsersList />
  },
  {
    path: '/users/:userid',
    element: <UserView />
  }])

export default router