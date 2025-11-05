// Root type
export type Countries = Country[];

// Main entity
export interface Country {
  name: string;
  topLevelDomain: string[];
  alpha2Code: string;
  alpha3Code: string;
  callingCodes: string[];
  capital?: string;
  altSpellings?: string[];
  subregion?: string;
  region?: string;
  population?: number;
  /** Usually [lat, lng]; keep flexible just in case */
  latlng?: [number, number] | number[];
  demonym?: string;
  area?: number;
  gini?: number;
  timezones?: string[];
  borders?: string[];
  nativeName?: string;
  numericCode?: string;

  flags: Flags;

  currencies?: Currency[];
  languages?: Language[];

  /** Map of locale code → translation (e.g., "fr": "Algérie") */
  translations?: Translations;

  /** Some entries repeat a single `flag` URL in addition to `flags` */
  flag?: string;

  regionalBlocs?: RegionalBloc[];

  cioc?: string;
  independent?: boolean;
}

// Subtypes
export interface Flags {
  svg: string;
  png: string;
}

export interface Currency {
  code: string;
  name: string;
  symbol: string;
}

export interface Language {
  iso639_1?: string;
  iso639_2?: string;
  name: string;
  nativeName?: string;
}

export type Translations = Record<string, string>;

export interface RegionalBloc {
  acronym: string;
  name: string;
  otherAcronyms?: string[];
  otherNames?: string[];
}
