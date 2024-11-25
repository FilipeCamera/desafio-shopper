import dataSource from '../config/database';
import Driver from '../entities/driver';

class DriverService {
  private readonly driverRepository;

  constructor() {
    this.driverRepository = dataSource.getRepository(Driver);
  }

  public async calculateValues(distance: number) {
    const drivers = await this.driverRepository
      .createQueryBuilder('driver')
      .where('driver.minimumKm <= :minimumKm', { minimumKm: distance })
      .getMany();

    if (!drivers || drivers.length === 0) {
      return null;
    }

    const driversCalculated = drivers.map((driver) => ({
      id: driver.id,
      name: driver.name,
      description: driver.description,
      car: driver.car,
      rate: driver.rate,
      rateDescription: driver.rateDescription,
      tax: driver.tax,
      value: driver.tax * distance,
    }));

    return driversCalculated;
  }

  public async findDriver(id: number) {
    const driver = await this.driverRepository
      .createQueryBuilder('driver')
      .where('driver.id = :id', { id })
      .getOne();

    if (!driver) {
      return null;
    }

    return driver;
  }
}

export default DriverService;
