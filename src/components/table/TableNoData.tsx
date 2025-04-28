import type { Theme, SxProps } from '@mui/material/styles';

import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';

import EmptyContent from '../empty-content/empty-content';

export default function TableNoData({
  title,
  sx,
}: {
  title?: string;

  sx?: SxProps<Theme>;
}) {
  return (
    <TableRow>
      <TableCell colSpan={12}>
        <EmptyContent
          filled
          title={title ?? 'No Data'}
          sx={{
            py: 10,
            ...sx,
          }}
        />
      </TableCell>
    </TableRow>
  );
}
