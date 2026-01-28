import { Entity, Column, PrimaryColumn } from 'typeorm';

@Entity('weather')
export class WeatherEntity {
  // 🔑 Chave primária composta

  @PrimaryColumn()
  latitude!: string;

  @PrimaryColumn()
  longitude!: string;

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
