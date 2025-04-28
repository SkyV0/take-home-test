import { useState, Fragment } from 'react';

import {
  Table,
  Paper,
  TableRow,
  TableBody,
  TableCell,
  TableHead,
  TableContainer,
  CircularProgress,
} from '@mui/material';

import { useTransactions } from 'src/hooks/useProcessTransaction';

import TableNoData from 'src/components/table/TableNoData';

import TablePaginationCustom from './table-pagination-custom';

export default function TransactionHistoryTable() {
  const { data, isLoading, error } = useTransactions();
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(25);
  if (!isLoading && !error && (data?.length ?? 0) === 0) {
    return null;
  }

  const handleChangePage = (_: unknown, p: number) => setPage(p);
  const handleChangeRows = (e: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(e.target.value, 10));

    setPage(0);
  };

  const rows = data ?? [];
  const paged = rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);
  const empty = paged.length === 0;
  return (
    <TableContainer component={Paper} sx={{ mt: 4 }}>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell sx={{ fontWeight: 600 }}>Network</TableCell>
            <TableCell sx={{ fontWeight: 600 }}>Amount&nbsp;(¢)</TableCell>
            <TableCell sx={{ fontWeight: 600 }}>Merchant</TableCell>
            <TableCell sx={{ fontWeight: 600 }}>Descriptor</TableCell>
            <TableCell sx={{ fontWeight: 600 }}>Txn&nbsp;ID</TableCell>
          </TableRow>
        </TableHead>

        <TableBody>
          {isLoading && (
            <TableRow>
              <TableCell colSpan={5} align="center" sx={{ py: 5 }}>
                <CircularProgress size={24} />
              </TableCell>
            </TableRow>
          )}

          {error && !isLoading && (
            <TableRow>
              <TableCell colSpan={5} align="center" sx={{ color: 'error.main', py: 5 }}>
                {(error as Error).message}
              </TableCell>
            </TableRow>
          )}

          {empty && !isLoading && !error && <TableNoData title="No previous transactions" />}

          {paged.map((row) => (
            <Fragment key={row.transaction_id}>
              <TableRow hover>
                <TableCell>{row.network}</TableCell>
                <TableCell>{row.amount}</TableCell>
                <TableCell>{row.merchant}</TableCell>
                <TableCell>{row.transaction_descriptor}</TableCell>
                <TableCell sx={{ fontSize: 12, maxWidth: 160 }}>{row.transaction_id}</TableCell>
              </TableRow>
            </Fragment>
          ))}
        </TableBody>
      </Table>

      {!empty && (
        <TablePaginationCustom
          component="div"
          count={rows.length}
          page={page}
          rowsPerPage={rowsPerPage}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRows}
          rowsPerPageOptions={[10, 25, 50, 100]}
          dense
          sx={{ borderTop: 1, borderColor: 'divider' }}
        />
      )}
    </TableContainer>
  );
}
