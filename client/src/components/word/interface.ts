export interface WordResponse {
  id: number;
  word: string;
  meaning: string;
  correct_count: number;
}

export interface Definition {
  definition: string;
}

export interface Meaning {
  partOfSpeech: string;
  definitions: Definition[];
}

export interface SearchResponse {
  meanings: Meaning[];
}