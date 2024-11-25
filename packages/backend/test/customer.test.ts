import Customer from '../src/entities/customer';

describe('Customer', () => {
  it('should create a customer', () => {
    const customer = Customer.create({ name: 'test' });

    expect(customer).not.toBeNull();
    expect(customer.id).toEqual(undefined);
    expect(customer.name).toEqual('test');
  });

  it('must return a json object when converting', () => {
    const customer = Customer.create({ name: 'test' });

    const json = customer.toJSON();

    const expected = {
      id: undefined,
      name: 'test',
    };

    expect(json).not.toBeNull();
    expect(json).toEqual(expected);
  });
});
