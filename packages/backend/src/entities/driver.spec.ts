import { randomUUID } from 'crypto';
import Driver from './driver';

describe('Driver', () => {
  it('should create a driver', () => {
    const driver = Driver.create({
      name: 'test',
      description: 'test',
      car: 'test',
      tax: 2.5,
      rate: 3,
      rateDescription: 'test',
      minimumKm: 1,
    });

    expect(driver).not.toBeNull();
    expect(driver.id).toEqual(undefined);
    expect(driver.name).toEqual('test');
    expect(driver.description).toEqual('test');
    expect(driver.car).toEqual('test');
    expect(driver.tax).toEqual(2.5);
    expect(driver.rate).toEqual(3);
    expect(driver.rateDescription).toEqual('test');
    expect(driver.minimumKm).toEqual(1);
  });

  it('must return a json object when converting', () => {
    const driver = Driver.create({
      name: 'test',
      description: 'test',
      car: 'test',
      tax: 2.5,
      rate: 3,
      rateDescription: 'test',
      minimumKm: 1,
    });

    const json = driver.toJSON();

    const expected = {
      id: undefined,
      name: 'test',
      description: 'test',
      car: 'test',
      tax: 2.5,
      rate: 3,
      rateDescription: 'test',
      minimumKm: 1,
    };

    expect(json).not.toBeNull();
    expect(json).toEqual(expected);
  });
});
