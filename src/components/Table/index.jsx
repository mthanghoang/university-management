import { useEffect, useState } from 'react'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import TableSortLabel from '@mui/material/TableSortLabel'
import Paper from '@mui/material/Paper'
import { Box } from '@mui/system'
import { IconButton, InputAdornment, TextField } from '@mui/material'
import Button from '@mui/material/Button'
import FilterAltIcon from '@mui/icons-material/FilterAlt'
import PersonAddIcon from '@mui/icons-material/PersonAdd'
import PropTypes from 'prop-types'
import { useMemo } from 'react'
import FormatDate from '../../utils/FormatDate'
import Pagination from '@mui/material/Pagination'
import Typography from '@mui/material/Typography'
import FormControl from '@mui/material/FormControl'
import InputLabel from '@mui/material/InputLabel'
import MenuItem from '@mui/material/MenuItem'
import Select from '@mui/material/Select'
import { useNavigate } from 'react-router'
import { useDebounce } from '../../hooks/useDebounce'
import Highlighter from 'react-highlight-words'
import ConvertToString from '../../utils/ConvertToString'
import SearchIcon from '@mui/icons-material/Search'
import ClearIcon from '@mui/icons-material/Clear'
import Menu from '@mui/material/Menu'
import { DatePicker } from '@mui/x-date-pickers/DatePicker'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'

function descendingComparator(a, b, orderBy) {
  const aDate = new Date(a[orderBy])
  const bDate = new Date(b[orderBy])
  if (!isNaN(aDate) && !isNaN(bDate)) {
    if (bDate < aDate) {
      return -1
    }
    if (bDate > aDate) {
      return 1
    }
    return 0
  }
  if (b[orderBy] < a[orderBy]) {
    return -1
  }
  if (b[orderBy] > a[orderBy]) {
    return 1
  }
  return 0
}

function getComparator(order, orderBy) {
  return order === 'desc'
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy)
}

function stableSort(array, comparator) {
  const stabilizedThis = array.map((el, index) => [el, index])
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0])
    if (order !== 0) {
      return order
    }
    return a[1] - b[1]
  })
  return stabilizedThis.map((el) => el[0])
}

