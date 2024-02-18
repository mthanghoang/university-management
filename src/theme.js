import { experimental_extendTheme as extendTheme } from '@mui/material/styles'
import { cyan, deepOrange, orange, teal } from '@mui/material/colors'

// Create a theme instance.
const theme = extendTheme({
  custom: {
    appBarHeight: '58px'
  },
  direction: 'ltr',
  colorSchemes: {
    light: {
      palette: {
        primary: teal,
        secondary: deepOrange
      }
    },
    dark: {
      palette: {
        primary: cyan,
        secondary: orange
      }
    }
  },
  components: {
    // Name of the component
    MuiButton: {
      styleOverrides: {
        // Name of the slot
        root: {
          // Some CSS
          textTransform: 'none',
          fontWeight: '400'
        }
      }
    },
    // MuiInputLabel: {
    //   styleOverrides: {
    //     // Name of the slot
    //     root: ({ theme }) => ({
    //       color: theme.palette.primary.main
    //     })
    //   }
    // },
    MuiOutlinedInput: {
      styleOverrides: {
        // Name of the slot
        root: ({ theme }) => ({
          color: theme.palette.primary.main,
          '.MuiOutlinedInput-notchedOutline': {
            borderColor: theme.palette.primary.light
          },
          '&:hover': {
            '.MuiOutlinedInput-notchedOutline': {
              borderColor: theme.palette.primary.main
            }
          }
        })
      }
    }
  }
}
)
export default theme