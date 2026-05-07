# CCMS showcase — 30‑minute Compliance walkthrough

Static demo only: buttons may show toasts or simulated AI replies; there is no backend.

## Tour density (header)

Use **Tour density** to reduce on-screen guides: **Compact** / **Standard** / **Full**. Choice is stored in `sessionStorage` for the browser tab.

## URLs in order

Open locally (`npm run dev`, typically `http://localhost:5173/`) or your GitHub Pages base path (e.g. `https://<org>.github.io/<repo>/`).

| Step | Route | Say / show |
|------|--------|------------|
| 1 | `/login` | Showcase auth — sign in with any email + password. |
| 2 | `/` (Dashboard) | Saved-view chips filter **Cases needing attention**. Chart tabs scroll on narrow widths (snap + fade). AI **Dashboard charts** preset references themed widgets (e.g. open vs closed, SLA donut). |
| 3 | `/cases` | Facet chips (**All open**, **Mine**, **Escalated**, **With Decision App ref**) filter the queue. **Register case** opens intake modal (focus trap). |
| 4 | `/cases/3` | **Grievance** example — mediation FR-11, privileged notes language in tabs. |
| 5 | `/cases/4` | **Litigation + senior executive** — CCMS-2026-0081; badges FR-12 / FR-13. Good line: “This is the escalation / legal ledger story.” |
| 6 | `/reports` | Charts + FR matrix; narrow layout uses cards; desktop table has horizontal scroll hint. AI presets tie to analytics / backlog language. |
| 7 | Optional | Open **Register case** from Cases again; **Save draft** / **Validate & route** show demo status messages. |

## Case IDs quick reference

| URL path | Reference | Story |
|----------|-----------|--------|
| `/cases/1` | CCMS-2026-0142 | Temporary suspension · Decision App ref · SLA at risk |
| `/cases/2` | CCMS-2026-0118 | Serious misconduct · panel timeline |
| `/cases/3` | CCMS-2026-0099 | **Grievance** · mediation · Day 8/10 |
| `/cases/4` | CCMS-2026-0081 | **Senior exec + litigation** · overdue SLA |
| `/cases/5` | CCMS-2026-0077 | Employee internal disciplinary · PSDB |

## AI buttons — suggested script

- **Cases queue**: “Queue summary for Compliance stand-up — top SLA risks by family.”
- **Case workspace**: “Draft next statutory gate explanation for this reference.”
- **Dashboard charts**: “Explain caseload vs SLA tab using **DashboardOpenVsClosed** and **DashboardSlaDonut**.”
- **Register intake**: “Check narrative against PSC Form 6-1 checklist.”
- **Reports / FR backlog**: “Map FR-03 language to what we see on Dashboard.”

Enable **Simulate policy block** on any AI dialog to show a privileged-mediation style refusal — reinforces trust boundaries.

## CI / quality gates

On push to `main` / `master`, GitHub Actions runs **`npm ci`** (project `.npmrc` uses **`legacy-peer-deps`** until `eslint-plugin-jsx-a11y` declares ESLint 10 peers), then **`npm run lint`**, **`npm run test`**, **`npm run build`**, then deploys **`dist`** to Pages.

## Accessibility checkpoints

- **Skip to content** link → `#main-content`.
- **Escape** closes notification and user menus in the header; modals trap focus and restore on close.
