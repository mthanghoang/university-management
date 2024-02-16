import ModeSelect from '../ModeSelect'
import Button from '@mui/material/Button'
import MenuIcon from '@mui/icons-material/Menu'
import { Box } from '@mui/material'
import ProfileMenu from './ProfileMenu/ProfileMenu'

function AppBar() {
  return (
    <Box sx={{
      width: '100%',
      height: (theme) => theme.custom.appBarHeight,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between'
    }}>
      <Button
        color="inherit"
        edge="start"
        sx={{ mr: 2 }}
      >
        <MenuIcon sx={{ color: 'primary.main' }} />
      </Button>
      <Box sx={{
        m: 2,
        display: 'flex',
        alignItems: 'center',
        gap: 1
      }}>
        <ProfileMenu/>
        <ModeSelect/>
      </Box>
    </Box>
  )
}

export default AppBar