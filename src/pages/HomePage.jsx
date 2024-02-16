import { Box } from '@mui/material'

function HomePage() {
  return (
    <>
      <Box sx={{
        backgroundColor: 'primary.main',
        width: '100%',
        height: (theme) => `calc(100vh - ${theme.custom.appBarHeight})`,
        display: 'flex',
        alignItems: 'center'
      }}>
        CONTENT
      </Box>
    </>
  )
}

export default HomePage