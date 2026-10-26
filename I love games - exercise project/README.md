# I Love Games

React + Vite project using **your Supabase project** `wtqjbplnkqgkwhcxxwja` via Supabase REST and Auth APIs. The UI and existing routes are retained.

## Start

1. Open `.env.local` beside `package.json` and replace the `VITE_API_KEY` placeholder with the **Publishable key** from your Supabase project's [API Keys settings](https://supabase.com/dashboard/project/wtqjbplnkqgkwhcxxwja/settings/api-keys).
2. Run:

```bash
npm install
npm run dev
```

The short key provided earlier is **not** a Supabase publishable or legacy anon key. You'll need the actual one from Supabase. **Do not use a secret/service_role key in React.**

See [SETUP-SUPABASE.md](SETUP-SUPABASE.md) for schema details, authorization limitations, and troubleshooting. The database and its RLS policies have not been changed.
