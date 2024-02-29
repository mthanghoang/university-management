import { Card, CardHeader, CardContent, CardActions } from '@mui/material'
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'
import { DatePicker } from '@mui/x-date-pickers/DatePicker'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { useEffect } from 'react'

function FilterModal() {

  // useEffect(() => {
  //   const handleClick = () => {}


  //   document.addEventListener('click', handleClick)

  //   return () => {
  //     document.removeEventListener('click', handleClick)
  //   }
  // }, [])

  return (
    <Card
      sx={{
        width: '330px',
        position: 'absolute',
        top: '100%',
        right: '0',
        zIndex: 1,
        cursor: 'default'
      }}
      onClick={(e) => {
        e.stopPropagation()
        e.preventDefault()
      }}
    >
      <CardHeader title='Фильтр' sx={{ paddingBottom: 0 }} />
      <CardContent
        sx={{
          display: 'flex',
          flexDirection: 'column',
          gap: 1.5,
          paddingTop: 0
        }}
      >
        <TextField id="standard-basic" label="ID студента" variant="standard" />
        <TextField id="standard-basic" label="Имя студента" variant="standard" />
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DatePicker
            label="День рождения"
            slotProps={{ textField: { size: 'small', variant: 'standard' } }}
            format='DD/MM/YYYY'
          />
        </LocalizationProvider>
        <TextField id="standard-basic" label="Пол" variant="standard" />
        <TextField id="standard-basic" label="ID программы" variant="standard" />
      </CardContent>
      <CardActions sx={{
        display: 'flex',
        justifyContent: 'flex-end'
      }}>
        <Button variant='outlined'>Очистить</Button>
        <Button variant='contained'>Применить</Button>
      </CardActions>
    </Card>
  )
}

export default FilterModal