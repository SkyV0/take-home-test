import type { TransactionResponse } from 'src/api/processTransaction';

import { useQuery, useMutation } from '@tanstack/react-query';

import { processTransaction } from 'src/api/processTransaction';

export function useProcessTransaction() {
  return useMutation<TransactionResponse, Error, string>({
    mutationFn: processTransaction,
  });
}

export function useTransactions() {
  return useQuery<TransactionResponse[]>({
    queryKey: ['transactions'],
    queryFn: async () => {
      const res = await fetch('/api/transactions');
      if (!res.ok) throw new Error(`Server error ${res.status}`);
      return res.json();
    },
    refetchInterval: 5_000,
  });
}
