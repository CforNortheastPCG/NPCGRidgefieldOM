import type { AsGivenData } from '../lib/types.ts'
/* ═══════════════════ EDIT-ME · AS GIVEN (OWNER-PROVIDED) ═══════════════════
   Ownership's rent roll and operating statement, transcribed WITHOUT
   adjustment, for the "As Given" page. This is the audit trail: every other
   financial page normalizes, and this one shows the starting point.

   Rules:
     · Transcribe verbatim. If the source says $9,073 for "Misc Expenses
       (3% of EGI)", that is the label and the number — do not rename it to
       something tidier or fold it into another line.
     · Do NOT correct arithmetic here. If the owner's NOI does not follow
       from their own income less their own expenses, enter what they state
       in `statedNoi` and explain the gap in `reconciliation`. Silently
       fixing it defeats the purpose of the page.
     · Tenant names: include only for an owner-facing draft. REDACT before
       any buyer distribution.

   Set the whole export to null if ownership provided no statement — the
   page drops out of both formats. */

export const AS_GIVEN: AsGivenData | null = null // SAMPLE deck ships without one — see bov-ware-portfolio for a filled example
