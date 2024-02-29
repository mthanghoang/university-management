import { Box } from '@mui/system'
import { Card } from '@mui/material'
import CardContent from '@mui/material/CardContent'
import Typography from '@mui/material/Typography'
import CssBaseline from '@mui/material/CssBaseline'
import TextField from '@mui/material/TextField'
import FormControl from '@mui/material/FormControl'
import Button from '@mui/material/Button'
import ModeSelect from '../components/ModeSelect'
import MailOutlineIcon from '@mui/icons-material/MailOutline'
import LockOutlinedIcon from '@mui/icons-material/LockOutlined'
import InputAdornment from '@mui/material/InputAdornment'
import theme from '../theme'
import { useState } from 'react'
import IconButton from '@mui/material/IconButton'
import Visibility from '@mui/icons-material/Visibility'
import VisibilityOff from '@mui/icons-material/VisibilityOff'
import { loginAPI } from '../apis'
import * as storage from '../utils/Storage'

export default function SignInPage() {
  const [showPassword, setShowPassword] = useState(false)
  const handleClickShowPassword = () => {
    setShowPassword((show) => !show)
  }

  const handleMouseDownPassword = (event) => {
    event.preventDefault()
  }
  // INPUT
  const [usernameInput, setUsernameInput] = useState()
  const [passwordInput, setPasswordInput] = useState()
  // INPUT ERROR
  const [usernameError, setUsernameError] = useState(false)
  const [passwordError, setPasswordError] = useState(false)
  // VALIDATION FOR onBlur
  const handleUsername = () => {
    if (!usernameInput) {
      setUsernameError(true)
      return
    }
    setUsernameError(false)
  }
  const handlePassword = () => {
    if (!passwordInput) {
      setPasswordError(true)
      return
    }
    setPasswordError(false)
  }
  // HANDLE SUBMIT
  const handleSubmit = (e) => {
    e.preventDefault()
    loginAPI(usernameInput, passwordInput).then((data) => {
      storage.save('user', data.accessToken)
    })
  }
  return (
    <Box sx={{
      width: '100%',
      height: '100%'
    }}>
      <CssBaseline />
      <Box sx={{
        width: '100%',
        height: (theme) => theme.custom.appBarHeight,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'end'
      }}>
        <Box sx={{
          m: 2,
          display: 'flex',
          alignItems: 'center',
          gap: 1
        }}>
          <ModeSelect/>
        </Box>
      </Box>
      <Box sx={{ display: 'flex', height: `calc(100% - ${theme.custom.appBarHeight})` }}>
        <Box sx={{ m: 'auto', display: 'flex', alignItems: 'center' }}>
          <Box sx={{
            // transform: `translateY(-${theme.custom.appBarHeight})`
          }}>
            <Card sx={{ minWidth: '460px', mt: '16px' }}>
              <CardContent sx={{
                display: 'flex',
                flexDirection: 'column',
                gap: 1
              }}>
                <Typography component='h1' variant='h5' textAlign='center'>
                  Sign in
                </Typography>
                <FormControl>
                  <TextField
                    id='standard-username-input'
                    label='Username or Email'
                    variant='standard'
                    error={usernameError}
                    value={usernameInput}
                    onChange={(e) => setUsernameInput(e.target.value)}
                    onBlur={handleUsername}
                    size='large'
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position='start'>
                          <MailOutlineIcon color={usernameError ? 'error' : ''}/>
                        </InputAdornment>
                      )
                    }}
                    InputLabelProps={{
                      sx: {
                        '&.MuiInputLabel-sizeLarge': { fontSize: '20px', color: 'text.secondary' }
                      }
                    }}
                    inputProps={{
                      style: { padding: '8px 0' }
                    }}
                  />
                  <Box height='22px'>
                    {usernameError && (
                      <Typography color='error' fontSize='12px' padding='4px'>
                        Required field
                      </Typography>
                    )}
                  </Box>
                </FormControl>
                <FormControl>
                  <TextField
                    id='standard-adornment-password'
                    label='Password'
                    type={showPassword ? 'text' : 'password'}
                    size='large'
                    variant='standard'
                    error={passwordError}
                    value={passwordInput}
                    onChange={(e) => setPasswordInput(e.target.value)}
                    onBlur={handlePassword}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position='start'>
                          <LockOutlinedIcon color={passwordError ? 'error' : ''} />
                        </InputAdornment>
                      ),
                      endAdornment: (
                        <InputAdornment position='end'>
                          <IconButton
                            color={passwordError ? 'error' : ''}
                            aria-label='toggle password visibility'
                            onClick={handleClickShowPassword}
                            onMouseDown={handleMouseDownPassword}
                          >
                            {showPassword ? <VisibilityOff /> : <Visibility />}
                          </IconButton>
                        </InputAdornment>
                      )
                    }}
                    InputLabelProps={{
                      sx: {
                        '&.MuiInputLabel-sizeLarge': { fontSize: '20px', color: 'text.secondary' }
                      }
                    }}
                    inputProps={{
                      style: { padding: '8px 0' }
                    }}
                  />
                  <Box height='22px'>
                    {passwordError && (
                      <Typography color='error' fontSize='12px' padding='4px'>
                        Required field
                      </Typography>
                    )}
                  </Box>
                </FormControl>
                <Button
                  type='submit'
                  fullWidth
                  variant='contained'
                  color='primary'
                  sx={{ mt: '8px' }}
                  onClick={handleSubmit}
                >
                    Sign In
                </Button>
              </CardContent>
            </Card>
          </Box>
        </Box>
      </Box>
    </Box>
  )
}