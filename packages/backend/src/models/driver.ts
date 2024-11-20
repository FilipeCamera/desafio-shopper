import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('driver')
class Driver {
  @PrimaryGeneratedColumn('uuid')
  private _id!: string;
  @Column({ type: 'varchar', length: 120, nullable: false })
  private _name!: string;
  @Column({ type: 'varchar', length: 255, nullable: false })
  private _description!: string;
  @Column({ type: 'varchar', length: 120, nullable: false })
  private _car!: string;
  @Column({ type: 'integer', nullable: false })
  private _rate!: number;
  @Column({ type: 'float', nullable: false })
  private _tax!: number;
  @Column({ type: 'float', nullable: false })
  private _minimumKm!: number;

  public toJSON(): Record<string, any> {
    return {
      id: this._id,
      name: this._name,
      description: this._description,
      car: this._car,
      rate: this._rate,
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
