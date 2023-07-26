export type SuccessfulReadingType = {
  x: number;
  y: number;
  offset: number;
};

export type Reading = SuccessfulReadingType | null | undefined;
