import { randomUUID } from 'crypto';
import TripHistory from './trip-history';

describe('Trip History', () => {
  it('should create a trip history', () => {
    const id = randomUUID();
    const customerId = randomUUID();
    const driverId = randomUUID();
    const tripHistory = TripHistory.create({
      id,
      customerId,
      origin: 'test',
      destination: 'test',
      distance: 2.5,
      date: 'test',
      duration: 'test',
      driver: {
        id: driverId,
        name: 'test',
      },
      value: 35.8,
    });

    expect(tripHistory).not.toBeNull();
    expect(tripHistory.id).toEqual(id);
    expect(tripHistory.customerId).toEqual(customerId);
    expect(tripHistory.origin).toEqual('test');
    expect(tripHistory.destination).toEqual('test');
    expect(tripHistory.distance).toEqual(2.5);
    expect(tripHistory.date).toEqual('test');
    expect(tripHistory.duration).toEqual('test');
    expect(tripHistory.driver.id).toEqual(driverId);
    expect(tripHistory.driver.name).toEqual('test');
    expect(tripHistory.value).toEqual(35.8);
  });

  it('must return a json object when converting', () => {
    const id = randomUUID();
    const customerId = randomUUID();
    const driverId = randomUUID();
    const tripHistory = TripHistory.create({
      id,
      customerId,
      origin: 'test',
      destination: 'test',
      distance: 2.5,
      date: 'test',
      duration: 'test',
      driver: {
        id: driverId,
        name: 'test',
      },
      value: 35.8,
    });

    const json = tripHistory.toJSON();

    const expected = {
      id,
      customer_id: customerId,
      origin: 'test',
      destination: 'test',
      distance: 2.5,
      date: 'test',
      duration: 'test',
      driver: {
        id: driverId,
        name: 'test',
      },
      value: 35.8,
    };

    expect(json).not.toBeNull();
    expect(json).toEqual(expected);
  });
});
