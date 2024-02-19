import HomePage from './pages/HomePage'
import UsersList from './pages/Users'
import { Container } from '@mui/material'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import NotFoundPage from './pages/NotFoundPage'
import UserView from './pages/Users/_id'
import SignInPage from './pages/SignInPage'

function App() {
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
  return (
    <>
      <Container disableGutters maxWidth={false} sx={{ height: '100vh' }}>
        <RouterProvider router={router} />
      </Container>
    </>
  )
}

export default App
