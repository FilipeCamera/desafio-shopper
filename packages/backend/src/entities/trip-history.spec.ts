import { randomUUID } from 'crypto';
import TripHistory from './trip-history';

describe('Trip History', () => {
  it('should create a trip history', () => {
    const tripHistory = TripHistory.create({
      id: 1,
      customerId: 1,
      origin: 'test',
      destination: 'test',
      distance: 2.5,
      date: 'test',
      duration: 'test',
      driver: {
        id: 1,
        name: 'test',
      },
      value: 35.8,
    });

    expect(tripHistory).not.toBeNull();
    expect(tripHistory.id).toEqual(1);
    expect(tripHistory.customerId).toEqual(1);
    expect(tripHistory.origin).toEqual('test');
    expect(tripHistory.destination).toEqual('test');
    expect(tripHistory.distance).toEqual(2.5);
    expect(tripHistory.date).toEqual('test');
    expect(tripHistory.duration).toEqual('test');
    expect(tripHistory.driver.id).toEqual(1);
    expect(tripHistory.driver.name).toEqual('test');
    expect(tripHistory.value).toEqual(35.8);
  });

  it('must return a json object when converting', () => {
    const tripHistory = TripHistory.create({
      id: 1,
      customerId: 1,
      origin: 'test',
      destination: 'test',
      distance: 2.5,
      date: 'test',
      duration: 'test',
      driver: {
        id: 1,
        name: 'test',
      },
      value: 35.8,
    });

    const json = tripHistory.toJSON();

    const expected = {
      id: 1,
      customer_id: 1,
      origin: 'test',
      destination: 'test',
      distance: 2.5,
      date: 'test',
      duration: 'test',
      driver: {
        id: 1,
        name: 'test',
      },
      value: 35.8,
    };

    expect(json).not.toBeNull();
    expect(json).toEqual(expected);
  });
});
