┌──────────────────────────────────┐
│ React + Vite dev server :5173 │ • React-Hook-Form → builds TLV string  
│ │ • TanStack React-Query → /api calls  
│ ─ Web proxy /api/\* ─────────┐ │ • MUI for UI, Paginated history table
└───────────────────────────────┘ │
│
┌──────────────────────────────────┐ │
│ Express 5 API :8000 │◀┘ • POST /api/processTransaction  
│ │ → TLV → JSON + store in-mem  
│ In-mem array (recent first) │ • GET /api/transactions  
└──────────────────────────────────┘ → full history

Topic | Details
TLV parser | One pass; reads tag → length(2) → value(len) until end. Unknown tags ignored.
Business rules | amount stripped of dot & leading zeros → cents. transaction_descriptor = 8-digit zero-padded amount for VISA else XXFFFF. Merchant truncated ≤10 chars.
Persistence | Challenge doesn’t require a DB; an in-memory transactions[] is adequate and keeps the API stateless for the hour-long exercise.
Front-end form | Three fields (Network ▾, Amount, Merchant). RHF serialises to TLV string before calling mutation.
History table | React-Query polling (refetchInterval=5000) + MUI table + custom pagination component.
Error handling | API always answers JSON — { error } on 4××.
Type safety | Shared TransactionResponse interface; server exports buildTransactionResponse, client imports type; Vitest checks shape.

Command | What it does
yarn dev | Runs Vite (:5173) & Express (:8000) concurrently with auto-reload.
yarn build | vite build && tsc – creates dist/ bundle; type-checks.
yarn start | NODE_ENV=production node api/index.js – single prod server on :8000.
yarn test | Vitest – unit tests (parser).
yarn lint, yarn lint:fix | ESLint + Prettier for code quality.
