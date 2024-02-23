import { useParams } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { fetchStudentInfoAPI, fetchStudentGradesAPI } from '../../apis'
import { Box } from '@mui/material'
import AppBar from '../../components/AppBar'
import Paper from '@mui/material/Paper'
import Typography from '@mui/material/Typography'
import FormatDate from '../../utils/FormatDate'
import CustomTable from '../../components/Table'

function StudentView() {
  const params = useParams()
  const [info, setInfo] = useState()
  const [sex, setSex] = useState()
  const [grades, setGrades] = useState()
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
    })

    fetchStudentGradesAPI(params.studentid).then((grades) => {
      setGrades(grades)
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
          gap: 3
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
              {info && (
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
              )}
            </Box>
          </Paper>
        </Box>
        <Box m={3}>
          <Typography textAlign='center' variant='h4' fontWeight={500}>Зачётка</Typography>
        </Box>
        {grades && (
          <CustomTable
            data={grades}
            headCells={headCells}
            searchFields={searchFields}
            searchLabel={searchLabel}
          />
        )}
      </Box>
    </>
  )
}

export default StudentView