import dataSource from '../config/database';
import Customer from '../entities/customer';

class CustomerService {
  private readonly customerRepository;

  constructor() {
    this.customerRepository = dataSource.getRepository(Customer);
  }

  async find(id: number) {
    return await this.customerRepository
      .createQueryBuilder('customer')
      .where('customer.id = :id', { id })
      .getOne();
  }

  async create(customer: Customer) {
    return await this.customerRepository.save(customer);
  }
}

export default CustomerService;
