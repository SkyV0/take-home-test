export type TransactionResponse = Record<string, string>;

export async function processTransaction(transaction: string): Promise<TransactionResponse> {
  const res = await fetch(`${import.meta.env.VITE_SERVER_URL}/processTransaction`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ transaction }),
  });

  if (!res.ok) {
    const { error } = await res.json();
    throw new Error(error ?? 'Server error');
  }

  return res.json();
}
