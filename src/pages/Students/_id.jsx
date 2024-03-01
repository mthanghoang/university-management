import { useParams } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { fetchStudentInfoAPI, fetchStudentGradesAPI } from '../../apis'
import { Box } from '@mui/material'
import AppBar from '../../components/AppBar'
import Paper from '@mui/material/Paper'
import Typography from '@mui/material/Typography'
import FormatDate from '../../utils/FormatDate'
import CustomTable from '../../components/Table'
import Skeleton from '@mui/material/Skeleton'

function StudentView() {
  const params = useParams()
  const [info, setInfo] = useState()
  const [sex, setSex] = useState()
  const [grades, setGrades] = useState()
  const [infoLoading, setInfoLoading] = useState(true)
  const [gradesLoading, setGradesLoading] = useState(true)
  const filterFields = [
    {
      'key': 'subject_title',
      'type': 'string',
      'label': 'Название предмета'
    },
    {
      'key': 'subject_duration',
      'type': 'string',
      'label': 'Количество часов'
    },
    {
      'key': 'type_control',
      'type': 'selection',
      'options': ['Экзамен', 'Зачет'],
      'label': 'Тип контроля'
    },
    {
      'key': 'employee_fullname',
      'type': 'string',
      'label': 'Преподаватель'
    },
    {
      'key': 'grade',
      'type': 'number',
      'label': 'Итоговая оценка'
    }
  ]
  const headCells = [
    {
      'key': 'subject_title',
      'type': 'string',
      'label': 'Название предмета'
    },
    {
      'key': 'subject_duration',
      'type': 'string',
      'label': 'Количество часов'
    },
    {
      'key': 'type_control',
      'type': 'string',
      'label': 'Тип контроля'
    },
    {
      'key': 'employee_fullname',
      'type': 'string',
      'label': 'Преподаватель'
    },
    {
      'key': 'grade',
      'type': 'number',
      'label': 'Итоговая оценка'
    }
  ]
  const searchFields = ['subject_title', 'type_control', 'employee_fullname']
  const searchLabel = 'Поиск по названию предмета, типу контроля и преподавателю'
  useEffect(() => {
    fetchStudentInfoAPI(params.studentid).then((info) => {
      setInfo(info)
      if (info.sex === 'Мужской') {
        setSex('male')
      }
      else {
        setSex('female')
      }
      setInfoLoading(false)
    })

    fetchStudentGradesAPI(params.studentid).then((grades) => {
      setGrades(grades)
      setGradesLoading(false)
    })
  }, [params.studentid])
  return (
    <>
      <AppBar />
      <Box sx={{ width: '100%' }}>
        <Box sx={{
          width: '100%',
          display: 'flex',
          alignItems: 'center',
          gap: 3,
          pt: 2
        }}>
          <Paper sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            borderRadius: '0.5rem',
            padding: '16px',
            width: '262px',
            height: '262px',
            ml: 3
          }}>
            {!infoLoading ? (
              <Box
                width='100%'
                height='100%'
                sx={{
                  backgroundImage: `url("/src/assets/default-avatar-${sex}.svg")`,
                  backgroundPosition: '50%',
                  backgroundRepeat: 'no-repeat',
                  backgroundSize: 'cover',
                  borderRadius: '0.5rem'
                }}
              >
              </Box>
            ) :
              <Skeleton variant='rounded' width={'100%'} height={'100%'} />
            }
          </Paper>
          <Paper sx={{
            borderRadius: '16px',
            flexGrow: '1',
            mr: 3,
            height: '100%'
          }}>
            <Box sx={{
              // height: '262px',
              padding: '16px'
            }}>
              {!infoLoading ? (
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                  <Box>
                    <Typography variant='h4'>
                      {info.fullname}
                    </Typography>
                    <Typography color='#858585'>
                      {info.id}
                    </Typography>
                  </Box>
                  <Box>
                    <Typography color='#858585' fontSize='14px'>День рождения:</Typography>
                    <Typography>{FormatDate(info.birthday)}</Typography>
                  </Box>
                  <Box>
                    <Typography color='#858585' fontSize='14px'>Пол:</Typography>
                    <Typography>{info.sex}</Typography>
                  </Box>
                  <Box>
                    <Typography color='#858585' fontSize='14px'>Программа обучения:</Typography>
                    <Typography>{info.programm.title}</Typography>
                  </Box>
                  <Box>
                    <Typography color='#858585' fontSize='14px'>Направление:</Typography>
                    <Typography>{info.programm.code}</Typography>
                  </Box>
                </Box>
              ) :
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                  <Box>
                    <Skeleton variant='rounded' width={300} height={30} style={{ marginBottom: '5px' }} />
                    <Skeleton variant='rounded' width={100} height={20} style={{ marginBottom: '5px' }}/>
                  </Box>
                  <Box>
                    <Skeleton variant='rounded' width={150} height={30} style={{ marginBottom: '5px' }} />
                    <Skeleton variant='rounded' width={100} height={20} style={{ marginBottom: '5px' }} />
                  </Box>
                  <Box>
                    <Skeleton variant='rounded' width={150} height={30} style={{ marginBottom: '5px' }} />
                    <Skeleton variant='rounded' width={100} height={20} style={{ marginBottom: '5px' }} />
                  </Box>
                  <Box>
                    <Skeleton variant='rounded' width={150} height={30} style={{ marginBottom: '5px' }} />
                    <Skeleton variant='rounded' width={100} height={20} style={{ marginBottom: '5px' }} />
                  </Box>
                  <Box>
                    <Skeleton variant='rounded' width={150} height={30} style={{ marginBottom: '5px' }} />
                    <Skeleton variant='rounded' width={100} height={20} style={{ marginBottom: '5px' }} />
                  </Box>
                </Box>
              }
            </Box>
          </Paper>
        </Box>
        <Box m={3}>
          <Typography textAlign='center' variant='h4' fontWeight={500}>Зачётка</Typography>
        </Box>
        {!gradesLoading ? (
          <CustomTable
            data={grades}
            headCells={headCells}
            searchFields={searchFields}
            searchLabel={searchLabel}
            filterFields={filterFields}
          />
        ) :
          <Box display={'flex'} flexDirection={'column'} height={(theme) => `calc(50vh - ${theme.custom.appBarHeight})`}>
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

export default StudentView