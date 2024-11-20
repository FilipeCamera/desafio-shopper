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
