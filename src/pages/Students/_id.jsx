import { useParams } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { fetchStudentInfoAPI } from '../../apis'
import { Box } from '@mui/material'
function StudentView() {
  const params = useParams()
  const [info, setInfo] = useState()
  useEffect(() => {
    fetchStudentInfoAPI().then((info) => {
      setInfo(info)
    })
  }, [])
  return (
    <>
      <div>Student {params.studentid}</div>
      <Box>
        <Box>
          
        </Box>
        <Box></Box>
      </Box>
    </>
  )
}

export default StudentView