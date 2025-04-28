import type { TransactionResponse } from 'src/api/processTransaction';

import {
  Table,
  Paper,
  TableRow,
  TableBody,
  TableCell,
  TableHead,
  TableContainer,
} from '@mui/material';

import TableNoData from 'src/components/table/TableNoData';

type Props = {
  rows: TransactionResponse | null;
  loading?: boolean;
};
export default function TransactionTable({ rows, loading }: Props) {
  if (loading) return null;

  if (!rows) {
    return (
      <TableContainer component={Paper}>
        <Table>
          <TableBody>
            <TableNoData title="Submit a transaction to see results" />
          </TableBody>
        </Table>
      </TableContainer>
    );
  }

  const cells: [string, string][] = [
    ['Version', rows.version],
    ['Transaction ID', rows.transaction_id],
    ['Amount (cents)', rows.amount],
    ['Network', rows.network],
    ['Descriptor', rows.transaction_descriptor],
    ['Merchant', rows.merchant],
    ['Raw', rows.raw_message],
  ];

  return (
    <TableContainer component={Paper} sx={{ mt: 3 }}>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell sx={{ fontWeight: 600 }}>Field</TableCell>
            <TableCell sx={{ fontWeight: 600 }}>Value</TableCell>
          </TableRow>
        </TableHead>

        <TableBody>
          {cells.map(([label, value]) => (
            <TableRow key={label}>
              <TableCell>{label}</TableCell>
              <TableCell>{value}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
