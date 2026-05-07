import type { ComplianceCase } from '../types'

export type StageChecklistItem = {
  id: string
  label: string
  /** Match if any keyword appears as substring in any artefact label (case-insensitive) */
  keywords: readonly string[]
}

function artefactBlob(c: ComplianceCase): string {
  return c.artefacts.join(' ').toLowerCase()
}

/** Demo checklist rules — production would load per stage definition from DB. */
export function checklistItemsForCase(c: ComplianceCase): StageChecklistItem[] {
  const items: StageChecklistItem[] = []
  const stage = c.stage.toLowerCase()

  if (c.family === 'Temporary Suspension' || stage.includes('suspension')) {
    items.push(
      { id: 'six-one', label: 'PSC Form 6-1 / SMDR statutory suspension pack', keywords: ['6-1', 'smdr', 'form 6'] },
      { id: 'notice', label: 'Suspension notice on file', keywords: ['suspension notice', 'notice'] },
      { id: 'warnings', label: 'Progressive warnings / prior responses bundled', keywords: ['warning', 'notice'] },
    )
  }

  if (c.family === 'Grievance Process') {
    items.push(
      { id: 'ref', label: 'PSC grievance referral record', keywords: ['complaint', 'referral', 'grievance'] },
      {
        id: 'mom',
        label: 'MoM / PSC Form 6.8 (locked until mediation outcome in prod)',
        keywords: ['mom', '6.8', 'mediation'],
      },
    )
  }

  if (c.family === 'Serious Misconduct — Employee') {
    const stage = c.stage.toLowerCase()
    if (stage.includes('closed')) {
      items.push({
        id: 'closure-outcome',
        label: 'Commission / closure outcome on file · FR-08',
        keywords: ['commission', 'decision', 'outcome', 'fr-08', 'notice'],
      })
    } else {
      items.push(
        { id: 'tor', label: 'Investigation panel terms of reference', keywords: ['terms', 'reference', 'panel'] },
        { id: 'allegations', label: 'Notice of allegations / evidence index', keywords: ['allegation', 'evidence', 'notice'] },
      )
    }
  } else if (c.stage.toLowerCase().includes('panel')) {
    items.push(
      { id: 'tor', label: 'Investigation panel terms of reference', keywords: ['terms', 'reference', 'panel'] },
      { id: 'allegations', label: 'Notice of allegations / evidence index', keywords: ['allegation', 'evidence', 'notice'] },
    )
  }

  if (items.length === 0) {
    items.push({
      id: 'generic',
      label: 'Stage artefact bundle satisfies statutory checklist (demo baseline)',
      keywords: ['psc', 'form', 'report', 'minute', 'allegation', 'notice', 'reply', 'brief', 'mdc', 'counsel', 'warning', 'performance', 'plan'],
    })
  }

  return items
}

export function checklistItemSatisfied(item: StageChecklistItem, c: ComplianceCase): boolean {
  const blob = artefactBlob(c)
  return item.keywords.some((kw) => blob.includes(kw))
}

export function checklistCompletion(items: readonly StageChecklistItem[], c: ComplianceCase): boolean {
  return items.every((it) => checklistItemSatisfied(it, c))
}
