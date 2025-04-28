import { Helmet } from 'react-helmet-async';
import { varAlpha } from 'minimal-shared/utils';

import Box from '@mui/material/Box';

import { CONFIG } from 'src/global-config';
import { DashboardContent } from 'src/layouts/dashboard';

import TransactionForm from './transaction-form';

// ----------------------------------------------------------------------

const metadata = { title: `Transactions - ${CONFIG.appName}` };

export default function Page() {
  return (
    <>
      <Helmet>
        <title> {metadata.title}</title>
      </Helmet>
      <DashboardContent maxWidth="xl">
        <Box
          sx={[
            (theme) => ({
              mt: 5,
              width: 1,
              height: '100%',
              borderRadius: 2,
              border: `dashed 1px ${theme.vars.palette.divider}`,
              bgcolor: varAlpha(theme.vars.palette.grey['500Channel'], 0.04),
              p: 2,
            }),
          ]}
        >
          <TransactionForm />
        </Box>
      </DashboardContent>
    </>
  );
}
