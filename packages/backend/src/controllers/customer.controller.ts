import { Request, Response } from 'express';
import Customer from '../entities/customer';
import CustomerService from '../services/customer.service';

class CustomerController {
  private readonly customerService;

  constructor() {
    this.customerService = new CustomerService();
  }
  async create(req: Request, res: Response) {
    const { name } = req.body;

    const customer = Customer.create({ name });

    const customerCreated = await this.customerService.create(customer);

    return res.status(201).json(customerCreated.toJSON());
  }
}

const customerController = new CustomerController();
export default customerController;
