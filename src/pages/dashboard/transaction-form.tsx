import { useForm } from 'react-hook-form';

import { Box, Alert, Stack, Button, MenuItem, TextField } from '@mui/material';

import { useProcessTransaction } from 'src/hooks/useProcessTransaction';

import TransactionTable from './transaction-table';
import TransactionHistoryTable from './transaction-history-table';

type FormValues = {
  network: string;
  amount: string;
  merchant: string;
};

function buildTlv({ network, amount, merchant }: FormValues) {
  const seg = (t: string, val: string) => `${t}${String(val.length).padStart(2, '0')}${val}`;
  return seg('1', network) + seg('2', amount) + seg('3', merchant);
}

export default function TransactionForm() {
  const { mutate: runProcess, data: latest, error, isPending } = useProcessTransaction();

  const form = useForm<FormValues>({
    defaultValues: { network: 'VISA', amount: '', merchant: '' },
  });

  const onSubmit = (values: FormValues) => {
    runProcess(buildTlv(values), { onSuccess: () => form.reset() });
  };

  return (
    <Box component="form" onSubmit={form.handleSubmit(onSubmit)}>
      <Stack direction="row" spacing={2} sx={{ mb: 2 }}>
        <TextField
          select
          label="Network"
          {...form.register('network', { required: true })}
          sx={{ minWidth: 140 }}
        >
          {['VISA', 'AMEX', 'DISCOVER', 'JCB', 'MASTERCARD'].map((n) => (
            <MenuItem key={n} value={n}>
              {n}
            </MenuItem>
          ))}
        </TextField>

        <TextField
          label="Amount"
          placeholder="22.00"
          {...form.register('amount', {
            required: 'Amount is required',
            pattern: { value: /^\d+\.\d{2}$/, message: 'Format 0.00' },
          })}
          error={!!form.formState.errors.amount}
          helperText={form.formState.errors.amount?.message}
        />

        <TextField
          label="Merchant"
          placeholder="WALMART"
          {...form.register('merchant', { required: 'Merchant is required' })}
          error={!!form.formState.errors.merchant}
          helperText={form.formState.errors.merchant?.message}
        />

        <Button
          variant="contained"
          type="submit"
          disabled={isPending || form.formState.isSubmitting}
        >
          {isPending ? 'Processing…' : 'Submit'}
        </Button>
      </Stack>

      {error && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {(error as Error).message}
        </Alert>
      )}

      {latest && <TransactionTable rows={latest} />}

      <TransactionHistoryTable />
    </Box>
  );
}
