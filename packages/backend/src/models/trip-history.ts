import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

type ITripHistoryDriver = {
  id: string;
  name: string;
};

@Entity('trip_history')
class TripHistory {
  @PrimaryGeneratedColumn('uuid')
  private _id!: string;

  @Column({ type: 'uuid', nullable: false })
  private _customerId!: string;

  @Column({ type: 'varchar', length: 255, nullable: false })
  private _origin!: string;

  @Column({ type: 'varchar', length: 255, nullable: false })
  private _destination!: string;

  @Column({ type: 'float', nullable: false })
  private _distance!: number;

  @Column({ type: 'datetime', nullable: false })
  private _date!: string;

  @Column({ type: 'varchar', length: 255, nullable: false })
  private _duration!: string;

  @Column({ type: 'jsonb', nullable: false })
  private _driver!: ITripHistoryDriver;

  @Column({ type: 'float', nullable: false })
  private _value!: number;

  public get id(): string {
    return this._id;
  }

  public set id(value: string) {
    this._id = value;
  }

  public get customerId(): string {
    return this._customerId;
  }

  public set customerId(value: string) {
    this._customerId = value;
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

  public get driver(): ITripHistoryDriver {
    return this._driver;
  }

  public set driver(value: ITripHistoryDriver) {
    this._driver = value;
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
      customer_id: this._customerId,
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
