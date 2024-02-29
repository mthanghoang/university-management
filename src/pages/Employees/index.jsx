// List of employees
import Box from '@mui/material/Box'
import GroupsIcon from '@mui/icons-material/Groups'
import AppBar from '../../components/AppBar'
import { useEffect, useState } from 'react'
import { fetchEmployeesListAPI } from '../../apis'
import CustomTable from '../../components/Table'
import { Skeleton } from '@mui/material'

function EmployeesList() {
  const [employeesList, setEmployeesList] = useState(null)
  const [loading, setLoading] = useState(true)
  const searchFields = ['lastname', 'surname', 'name', 'type_employee']
  const searchLabel = 'Поиск по имени и должности'
  const headCells = [
    {
      'key': 'id',
      'type': 'number',
      'label': 'ID сотрудника'
    },
    {
      'key': 'lastname',
      'type': 'string',
      'label': 'Фамилия'
    },
    {
      'key': 'surname',
      'type': 'string',
      'label': 'Отчество'
    },
    {
      'key': 'name',
      'type': 'string',
      'label': 'Имя'
    },
    {
      'key': 'fullname',
      'type': 'string',
      'label': 'Полное имя'
    },
    {
      'key': 'salary',
      'type': 'string',
      'label': 'Зарплата'
    },
    {
      'key': 'sex',
      'type': 'string',
      'label': 'Пол'
    },
    {
      'key': 'type_employee',
      'type': 'string',
      'label': 'Должность'
    }
  ]
  useEffect(() => {
    fetchEmployeesListAPI().then((employeesList) => {
      setEmployeesList(employeesList)
      setLoading(false)
    })
  }, [])
  return (
    <>
      <AppBar />
      <Box>
        <Box sx={{
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
              <Box>Сотрудник</Box>
              <Box>Список сотрудников</Box>
            </Box>
          </Box>
        </Box>
        {!loading ? (
          <CustomTable
            data={employeesList}
            headCells={headCells}
            searchFields={searchFields}
            searchLabel={searchLabel}/>
        ) :
          <Box display={'flex'} flexDirection={'column'} height={(theme) => `calc(100vh - ${theme.custom.appBarHeight})`}>
            <Skeleton
              variant='rounded'
              height="10%"
              style={{ margin: '0 16px 16px' }}
            />
            <Skeleton
              variant='rounded'
              height="10%"
              style={{ margin: '0 16px 16px' }}
            />
            <Skeleton
              variant='rounded'
              height="10%"
              style={{ margin: '0 16px 16px' }}
            />
            <Skeleton
              variant='rounded'
              height="10%"
              style={{ margin: '0 16px 16px' }}
            />
            <Skeleton
              variant='rounded'
              height="10%"
              style={{ margin: '0 16px 16px' }}
            />
            <Skeleton
              variant='rounded'
              height="10%"
              style={{ margin: '0 16px 16px' }}
            />
            <Skeleton
              variant='rounded'
              height="10%"
              style={{ margin: '0 16px 16px' }}
            />
          </Box>
        }
      </Box>
    </>
  )
}

export default EmployeesList