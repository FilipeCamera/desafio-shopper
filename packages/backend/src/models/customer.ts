import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('customer')
class Customer {
  @PrimaryGeneratedColumn('uuid')
  private _id!: string;

  @Column({ type: 'varchar', length: 120, nullable: false })
  private _name!: string;

  public toJSON(): Record<string, any> {
    return {
      id: this._id,
      name: this._name,
    };
  }

  public static create(data: Partial<Customer>): Customer {
    const customer = new Customer();
    Object.assign(customer, data);
    return customer;
  }
}
