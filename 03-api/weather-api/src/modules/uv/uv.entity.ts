import {
  Entity,
  Column,
  PrimaryColumn,
  Index,
} from 'typeorm';

@Index(['latitude', 'longitude', 'dateTime'])
@Entity('uv_index')
export class UvEntity {

  // 🔑 Chave composta
  @PrimaryColumn({ type: 'decimal', precision: 9, scale: 6 })
  latitude!: string;

  @PrimaryColumn({ type: 'decimal', precision: 9, scale: 6 })
  longitude!: string;

  @PrimaryColumn({ type: 'timestamptz' })
  dateTime!: Date;

  // 🔹 Dados UV
  @Column({ type: 'float' })
  uv!: number;

  
}
