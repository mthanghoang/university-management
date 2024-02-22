// List of classes
import Box from '@mui/material/Box'
import GroupsIcon from '@mui/icons-material/Groups'
import AppBar from '../../components/AppBar'
import { useEffect, useState } from 'react'
import { fetchClassesListAPI } from '../../apis'
import CustomTable from '../../components/Table'

function ClassesList() {
  const [classesList, setClassesList] = useState(null)
  const searchFields = ['langue', 'type_control', 'schedule']
  const searchLabel = 'Поиск по языку, типу контроля и расписанию'
  const headCells = [
    {
      'key': 'id',
      'type': 'number',
      'label': 'ID группы'
    },
    {
      'key': 'year',
      'type': 'string',
      'label': 'Год'
    },
    {
      'key': 'semester',
      'type': 'string',
      'label': 'Семестр'
    },
    {
      'key': 'langue',
      'type': 'string',
      'label': 'Язык'
    },
    {
      'key': 'type_control',
      'type': 'string',
      'label': 'Тип контроля'
    },
    {
      'key': 'date_control',
      'type': 'date',
      'label': 'Дата контроля'
    },
    {
      'key': 'limit_students',
      'type': 'number',
      'label': 'Ограничение по студентам'
    },
    {
      'key': 'schedule',
      'type': 'string',
      'label': 'Расписание'
    },
    {
      'key': 'subject_id',
      'type': 'number',
      'label': 'ID дисциплины'
    },
    {
      'key': 'employee_id',
      'type': 'number',
      'label': 'ID преподавателя'
    }
  ]
  useEffect(() => {
    fetchClassesListAPI().then((classesList) => {
      setClassesList(classesList)
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
        {classesList && (
          <CustomTable
            data={classesList}
            headCells={headCells}
            searchFields={searchFields}
            searchLabel={searchLabel}/>
        )}
      </Box>
    </>
  )
}

export default ClassesList