// cases.js — case loading, route memory, and recurrence materialization

import { filterOptions } from './compliance.js';

let allCases = [];
const routeHistory = new Map();

export async function loadCases() {
  const resp = await fetch('./data/cases.json');
  allCases = await resp.json();
}

export function recordRoute(c, option) {
  routeHistory.set(c.id, String(option.compliance_delta));
}

function materializeRecurrence(c) {
  const sourceCase = c.recurrence?.from_case;
  if (!sourceCase) return c;

  const sourceRoute = routeHistory.get(sourceCase);
  const variant = c.recurrence.variants?.[sourceRoute];
  if (!variant) return c;

  const overrides = variant.option_overrides ?? {};

  return {
    ...c,
    body: `${c.body}\n\nPrior route update: ${variant.note}`,
    options: c.options.map(option => ({
      ...option,
      ...(overrides[String(option.compliance_delta)] ?? {}),
    })),
  };
}

export function getCaseForSequence(sequence) {
  const c = allCases.find(candidate => candidate.sequence === sequence);
  return c ? materializeRecurrence(c) : null;
}

export function getAvailableOptions(c) {
  // Final case: always exactly one option, no filtering
  if (c.final) return c.options;
  return filterOptions(c.options);
}

export function isFinalCase(c) {
  return !!c.final;
}
