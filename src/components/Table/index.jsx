import { useState } from 'react'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import TableSortLabel from '@mui/material/TableSortLabel'
import Paper from '@mui/material/Paper'
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
import { useNavigate } from 'react-router'

function descendingComparator(a, b, orderBy) {
  const aDate = new Date(a[orderBy])
  const bDate = new Date(b[orderBy])
  if (!isNaN(aDate) && !isNaN(bDate)) {
    // const aDate = new Date(FormatDate(a[orderBy]))
    // const bDate = new Date(FormatDate(b[orderBy]))
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

function CustomTable({ data, headCells, searchFields, searchLabel }) {
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

  const handleRequestSort = (e, property) => {
    const isAsc = orderBy === property && order === 'asc'
    setOrder(isAsc ? 'desc' : 'asc')
    setOrderBy(property)
    setPage(1)
  }

  const filteredRows = useMemo(
    () =>
      data.filter((row) => {
        if (search === '') {
          return row
        }
        else {
          // const properties = searchfields
          let containsVal = false
          searchFields.forEach((property) => {
            if (row[property].toLowerCase().includes(search.toLowerCase())) {
              containsVal = true
            }
          })
          return containsVal
        }
      }),
    [search, data, searchFields]
  )
  const sortedRows = useMemo(
    () =>
      stableSort(filteredRows, getComparator(order, orderBy)).slice(
        (page-1) * rowsPerPage,
        (page-1) * rowsPerPage + rowsPerPage
      ),
    [order, orderBy, page, rowsPerPage, filteredRows]
  )

  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows =
    page-1 > 0 ? Math.max(0, (1 + page - 1) * rowsPerPage - filteredRows.length) : 0

  const navigate = useNavigate()
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
          label={searchLabel}
          type='search'
          size='small'
          variant='standard'
          value={search}
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
                    backgroundColor: 'red'
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
                      : row[cell.key]
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
          {(page-1) * rowsPerPage + rowsPerPage < filteredRows.length
            ? `Отображено ${(page-1) * rowsPerPage + 1} - ${(page-1) * rowsPerPage + rowsPerPage}
              из ${filteredRows.length}`
            : `Отображено ${(page-1) * rowsPerPage + 1} - ${filteredRows.length}
              из ${filteredRows.length}`
          }
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

export default CustomTable