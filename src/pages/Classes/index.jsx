// List of classes
import Box from '@mui/material/Box'
import GroupsIcon from '@mui/icons-material/Groups'
import AppBar from '../../components/AppBar'
import { useEffect, useState } from 'react'
import { fetchClassesListAPI } from '../../apis'
import CustomTable from '../../components/Table'
import { Skeleton } from '@mui/material'

function ClassesList() {
  const [classesList, setClassesList] = useState(null)
  const [loading, setLoading] = useState(true)
  const searchFields = ['langue', 'type_control', 'schedule']
  const searchLabel = 'Поиск по языку, типу контроля и расписанию'
  const filterFields = [
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
      'type': 'selection',
      'options': [1, 2],
      'label': 'Семестр'
    },
    {
      'key': 'langue',
      'type': 'selection',
      'options': ['Английский', 'Русский'],
      'label': 'Язык'
    },
    {
      'key': 'type_control',
      'type': 'selection',
      'options': ['Экзамен', 'Зачет'],
      'label': 'Тип контроля'
    },
    {
      'key': 'date_control',
      'type': 'date',
      'label': 'Дата контроля'
    },
    {
      'key': 'limit_students',
      'type': 'string',
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
      'type': 'string',
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
              <Box>Группы</Box>
              <Box>Список групп</Box>
            </Box>
          </Box>
        </Box>
        {!loading ? (
          <CustomTable
            data={classesList}
            headCells={headCells}
            searchFields={searchFields}
            searchLabel={searchLabel}
            filterFields={filterFields}/>
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

export default ClassesList