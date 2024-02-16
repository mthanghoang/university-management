// Users list
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import Paper from '@mui/material/Paper'
import Box from '@mui/material/Box'
import GroupsIcon from '@mui/icons-material/Groups'
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'
import FilterAltIcon from '@mui/icons-material/FilterAlt'
import PersonAddIcon from '@mui/icons-material/PersonAdd'

function createData(name, email, role, date) {
  return { name, email, role, date }
}

const rows = [
  createData('test123', 'test123@gmail.com', 'Student', '19.01.2024'),
  createData('ivandegt', '321@123.ru', 'Professor', '19.01.2024'),
  createData('user_sro2@gmail.com', 'lmao@gmail.com', 'Student', '19.01.2024'),
  createData('o.borodina', 'o.borodina@gmail.com', 'Admin', '19.01.2024'),
  createData('imhotep', 'imhotep@niuitmo.ru', 'Professor', '19.01.2024'),
  createData('galiev', 'GALIEV@gmail.com', 'Admin', '19.01.2024')
]

function UsersList() {
  return (
    <>
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
        <Box sx={{
          display: 'flex',
          alignItems: 'center',
          gap: 2
        }}>
          <TextField
            id="outlined-search"
            label="Search..."
            type="search"
            size='small'
            sx={{ maxWidth: '180px' }}/>
          <Button variant="contained">ОЧИСТИТЬ</Button>
          <Button variant="contained">
            <FilterAltIcon sx={{
              width: '24px',
              height: '24px'
            }} />
          </Button>
          <Button variant="contained">
            <PersonAddIcon sx={{
              width: '24px',
              height: '24px'
            }} />
          </Button>
        </Box>
      </Box>
      <Box sx={{
        display: 'flex',
        justifyContent: 'center'
      }}>
        <TableContainer component={Paper} sx={{ mx:'16px', width: '100%' }}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell align='left'>Имя пользователя</TableCell>
                <TableCell align="left">E-mail</TableCell>
                <TableCell align="left">Роль</TableCell>
                <TableCell align="left">Дата создания</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.map((row) => (
                <TableRow
                  hover
                  onClick={() => {
                    console.log('clicked')
                  }}
                  key={row.name}
                  sx={{
                    '&:last-child td, &:last-child th': { border: 0 },
                    cursor: 'pointer'
                  }}
                >
                  <TableCell component="th" scope="row">
                    {row.name}
                  </TableCell>
                  <TableCell align="left">{row.email}</TableCell>
                  <TableCell align="left">{row.role}</TableCell>
                  <TableCell align="left">{row.date}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    </>
  )
}

export default UsersList