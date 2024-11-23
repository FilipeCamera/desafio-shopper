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

  it('must return a json object when converting', () => {
    const id = randomUUID();
    const customer = Customer.create({ id, name: 'test' });

    const json = customer.toJSON();

    const expected = {
      id,
      name: 'test',
    };

    expect(json).not.toBeNull();
    expect(json).toEqual(expected);
  });
});
