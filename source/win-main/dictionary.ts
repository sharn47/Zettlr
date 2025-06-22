export type WordEntry = {
  pos: string         // noun / verb / adj …
  definition: string
  synonyms: string[]
}

import dict from '../../resources/wordnet.json'
const typed = dict as Record<string, WordEntry[]>

export function lookupWord (word: string): WordEntry[] {
  return typed[word.toLowerCase()] ?? []
}
