import HomePage from './pages/HomePage'
import { Container } from '@mui/material'
import AppBar from './components/AppBar'
import UsersList from './pages/Users'

function App() {
  return (
    <>
      <Container disableGutters maxWidth={false} sx={{ height: '100vh' }}>
        <AppBar />
        {/* React Router Dom */}
        {/* <HomePage /> */}
        <UsersList />
      </Container>
    </>
  )
}

export default App
