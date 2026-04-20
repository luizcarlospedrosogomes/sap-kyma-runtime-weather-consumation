export class UvNowDto {
  time!: string;  // ISO 8601
  uvi!: number;   // valor do índice UV
}

export class UvForecastItemDto {
  time!: string;
  uvi!: number;
}

export class UvHistoryItemDto {
  time!: string;
  uvi!: number;
}

export class UvApiResponse {
  ok!: boolean;
  latitude!: number;
  longitude!: number;

  now!: UvNowDto;
  forecast!: UvForecastItemDto[];
  history!: UvHistoryItemDto[];
}
