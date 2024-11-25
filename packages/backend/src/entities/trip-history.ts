import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import Driver from './driver';
import Customer from './customer';

@Entity('trip_history')
class TripHistory {
  @PrimaryGeneratedColumn('increment', { name: 'id' })
  private _id!: number;

  @ManyToOne(() => Customer, (customer) => customer.tripHistory)
  @JoinColumn({ name: 'customer_id' })
  private _customer!: Customer;

  @Column({ type: 'varchar', name: 'origin', length: 255, nullable: false })
  private _origin!: string;

  @Column({
    type: 'varchar',
    name: 'destination',
    length: 255,
    nullable: false,
  })
  private _destination!: string;

  @Column({ type: 'float', name: 'distance', nullable: false })
  private _distance!: number;

  @Column({ type: 'datetime', name: 'date', nullable: false })
  private _date!: string;

  @Column({ type: 'varchar', name: 'duration', length: 255, nullable: false })
  private _duration!: string;

  @ManyToOne(() => Driver, (driver) => driver.tripHistory)
  @JoinColumn({ name: 'driver_id' })
  private _driver!: Driver;

  @Column({ type: 'float', name: 'value', nullable: false })
  private _value!: number;

  public get id(): number {
    return this._id;
  }

  public get customer(): Customer {
    return this._customer;
  }

  public set customer(customer: Customer) {
    this._customer = customer;
  }

  public get origin(): string {
    return this._origin;
  }

  public set origin(value: string) {
    this._origin = value;
  }

  public get destination(): string {
    return this._destination;
  }

  public set destination(value: string) {
    this._destination = value;
  }

  public get distance(): number {
    return this._distance;
  }

  public set distance(value: number) {
    this._distance = value;
  }

  public get date(): string {
    return this._date;
  }

  public set date(value: string) {
    this._date = value;
  }

  public get duration(): string {
    return this._duration;
  }

  public set duration(value: string) {
    this._duration = value;
  }

  public get driver(): Driver {
    return this._driver;
  }

  public set driver(driver: Driver) {
    this._driver = driver;
  }

  public get value(): number {
    return this._value;
  }

  public set value(value: number) {
    this._value = value;
  }

  public toJSON(): Record<string, any> {
    return {
      id: this._id,
      origin: this._origin,
      destination: this._destination,
      distance: this._distance,
      date: this._date,
      duration: this._duration,
      driver: {
        id: this._driver.id,
        name: this._driver.name,
      },
      value: this._value,
    };
  }

  public static create(data: Partial<TripHistory>): TripHistory {
    const tripHistory = new TripHistory();
    Object.assign(tripHistory, data);
    return tripHistory;
  }
}

export default TripHistory;
