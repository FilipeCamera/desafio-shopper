import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

type ITripHistoryDriver = {
  id: number;
  name: string;
};

@Entity('trip_history')
class TripHistory {
  @PrimaryGeneratedColumn('identity')
  private _id!: number;

  @Column({ type: 'int', nullable: false })
  private _customerId!: number;

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

  @Column({ type: 'json', nullable: false })
  private _driver!: ITripHistoryDriver;

  @Column({ type: 'float', nullable: false })
  private _value!: number;

  public get id(): number {
    return this._id;
  }

  public set id(value: number) {
    this._id = value;
  }

  public get customerId(): number {
    return this._customerId;
  }

  public set customerId(value: number) {
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
