type KatottgColumn =
  | 'firstLevel'
  | 'secondLevel'
  | 'thirdLevel'
  | 'fourthLevel'
  | 'additionalLevel'
  | 'nameCategory'
  | 'locationCategory';

type KatottgColumns = Record<Exclude<KatottgColumn, 'locationCategory'>, string>;

type AllowedLocationCategory = 'O' | 'K' | 'P' | 'H' | 'M' | 'X' | 'C' | 'B';

interface ParsedKatottgData extends KatottgColumns {
  locationCategory: AllowedLocationCategory;
}

type NewLocationType = {
  code: string;
  nameUa: string;
  nameEn: string;
  categoryCode: string;
  parentCode?: string | null | undefined;
};

export type { NewLocationType, ParsedKatottgData, KatottgColumn };
