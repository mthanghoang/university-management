import { Link } from 'react-router-dom'
import { Box } from '@mui/system'
function NotFoundPage() {
  return (
    <Box sx={{
      display: 'flex',
      flexDirection: 'column',
      gap: 2
    }}>
      404 Not Found
      <Link to={'/'}>Home from Link</Link>
    </Box>
  )
}

export default NotFoundPage