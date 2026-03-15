// cases.js — case loading and routing logic

import { filterOptions } from './compliance.js';

let allCases = [];

export async function loadCases() {
  const resp = await fetch('./data/cases.json');
  allCases = await resp.json();
}

export function getCaseForDay(day) {
  return allCases.find(c => c.day === day) || null;
}

export function getAvailableOptions(c) {
  // Final case: always exactly one option, no filtering
  if (c.final) return c.options;
  return filterOptions(c.options);
}

export function isFinalCase(c) {
  return !!c.final;
}
