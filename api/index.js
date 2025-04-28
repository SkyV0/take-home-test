import path from 'path';
import express from 'express';
import { fileURLToPath } from 'url';
import fs from 'fs';
import cors from 'cors';
import crypto from 'node:crypto';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const PORT = process.env.PORT || 8000;
const app = express();

app.use(cors({ origin: 'http://localhost:5173' }));
app.use(express.json());

const transactions = [];

app.post('/processTransaction', (req, res) => {
  const { transaction } = req.body;

  if (typeof transaction !== 'string') {
    res.status(400).json({ error: '`transaction` must be a string' });
    return;
  }

  try {
    const payload = buildTransactionResponse(transaction);
    transactions.unshift(payload);
    res.json(payload);
  } catch (err) {
    res.status(400).json({
      error: err instanceof Error ? err.message : 'Unknown error',
    });
  }
});

app.get('/transactions', (_req, res) => {
  res.json(transactions);
});

export function buildTransactionResponse(raw) {
  const tags = parseTags(raw);
  const network = tags['1'];
  const amountIn = tags['2'];
  const merchant = tags['3'];

  if (!network || !amountIn || !merchant) {
    throw new Error('Missing required tag (1, 2, or 3)');
  }

  const cents = amountIn.replace('.', '').replace(/^0+/, '');
  if (!/^\d+$/.test(cents)) throw new Error('Bad amount format');

  const descriptor =
    network.toUpperCase() === 'VISA'
      ? cents.padStart(8, '0')
      : `${network.slice(0, 2).toUpperCase()}FFFF`;

  return {
    version: '0.1',
    transaction_id: crypto.randomUUID(),
    amount: cents,
    network,
    transaction_descriptor: descriptor,
    merchant: merchant.slice(0, 10),
    raw_message: raw,
  };
}

function parseTags(str) {
  const out = {};
  for (let i = 0; i < str.length; ) {
    const tag = str[i++];
    const len = Number.parseInt(str.slice(i, i + 2), 10);
    if (Number.isNaN(len)) throw new Error('Bad length field');
    i += 2;

    const value = str.slice(i, i + len);
    if (value.length !== len) throw new Error('Value shorter than length');
    i += len;

    out[tag] = value;
  }
  return out;
}

if (process.env.NODE_ENV === 'production') {
  const distDir = path.join(__dirname, '..', 'dist');
  if (fs.existsSync(path.join(distDir, 'index.html'))) {
    app.use(express.static(distDir));
    app.use((_req, res) => res.sendFile(path.join(distDir, 'index.html')));
  } else {
    console.warn('[WARN] dist/ folder not found – did you forget "yarn build"?');
  }
}

app.listen(PORT, () => console.log(`API listening on http://localhost:${PORT}`));
