import dataSource from '../config/database';
import TripHistory from '../entities/trip-history';

class TripHistoryService {
  private readonly tripHistoryRepository;

  constructor() {
    this.tripHistoryRepository = dataSource.getRepository(TripHistory);
  }

  async create(trip: TripHistory) {
    return await this.tripHistoryRepository.insert(trip);
  }

  async find(customerId: number, driverId: number) {
    return await this.tripHistoryRepository
      .createQueryBuilder('tripHistory')
      .leftJoinAndSelect('tripHistory._customer', 'customer')
      .leftJoinAndSelect('tripHistory._driver', 'driver')
      .where('customer.id = :customerId', { customerId })
      .andWhere('driver.id = :driverId', { driverId })
      .getMany();
  }
}

export default TripHistoryService;
