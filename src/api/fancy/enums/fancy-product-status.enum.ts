export enum FancyProductStatus {
  ACTIVE = 'ACTIVE',
  INACTIVE = 'INACTIVE'
}

export type FancyProductStatusType = keyof typeof FancyProductStatus;
