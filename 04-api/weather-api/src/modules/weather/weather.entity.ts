import { Entity, Column, PrimaryColumn } from 'typeorm';

@Entity('weather')
export class WeatherEntity {
  // 🔑 Chave primária composta

  @PrimaryColumn({ type: 'decimal', precision: 9, scale: 6 })
  latitude!: number;

  @PrimaryColumn({ type: 'decimal', precision: 9, scale: 6 })
  longitude!: number;

  @PrimaryColumn({ type: 'timestamptz' })
  dateTime!: Date;

  // 🔹 Dados meteorológicos

  @Column({ type: 'float' })
  temperature!: number;

  @Column({ type: 'float' })
  humidity!: number;

  @Column({ type: 'float' })
  rain!: number;

  @Column({ type: 'int' })
  weatherCode!: number;
}
