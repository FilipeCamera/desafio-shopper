import TripHistory from './trip-history';
import Customer from './customer';
import Driver from './driver';

describe('Trip History', () => {
  it('should create a trip history', () => {
    const customer = Customer.create({ name: 'test' });
    const driver = Driver.create({
      name: 'test',
      description: 'test',
      car: 'test',
      tax: 2.5,
      rate: 3,
      rateDescription: 'test',
      minimumKm: 1,
    });

    const tripHistory = TripHistory.create({
      customer,
      origin: 'test',
      destination: 'test',
      distance: 2.5,
      date: 'test',
      duration: 'test',
      driver,
      value: 35.8,
    });

    expect(tripHistory).not.toBeNull();
    expect(tripHistory.id).toEqual(undefined);
    expect(tripHistory.customer).toEqual(customer);
    expect(tripHistory.origin).toEqual('test');
    expect(tripHistory.destination).toEqual('test');
    expect(tripHistory.distance).toEqual(2.5);
    expect(tripHistory.date).toEqual('test');
    expect(tripHistory.duration).toEqual('test');
    expect(tripHistory.driver).toEqual(driver);
    expect(tripHistory.driver.name).toEqual('test');
    expect(tripHistory.value).toEqual(35.8);
  });

  it('must return a json object when converting', () => {
    const customer = Customer.create({ name: 'test' });
    const driver = Driver.create({
      name: 'test',
      description: 'test',
      car: 'test',
      tax: 2.5,
      rate: 3,
      rateDescription: 'test',
      minimumKm: 1,
    });
    const tripHistory = TripHistory.create({
      customer,
      origin: 'test',
      destination: 'test',
      distance: 2.5,
      date: 'test',
      duration: 'test',
      driver,
      value: 35.8,
    });

    const json = tripHistory.toJSON();

    const expected = {
      id: undefined,
      customer_id: undefined,
      origin: 'test',
      destination: 'test',
      distance: 2.5,
      date: 'test',
      duration: 'test',
      driver: {
        id: undefined,
        name: 'test',
      },
      value: 35.8,
    };

    expect(json).not.toBeNull();
    expect(json).toEqual(expected);
  });
});
