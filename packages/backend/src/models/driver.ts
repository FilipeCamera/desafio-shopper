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

  get id(): string {
    return this._id;
  }

  set id(id: string) {
    this._id = id;
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

  public set rate(value: number) {
    this._rate = value;
  }

  public get tax(): number {
    return this._tax;
  }

  public set tax(value: number) {
    this._tax = value;
  }

  public get minimumKm(): number {
    return this._minimumKm;
  }

  public set minimumKm(value: number) {
    this._minimumKm = value;
  }

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

export default Driver;
