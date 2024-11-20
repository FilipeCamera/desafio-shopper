import { randomUUID } from 'crypto';
import Customer from './customer';

describe('Customer', () => {
  it('should create a customer', () => {
    const id = randomUUID();
    const customer = Customer.create({ id, name: 'test' });

    expect(customer).not.toBeNull();
    expect(customer.id).toEqual(id);
    expect(customer.name).toEqual('test');
  });
});
