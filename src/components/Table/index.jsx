import { useState } from 'react'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import TableSortLabel from '@mui/material/TableSortLabel'
import Paper from '@mui/material/Paper'
import { rows } from './data'
import { Box } from '@mui/system'
import { TextField } from '@mui/material'
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

const headCells = [
  {
    id: 'id',
    label: 'User ID'
  },
  {
    id: 'username',
    label: 'Username'
  },
  {
    id: 'email',
    label: 'Email'
  },
  {
    id: 'role',
    label: 'Role'
  },
  {
    id: 'date',
    label: 'Creation Date'
  }
]

function descendingComparator(a, b, orderBy) {
  if (orderBy === 'date') {
    const aDate = new Date(FormatDate(a[orderBy]))
    const bDate = new Date(FormatDate(b[orderBy]))
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
  const { order, orderBy, onRequestSort } = props
  const [count, setCount] = useState(1)
  const createSortHandler = (property, count) => (e) => {
    setCount(count + 1)
    onRequestSort(e, property, count)
  }
  return (
    <TableHead>
      <TableRow>
        {headCells.map((headCell) => (
          <TableCell
            key={headCell.id}
            align={headCell.id === 'id' ? 'left' : 'right'}
            sortDirection={orderBy === headCell.id ? order : false}
          >
            <TableSortLabel
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : 'asc'}
              onClick={createSortHandler(headCell.id, count)}
            >
              {headCell.label}
              {/* {orderBy === headCell.id ? (
                <Box component='span' sx={visuallyHidden}>
                  {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                </Box>
              ) : null} */}
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

function UsersTable() {
  // SEARCH
  const [search, setSearch] = useState('')
  const handleSearch = (e) => {
    setSearch(e.target.value)
    setPage(1)
  }

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

  const handleRequestSort = (e, property, count) => {
    if (count % 3 === 0) {
      setOrder('asc')
      setOrderBy('')
    }
    else {
      const isAsc = orderBy === property && order === 'asc'
      setOrder(isAsc ? 'desc' : 'asc')
      setOrderBy(property)
    }
  }

  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows =
    page-1 > 0 ? Math.max(0, (1 + page - 1) * rowsPerPage - rows.length) : 0

  const filteredRows = useMemo(
    () =>
      rows.filter((row) => {
        if (search === '') {
          return row
        }
        else {
          const properties = ['username', 'email', 'role']
          let containsVal = false
          properties.forEach((property) => {
            if (row[property].toLowerCase().includes(search.toLowerCase())) {
              containsVal = true
            }
          })
          return containsVal
        }
      }),
    [search]
  )
  const sortedRows = useMemo(
    () =>
      stableSort(filteredRows, getComparator(order, orderBy)).slice(
        (page-1) * rowsPerPage,
        (page-1) * rowsPerPage + rowsPerPage
      ),
    [order, orderBy, page, rowsPerPage, filteredRows]
  )

  return (
    <Paper sx={{ mx: '16px' }}>
      <Box sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: 2,
        padding: 2
      }}>
        <TextField
          id='standard-search'
          label='Search by username, email and role'
          type='search'
          size='small'
          variant='standard'
          sx={{
            flexGrow: '1',
            maxWidth: '500px'
          }}
          onChange={handleSearch}
        />
        <Box sx={{
          display: 'flex',
          gap: 2
        }}>
          <Button variant='contained'>ОЧИСТИТЬ</Button>
          <Button variant='contained'>
            <FilterAltIcon sx={{
              width: '24px',
              height: '24px'
            }} />
          </Button>
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
          />
          <TableBody>
            {sortedRows.map((row) => (
              <TableRow
                key={row.id}
                sx={{
                  cursor: 'pointer',
                  '&:hover': {
                    backgroundColor: 'red'
                  }
                }}>
                <TableCell align='left'>{row.id}</TableCell>
                <TableCell align='right'>{row.username}</TableCell>
                <TableCell align='right'>{row.email}</TableCell>
                <TableCell align='right'>{row.role}</TableCell>
                <TableCell align='right'>{row.date}</TableCell>
              </TableRow>
            ))}
            {emptyRows > 0 && (
              <TableRow style={{
                height: 53 * emptyRows
              }}>
                <TableCell colSpan={5} />
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
      {/* <TablePagination
        rowsPerPageOptions={[5, 10]}
        component={'div'}
        rowsPerPage={rowsPerPage}
        count={filteredRows.length}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      /> */}
      <Box sx={{
        p: 2,
        display: 'flex',
        justifyContent: 'end',
        alignItems: 'center',
        gap: 1
      }}>
        <Typography variant='h7'>
          {`Displaying rows ${(page-1) * rowsPerPage + 1} - ${(page-1) * rowsPerPage + rowsPerPage}
          of ${filteredRows.length}`}
        </Typography>
        <Pagination
          count={
            filteredRows.length % rowsPerPage === 0
              ? filteredRows.length / rowsPerPage
              : Math.floor(filteredRows.length / rowsPerPage) + 1
          }
          page={page}
          onChange={handleChangePage}
          shape='rounded'
          color='primary'
          size='large'/>
        <FormControl sx={{ minWidth: 120 }} size="small">
          <InputLabel id="label-select-rows-per-page">Rows per page</InputLabel>
          <Select
            labelId="label-select-rows-per-page"
            id="select-rows-per-page"
            value={rowsPerPage}
            label="Rows per page"
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

export default UsersTable