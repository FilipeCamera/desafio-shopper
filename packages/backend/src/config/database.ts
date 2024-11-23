import { DataSource } from 'typeorm';
import Customer from '../entities/customer';
import Driver from '../entities/driver';
import TripHistory from '../entities/trip-history';

const dataSource = new DataSource({
  type: 'sqlite',
  database: './packages/backend/shopper.sqlite',
  synchronize: true,
  logging: false,
  entities: [Customer, Driver, TripHistory],
});

export default dataSource;
