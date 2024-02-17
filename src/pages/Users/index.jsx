// Users list
import Box from '@mui/material/Box'
import GroupsIcon from '@mui/icons-material/Groups'
import UsersTable from '../../components/Table'

function UsersList() {
  return (
    <Box>
      <Box sx={{
        // backgroundColor: 'primary.main',
        padding: '16px',
        height: '100px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between'
      }}>
        <Box sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center'
        }}>
          <Box sx={{
            padding: '14px',
            backgroundColor: 'primary.main',
            borderRadius: '6px',
            display: 'flex',
            alignItems: 'center'
          }}>
            <GroupsIcon sx={{
              width: '32px',
              height: '32px'
            }} />
          </Box>
          <Box px={2} >
            <Box>Пользователи</Box>
            <Box>Список пользователей</Box>
          </Box>
        </Box>
      </Box>
      <UsersTable />
    </Box>
  )
}

export default UsersList