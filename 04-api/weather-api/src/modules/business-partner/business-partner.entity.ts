import {
  Entity,
  Column,
  PrimaryColumn,
  Index,
} from 'typeorm';

@Entity('business_partner')
@Index(['latitude', 'longitude'])
export class BusinessPartnerEntity {

  @PrimaryColumn({ type: 'varchar', length: 4 })
  code!: string;

  @Column({ type: 'varchar', length: 40 })
  description!: string;

  @Column({ type: 'decimal', precision: 9, scale: 6 })
  latitude!: string;

  @Column({ type: 'decimal', precision: 9, scale: 6 })
  longitude!: string;
}
