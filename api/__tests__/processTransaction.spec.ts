import { buildTransactionResponse } from 'api';
import { it, vi, expect, describe } from 'vitest';

vi.mock('node:crypto', async () => ({
  default: {
    randomUUID: () => 'xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx',
  },
}));

const cases: Array<[string, any]> = [
  [
    '20522.00104VISA310BURGERBARN',
    {
      version: '0.1',
      transaction_id: 'xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx',
      amount: '2200',
      network: 'VISA',
      transaction_descriptor: '00002200',
      merchant: 'BURGERBARN',
      raw_message: '20522.00104VISA310BURGERBARN',
    },
  ],
  [
    '309SMAINFRMR108DISCOVER2070100.95',
    {
      version: '0.1',
      transaction_id: 'xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx',
      amount: '10095',
      network: 'DISCOVER',
      transaction_descriptor: 'DIFFFF',
      merchant: 'SMAINFRMR',
      raw_message: '309SMAINFRMR108DISCOVER2070100.95',
    },
  ],
  [
    '103JCB502QS316COSTSAVERGROCERY20564.80',
    {
      version: '0.1',
      transaction_id: 'xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx',
      amount: '6480',
      network: 'JCB',
      transaction_descriptor: 'JCFFFF',
      merchant: 'COSTSAVERG',
      raw_message: '103JCB502QS316COSTSAVERGROCERY20564.80',
    },
  ],
];

describe('buildTransactionResponse', () => {
  it.each(cases)('parses %s correctly', (input, expected) => {
    expect(buildTransactionResponse(input)).toEqual(expected);
  });
});
