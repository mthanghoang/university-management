// List of students
import Box from '@mui/material/Box'
import GroupsIcon from '@mui/icons-material/Groups'
import AppBar from '../../components/AppBar'
import { useEffect, useState } from 'react'
import { fetchStudentsListAPI } from '../../apis'
import CustomTable from '../../components/Table'

function StudentsList() {
  const [studentsList, setStudentsList] = useState(null)
  const searchFields = ['lastname', 'surname', 'name']
  const searchLabel = 'Поиск по имени студента'
  const headCells = [
    {
      'key': 'id',
      'type': 'number',
      'label': 'ID студента'
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
      'key': 'birthday',
      'type': 'date',
      'label': 'День рождения'
    },
    {
      'key': 'sex',
      'type': 'string',
      'label': 'Пол'
    },
    {
      'key': 'programm_id',
      'type': 'number',
      'label': 'ID программы'
    }
  ]
  useEffect(() => {
    // fetchStudentsListAPI()
    fetchStudentsListAPI().then((studentsList) => {
      setStudentsList(studentsList)
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
              <Box>Студенты</Box>
              <Box>Список студентов</Box>
            </Box>
          </Box>
        </Box>
        {studentsList && (
          <CustomTable
            data={studentsList}
            headCells={headCells}
            searchFields={searchFields}
            searchLabel={searchLabel}/>
        )}
      </Box>
    </>
  )
}

export default StudentsList