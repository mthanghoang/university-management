import { Container } from '@mui/material'
import { RouterProvider } from 'react-router-dom'
import router from './router'

function App() {
  return (
    <>
      <Container disableGutters maxWidth={false} sx={{ height: '100vh' }}>
        <RouterProvider router={router} />
      </Container>
    </>
  )
}

export default App