function SortableTableHead(props) {
  const { order, orderBy, onRequestSort, headCells } = props
  const createSortHandler = (property) => (e) => {
    onRequestSort(e, property)
  }
  return (
    <TableHead>
      <TableRow>
        {headCells.map((headCell) => (
          <TableCell
            key={headCell.key}
            align={headCell.type === 'number' ? 'center' : 'right'}
            sortDirection={orderBy === headCell.key ? order : false}
          >
            <TableSortLabel
              active={orderBy === headCell.key}
              direction={orderBy === headCell.key ? order : 'asc'}
              onClick={createSortHandler(headCell.key)}
            >
              {headCell.label}
            </TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  )
}

SortableTableHead.propTypes = {
  order: PropTypes.oneOf(['asc', 'desc']).isRequired,
  orderBy: PropTypes.string.isRequired,
  onRequestSort: PropTypes.func.isRequired
}

function CustomTable({ data, headCells, searchFields, searchLabel, filterFields }) {
  // SEARCH
  const [search, setSearch] = useState('')
  const debouncedSearch = useDebounce(search)
  const handleSearch = (e) => {
    setSearch(e.target.value)
    setPage(1)
  }
  // FILTER
  const [anchorEl, setAnchorEl] = useState(null)
  const open = Boolean(anchorEl)
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget)
  }
  const handleClose = () => {
    setAnchorEl(null)
  }
  // const [modalOpen, setModalOpen] = useState(false)
  // const handleShowModal = () => {
  //   setModalOpen(show => !show)
  // }

  // PAGINATION
  const [page, setPage] = useState(1)
  const [rowsPerPage, setRowsPerPage] = useState(10)

  const handleChangePage = (e, newPage) => {
    setPage(newPage)
  }
  const handleChangeRowsPerPage = (e) => {
    setRowsPerPage(e.target.value)
    setPage(1)
  }

  // SORTING
  const [order, setOrder] = useState('asc')
  const [orderBy, setOrderBy] = useState('')

  const handleRequestSort = (e, property) => {
    const isAsc = orderBy === property && order === 'asc'
    setOrder(isAsc ? 'desc' : 'asc')
    setOrderBy(property)
    setPage(1)
  }

  const searchedRows = useMemo(
    () =>
      data.filter((row) => {
        if (debouncedSearch === '') {
          return row
        }
        else {
          // const properties = searchfields
          let containsVal = false
          searchFields.forEach((property) => {
            if (row[property].toLowerCase().includes(debouncedSearch.toLowerCase())) {
              containsVal = true
            }
          })
          return containsVal
        }
      }),
    [debouncedSearch, data, searchFields]
  )

  const sortedRows = useMemo(
    () =>
      stableSort(searchedRows, getComparator(order, orderBy)).slice(
        (page-1) * rowsPerPage,
        (page-1) * rowsPerPage + rowsPerPage
      ),
    [order, orderBy, page, rowsPerPage, searchedRows]
  )

  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows =
    page-1 > 0 ? Math.max(0, (1 + page - 1) * rowsPerPage - searchedRows.length) : 0

  const navigate = useNavigate()
  return (
    <Paper sx={{ marginX: '16px' }}>
      <Box sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: 2,
        padding: 2
      }}>
        <TextField
          id='standard-search'
          label={searchLabel}
          type='search'
          size='small'
          variant='standard'
          value={search}
          sx={{
            flexGrow: '1',
            maxWidth: '500px'
          }}
          InputProps={{
            startAdornment: (
              <InputAdornment position='start'>
                <SearchIcon sx={{ marginBottom: '5px' }}/>
              </InputAdornment>
            ),
            endAdornment: (
              <InputAdornment position='end'>
                {search && (
                  <IconButton
                    aria-label='clear search'
                    sx={{ padding: '5px', marginBottom: '5px' }}
                    onClick={() => {
                      setSearch('')
                    }}
                  >
                    <ClearIcon />
                  </IconButton>
                )}
              </InputAdornment>
            )
          }}
          onChange={handleSearch}
        />
        <Box sx={{
          display: 'flex',
          gap: 2
        }}>
          <Button
            variant='contained'
            onClick={() => {
              setPage(1)
              setOrderBy('')
              setSearch('')
            }}
          >
            ОЧИСТИТЬ
          </Button>
          <Button
            variant='contained'
            onClick={handleClick}
            aria-controls={open ? 'basic-menu' : undefined}
            aria-haspopup="true"
            aria-expanded={open ? 'true' : undefined}
          >
            <FilterAltIcon sx={{ width: '24px', height: '24px' }}/>
          </Button>
          <Menu
            id='filter-menu'
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
            anchorOrigin={{
              vertical: 'bottom',
              horizontal: 'right'
            }}
            transformOrigin={{
              vertical: 'top',
              horizontal: 'right'
            }}
            slotProps={{
              paper: { style: { width: 350 } }
            }}
          >
            <Box fontSize={20} fontWeight={700} textAlign={'center'} width={'100%'}>
              Фильтр
            </Box>
            {filterFields.map((field) => (
              <MenuItem
                key={field.key}
                sx={{
                  '&:hover': { backgroundColor: 'transparent' },
                  backgroundColor: 'transparent',
                  cursor: 'default',
                  '&.Mui-focusVisible': { backgroundColor: 'transparent' }
                }}
                disableRipple
              >
                {field.type === 'date' && (
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DatePicker
                      label={field.label}
                      slotProps={{ textField: { size: 'small', variant: 'standard', fullWidth: 'true' } }}
                      format='DD/MM/YYYY'
                    />
                  </LocalizationProvider>
                )}
                {field.type === 'selection' && (
                  <TextField
                    id="standard-select"
                    select
                    label={field.label}
                    defaultValue=''
                    variant='standard'
                    fullWidth
                    inputProps={{
                      style: { backgroundColor: 'red' }
                    }}
                  >
                    {field.options.map((option) => (
                      <MenuItem key={option} value={option}>
                        {option}
                      </MenuItem>
                    ))}
                  </TextField>
                )}
                {field.type === 'string' && (
                  <TextField fullWidth id="standard-basic" label={field.label} variant="standard" />
                )}
              </MenuItem>
            ))}
            <Box display={'flex'} justifyContent={'flex-end'} gap={1} paddingX={2} marginTop={1}>
              <Button variant='outlined'>Очистить</Button>
              <Button variant='contained'>Применить</Button>
            </Box>
          </Menu>
          <Button variant='contained'>
            <PersonAddIcon sx={{
              width: '24px',
              height: '24px'
            }} />
          </Button>
        </Box>
      </Box>
      <TableContainer>
        <Table sx= {{ minWidth: '650px' }} aria-label='sort-table'>
          <SortableTableHead
            order={order}
            orderBy={orderBy}
            onRequestSort={handleRequestSort}
            headCells={headCells}
          />
          <TableBody>
            {sortedRows.map((row) => (
              <TableRow
                key={row.id}
                // key={row}
                sx={{
                  cursor: 'pointer',
                  '&:hover': {
                    backgroundColor: 'rgba(0, 150,136, 0.2)'
                  }
                }}
                // onClick={() => {
                //   navigate(`/users/${row.id}`)
                // }}
              >
                {headCells.map((cell) => (
                  <TableCell key={cell.key} align={cell.type==='number' ? 'center' : 'right'}>
                    {cell.type==='date'
                      ? FormatDate(row[cell.key])
                      :
                      <Highlighter
                        searchWords={[debouncedSearch]}
                        textToHighlight={ConvertToString(row[cell.key])}
                        highlightStyle={{ backgroundColor: 'transparent', color: '#820711FF', fontWeight: 'bold' }} />
                    }
                  </TableCell>
                ))}
              </TableRow>
            ))}
            {emptyRows > 0 && (
              <TableRow style={{
                height: 53 * emptyRows
              }}>
                <TableCell colSpan={headCells.length} />
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
      {/* PAGINATION BAR */}
      <Box sx={{
        p: 2,
        display: 'flex',
        justifyContent: 'end',
        alignItems: 'center',
        gap: 1
      }}>
        <Typography variant='h7'>
          {(page-1) * rowsPerPage + rowsPerPage < searchedRows.length
            ? `Отображено ${(page-1) * rowsPerPage + 1} - ${(page-1) * rowsPerPage + rowsPerPage}
              из ${searchedRows.length}`
            : `Отображено ${(page-1) * rowsPerPage + 1} - ${searchedRows.length}
              из ${searchedRows.length}`
          }
        </Typography>
        <Pagination
          count={
            searchedRows.length % rowsPerPage === 0
              ? searchedRows.length / rowsPerPage
              : Math.floor(searchedRows.length / rowsPerPage) + 1
          }
          page={page}
          onChange={handleChangePage}
          shape='rounded'
          color='primary'
          size='large'/>
        <FormControl sx={{ minWidth: 120 }} size="small">
          <InputLabel id="label-select-rows-per-page">Строки</InputLabel>
          <Select
            labelId="label-select-rows-per-page"
            id="select-rows-per-page"
            value={rowsPerPage}
            label="Строки"
            onChange={handleChangeRowsPerPage}
          >
            <MenuItem value={5}>5</MenuItem>
            <MenuItem value={10}>10</MenuItem>
            <MenuItem value={15}>15</MenuItem>
            <MenuItem value={20}>20</MenuItem>
          </Select>
        </FormControl>
      </Box>
    </Paper>
  )
}

export default CustomTable