import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import TripHistory from './trip-history';

@Entity('customer')
class Customer {
  @PrimaryGeneratedColumn('identity', { name: 'id' })
  private _id!: number;

  @Column({ type: 'varchar', name: 'name', length: 120, nullable: false })
  private _name!: string;

  @OneToMany(() => TripHistory, (tripHistory) => tripHistory.customer, {
    cascade: true,
  })
  private _tripHistory!: TripHistory[];

  public toJSON(): Record<string, any> {
    return {
      id: this._id,
      name: this._name,
    };
  }

  get id(): number {
    return this._id;
  }

  set id(id: number) {
    this._id = id;
  }

  get name() {
    return this._name;
  }

  set name(name: string) {
    this._name = name;
  }

  get tripHistory() {
    return this._tripHistory;
  }

  set tripHistory(tripHistory: TripHistory[]) {
    this._tripHistory = tripHistory;
  }

  public static create(data: Partial<Customer>): Customer {
    const customer = new Customer();
    Object.assign(customer, data);
    return customer;
  }
}

export default Customer;
