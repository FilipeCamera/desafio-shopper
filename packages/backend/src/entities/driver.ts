import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryColumn,
  PrimaryGeneratedColumn,
} from 'typeorm';
import TripHistory from './trip-history';

@Entity('driver')
class Driver {
  @PrimaryGeneratedColumn('increment', { name: 'id' })
  private _id!: number;

  @Column({ type: 'varchar', name: 'name', length: 120, nullable: false })
  private _name!: string;

  @Column({
    type: 'varchar',
    name: 'description',
    length: 255,
    nullable: false,
  })
  private _description!: string;

  @Column({ type: 'varchar', name: 'car', length: 120, nullable: false })
  private _car!: string;

  @Column({ type: 'integer', name: 'rate', nullable: false })
  private _rate!: number;

  @Column({
    type: 'varchar',
    name: 'rateDescription',
    length: 255,
    nullable: false,
  })
  private _rateDescription!: string;

  @Column({ type: 'float', name: 'tax', nullable: false })
  private _tax!: number;

  @Column({ type: 'float', name: 'minimumKm', nullable: false })
  private _minimumKm!: number;

  @OneToMany(() => TripHistory, (tripHistory) => tripHistory.driver, {
    cascade: true,
  })
  private _tripHistory!: TripHistory[];

  get id(): number {
    return this._id;
  }

  get name(): string {
    return this._name;
  }

  set name(name: string) {
    this._name = name;
  }

  get description(): string {
    return this._description;
  }

  set description(description: string) {
    this._description = description;
  }

  get car(): string {
    return this._car;
  }

  set car(car: string) {
    this._car = car;
  }

  public get rate(): number {
    return this._rate;
  }

  public set rate(rate: number) {
    this._rate = rate;
  }

  public set rateDescription(rateDescription: string) {
    this._rateDescription = rateDescription;
  }

  public get rateDescription(): string {
    return this._rateDescription;
  }

  public get tax(): number {
    return this._tax;
  }

  public set tax(tax: number) {
    this._tax = tax;
  }

  public get minimumKm(): number {
    return this._minimumKm;
  }

  public set minimumKm(minimumKm: number) {
    this._minimumKm = minimumKm;
  }

  get tripHistory() {
    return this._tripHistory;
  }

  set tripHistory(tripHistory: TripHistory[]) {
    this._tripHistory = tripHistory;
  }

  public toJSON(): Record<string, any> {
    return {
      id: this._id,
      name: this._name,
      description: this._description,
      car: this._car,
      rate: this._rate,
      rateDescription: this._rateDescription,
      tax: this._tax,
      minimumKm: this._minimumKm,
    };
  }

  public static create(data: Partial<Driver>): Driver {
    const driver = new Driver();
    Object.assign(driver, data);

    return driver;
  }
}

export default Driver;
