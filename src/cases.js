// cases.js — case loading and routing logic

import { filterOptions } from './compliance.js';

let allCases = [];

export async function loadCases() {
  const resp = await fetch('./data/cases.json');
  allCases = await resp.json();
}

export function getCaseForSequence(sequence) {
  return allCases.find(c => c.sequence === sequence) || null;
}

export function getAvailableOptions(c) {
  // Final case: always exactly one option, no filtering
  if (c.final) return c.options;
  return filterOptions(c.options);
}

export function isFinalCase(c) {
  return !!c.final;
}
