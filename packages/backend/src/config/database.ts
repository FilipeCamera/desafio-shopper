import { DataSource } from 'typeorm';
import Customer from '../entities/customer';
import Driver from '../entities/driver';
import TripHistory from '../entities/trip-history';
import { join } from 'path';

const dataSource = new DataSource({
  type: 'sqlite',
  database: join(__dirname, '..', '..', 'shopper.sqlite'),
  synchronize: true,
  logging: true,
  entities: [join(__dirname, '..', 'entities', '*.{ts,js}')],
  migrations: [join(__dirname, '..', 'migrations', '*.{ts,js}')],
});

const driver1 = Driver.create({
  name: 'Homer Simpson',
  description:
    'Olá! Sou o Homer, seu motorista camarada! Relaxe e aproveite o passeio, com direito a rosquinhas e boas risadas (e talvez alguns desvios).',
  car: 'Plymouth Valiant 1973 rosa e enferrujado',
  rate: 2,
  rateDescription:
    'Motorista simpático, mas errou o caminho 3 vezes. O carro cheira a donuts.',
  tax: 2.5,
  minimumKm: 1,
});

const driver2 = Driver.create({
  name: 'Dominic Toretto',
  description:
    'Ei, aqui é o Dom. Pode entrar, vou te levar com segurança e rapidez ao seu destino. Só não mexa no rádio, a playlist é sagrada.',
  car: 'Dodge Charger R/T 1970 modificado',
  rate: 4,
  rateDescription:
    'Que viagem incrível! O carro é um show à parte e o motorista, apesar de ter uma cara de poucos amigos, foi super gente boa. Recomendo!',
  tax: 5,
  minimumKm: 5,
});

const driver3 = Driver.create({
  name: 'James Bond',
  description:
    'Boa noite, sou James Bond. À seu dispor para um passeio suave e discreto. Aperte o cinto e aproveite a viagem.',
  car: 'Aston Martin DB5 clássico',
  rate: 5,
  rateDescription:
    'Serviço impecável! O motorista é a própria definição de classe e o carro é simplesmente magnífico. Uma experiência digna de um agente secreto.',
  tax: 10,
  minimumKm: 10,
});

export { dataSource as default, driver1, driver2, driver3 };
