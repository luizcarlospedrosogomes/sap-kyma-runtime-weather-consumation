export class CreateBusinessPartnerDto {
  code!: string;           // varchar(4)
  description!: string;    // varchar(40)
  latitude!: string;       // decimal
  longitude!: string;      // decimal
}

export class BusinessPartnerResponseDto {
  code!: string;
  description!: string;
  latitude!: string;
  longitude!: string;
}
